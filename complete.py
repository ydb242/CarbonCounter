import pymongo
import requests

# Connect to MongoDB
client = pymongo.MongoClient("localhost",27017)
db = client["customers"]
collection = db["current"]

# Download the JSON data
url = "https://data.cityofnewyork.us/api/views/25th-nujf/rows.json?accessType=DOWNLOAD"
response = requests.get(url)
data = response.json()

# Get the field names
fields = [field["name"] for field in data["meta"]["view"]["columns"]]

# Convert each row to a dictionary and insert into MongoDB
i=0
for row in data["data"]:
    if(i==10):
        break
    row_dict = {}
    for i, value in enumerate(row):
        row_dict[fields[i]] = value
    collection.insert_one(row_dict)
    i+=1
