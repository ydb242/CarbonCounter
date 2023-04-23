from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId
import requests
import json
from collections import defaultdict
import datetime
from flask_cors import CORS
from datetime import datetime, timezone

# create Flask app
app = Flask(__name__)
cors=CORS(app)

# create Flask app
#app = Flask(__name__)

# Connect to MongoDB
uri = "mongodb+srv://carbon:ciOLM5D2lqAKUkeO@cluster0.doqtoku.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri, connect=False)
db = client["mydb"]
collection = db["curr"]
infoset = defaultdict()

# Connect to Carbon API
url = "https://www.carboninterface.com/api/v1/estimates"
api_key = "VsmxxeigkWZ1LC3qKZMuA"
api_key = "Bearer "+api_key

headers = {
    "Authorization": api_key,
    "Content-Type": "application/json"
}

# Define user operation
# Create new user
@app.route('/users/create', methods=['POST'])
def create_document():
    data = request.json
    document = collection.find_one({'email': data['email']})
    if document:
        return jsonify()
    else:
        data['rewards'] = 0
        data['total_consumption'] = 0
        result = collection.insert_one(data)
        return jsonify({'message': 'Document created', 'id': str(result.inserted_id)})

# read 10 random documents
@app.route('/users', methods=['GET'])
def read_rand10_documents():
    documents = list(collection.find().limit(10))
    for d in documents:
        d['_id'] = str(d['_id'])
    return jsonify({'documents': documents})

# read user data
@app.route('/users/<id>', methods=['GET'])
def read_document(id):
    document = collection.find_one({'_id': ObjectId(id)})
    if document:
        document['_id'] = str(document['_id'])
        return jsonify(document)
    else:
        return jsonify({'message': 'Document not found'})

# update userdata
@app.route('/users/<id>', methods=['PUT'])
def update_document(id):
    data = request.json
    data['_id'] = ObjectId(data['_id'])
    result = collection.update_one({'_id': data['_id']}, {'$set': data})
    if result.modified_count == 1:
        return jsonify({'message': 'Document updated'})
    else:
        return jsonify({'message': 'Document not found'})

# delete document
@app.route('/users/<id>', methods=['DELETE'])
def delete_document(id):
    new_id = ObjectId(id)
    result = collection.delete_one({'_id': new_id})
    if result.deleted_count == 1:
        return jsonify({'message': 'Document deleted'})
    else:
        return jsonify({'message': 'Document not found'})


# Define type operations
# Create electricity type operations for the user
collec_type = db["type"]
infoset["transport"] = {"car":10,"bus":20,"flight":30}
infoset["devices"] = {"ac":10,"phone":20,"heater":30}


def calcCarbonEmission(input_data):
    if(input_data['type'] == "transport"):
        return input_data['usage'] * infoset[input_data['type']][input_data['vehicle']]
    elif(input_data['type'] == "devices"):
        return input_data['usage'] * infoset[input_data['type']][input_data['item']]
    else:
        return -1

@app.route('/users/addEntry', methods=['POST'])
def create_transport_entry():
    data = request.json
    ret = calcCarbonEmission(data)
    data['co2'] = ret

    time_stamp = datetime.datetime.now()
    data['ts'] = time_stamp
    resp = collec_type.insert_one(data)
    return jsonify({'message': 'Document created', 'id': str(resp.inserted_id)})


@app.route('/users/getImpInfo', methods=['GET'])
def retUserRewards(email):
    em = request.args.get('email')
    document = collection.find_one({'email': em})
    if document:
        return jsonify({"reward" :document['rewards']})
    else:
        return jsonify({"message":"No User Found"})



@app.route('/users/getTimeSeriesData', methods=['GET'])
def retTimeSeriesData():
    em = request.args.get('email')
    pipeline = [
    {
        '$match': {
            'email': em,
            'ts': {
                '$gte': datetime(2023, 4, 18, 0, 0, 0, tzinfo=timezone.utc),
                '$lte': datetime(2023, 4, 23, 0, 0, 0, tzinfo=timezone.utc)
            }
        }
    }, {
        '$group': {
            '_id': {
                '$dateToString': {
                    'format': '%Y-%m-%d',
                    'date': '$ts'
                }
            },
            'total': {
                '$sum': '$co2'
            }
        }
    }, {
        '$project': {
            'dateString': '$_id',
            'date': {
                '$dateFromString': {
                    'dateString': '$_id',
                    'format': '%Y-%m-%d'
                }
            }
        }
    }, {
        '$sort': {
            'date': 1
        }
    }
    ]
    res = collec_type.aggregate(pipeline)
    return jsonify({"result":res})

# start Flask app
if __name__ == '__main__':
    app.run(debug=True)
