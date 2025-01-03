import os
import requests
import tempfile
from flask import Flask, request, jsonify

# Configure these two 
API_KEY = "NF-gPAoiaOv0R4FhueNO73rOayfH4pR9wSP"  # Replace the Nightfall API Key
API_ENDPOINT = "https://api.nightfall.ai/v3/scan"

# Initialize Flask app
app = Flask(__name__)

@app.route("/upload", methods=["POST"])
def upload_file():
    """Handles file uploads and scans them for sensitive data."""

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    uploaded_file = request.files["file"]

    if uploaded_file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Save file temporarily
    file_path = os.path.join(tempfile.gettempdir(), uploaded_file.filename)
    try:
        uploaded_file.save(file_path)
    except Exception as e:
        return jsonify({"error": f"Failed to save file: {e}"}), 500

    try:
        # Scan the file
        scan_results = scan_file(file_path)
        return jsonify({"results": scan_results}), 200
    except Exception as e:
        # Return detailed error message
        return jsonify({"error": f"Scan failed: {str(e)}"}), 500
    finally:
        # Clean up temporary file
        if os.path.exists(file_path):
            os.remove(file_path)


def scan_file(file_path):
    """Scans a single file for sensitive data using Nightfall API."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    # Read file content
    with open(file_path, "r", encoding="utf-8", errors="ignore") as file:
        file_content = file.read()

    # Debugging: Check content length
    print(f"File content length: {len(file_content)}")

    if not file_content.strip():
        raise ValueError("File content is empty or invalid.")

    # Prepare payload for Nightfall API
    payload = {
        "policyUUIDs": ["19eadf49-7d6b-4e69-9690-c26c53eb7723"],  # Replace the policy UUID
        "payload": [file_content]
    }

    # Debugging: Print payload details
    print(f"Payload sent to Nightfall API: {payload}")

    # Send request to Nightfall API
    response = requests.post(API_ENDPOINT, headers=headers, json=payload)

    # Debugging: Log response details
    print(f"Response status: {response.status_code}")
    print(f"Response text: {response.text}")

    # Check response and handle errors
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"API error: {response.status_code}, {response.text}")


if __name__ == "__main__":
    # Run the Flask app
    app.run(debug=True, port=5000)
