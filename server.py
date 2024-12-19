from flask import Flask, request, jsonify
import os

app = Flask(__name__)

# Ensure uploads directory exists
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    filename = file.filename
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    # Save the file
    file.save(file_path)

    return jsonify({'message': 'File uploaded successfully', 'filename': filename}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
