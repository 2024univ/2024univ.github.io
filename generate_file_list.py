import os
import json

def generate_file_list_json(folder_path, output_file):
    # folder_path에 있는 파일 목록을 가져옵니다.
    file_list = os.listdir(folder_path)
    
    # 가져온 파일 목록 중 .pdf 파일만 선택합니다.
    pdf_files = [file for file in file_list if file.endswith('.pdf')]

    # output_file로 지정된 파일에 JSON 형식으로 pdf_files를 저장합니다.
    with open(output_file, 'w') as outfile:
        json.dump(pdf_files, outfile)

if __name__ == '__main__':
    # 'data' 폴더에 있는 PDF 파일 목록을 'file_list.json' 파일로 저장합니다.
    generate_file_list_json('./data1', 'report_list.json')
