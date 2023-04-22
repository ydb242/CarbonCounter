import requests
import json

url = "https://www.carboninterface.com/api/v1/estimates"
api_key = "VsmxxeigkWZ1LC3qKZMuA"
api_key = "Bearer "+api_key

headers = {
    "Authorization": api_key,
    "Content-Type": "application/json"
}
data = {
    "type": "electricity",
    "electricity_unit": "mwh",
    "electricity_value": 42,
    "country": "us",
    "state": "fl"
}

response = requests.post(url, headers=headers, data=json.dumps(data))

if response.status_code == 200:
    response_data = response.json()
    print(response_data)
else:
    print(f"Error: {response.status_code} - {response.text}")
