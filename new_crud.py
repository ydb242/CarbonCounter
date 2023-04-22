from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.objectid import ObjectId

# create Flask app
app = Flask(__name__)

# connect to MongoDB server
# Connect to MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/", connect=False)
db = client["mydb"]
collection = db["curr"]

# define endpoints for CRUD operations

# create document
@app.route('/documents/insert', methods=['POST'])
def create_document():
    data = request.json
    data['_id'] = ObjectId(data['_id'])
    result = collection.insert_one(data)
    return jsonify({'message': 'Document created', 'id': str(result.inserted_id)})

# read 10 random documents
@app.route('/documents', methods=['GET'])
def read_rand10_documents():
    documents = list(collection.find().limit(10))
    for d in documents:
        d['_id'] = str(d['_id'])
    return jsonify({'documents': documents})

# read document by ID
@app.route('/documents/<id>', methods=['GET'])
def read_document(id):
    document = collection.find_one({'_id': ObjectId(id)})
    if document:
        document['_id'] = str(document['_id'])
        return jsonify(document)
    else:
        return jsonify({'message': 'Document not found'})

# update document
@app.route('/documents/<id>', methods=['PUT'])
def update_document(id):
    data = request.json
    data['_id'] = ObjectId(data['_id'])
    result = collection.update_one({'_id': data['_id']}, {'$set': data})
    if result.modified_count == 1:
        return jsonify({'message': 'Document updated'})
    else:
        return jsonify({'message': 'Document not found'})

# delete document
@app.route('/documents/<id>', methods=['DELETE'])
def delete_document(id):
    new_id = ObjectId(id)
    result = collection.delete_one({'_id': new_id})
    if result.deleted_count == 1:
        return jsonify({'message': 'Document deleted'})
    else:
        return jsonify({'message': 'Document not found'})

# start Flask app
if __name__ == '__main__':
    app.run(debug=True)
