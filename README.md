# Simple Platform for File Uploads

This project sets up a basic platform using Flask for file uploads. It serves as the foundation for a Data Loss Prevention (DLP) solution.

## Features

- File Upload Endpoint: Accepts file uploads via an HTTP POST request.
- Directory Management: Saves uploaded files to a specified directory (uploads).
- JSON Response: Returns success or error messages in JSON format.

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Python 3.8 or higher
- pip (Python package manager)

### Step 1: Clone the Repository
Clone the GitHub repository to your local machine:

```
git clone https://github.com/alpacabar/dlp
cd dlp
```

### Step 2: Set Up the Virtual Environment

Create and activate a virtual environment:
#### On Windows:
```
python -m venv venv
venv\Scripts\activate
```
#### On macOS/Linux:
```
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

Install the required Python packages:
```
pip install -r requirements.txt
```

## Usage
### Run the Flask Server
Start the Flask server:
```
python server.py
```
The server will run at ```http://localhost:5000/.```

### Test the /upload Endpoint
Using Postman: 
1. Open Postman and create a new POST request.
2. Set the URL to:
```
http://localhost:5000/upload
```
3. Under the Body tab, select form-data.
4. Add a key named ```file``` and attach any test file.
5. Click Send.

Using Python script: 
Run the provided ```client.py``` script:
```
python client.py
```
This script uploads a test file and prints the server's response.


