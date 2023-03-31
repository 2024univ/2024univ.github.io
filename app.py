import os
import json
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/getFileList')
def get_file_list():
    folder_path = './data'
    file_list = os.listdir(folder_path)
    pdf_files = [file for file in file_list if file.endswith('.pdf')]
    return jsonify(pdf_files)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
