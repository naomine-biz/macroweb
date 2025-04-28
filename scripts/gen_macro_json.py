#!python3

import json
import re

def parse_text_file(file_path):
    data = []
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
    
    current_title = None
    current_data = []
    
    for line in lines:
        line = line.strip()
        if not line:
            if current_title and current_data:
                data.append({
                    "title": current_title,
                    "data": current_data
                })
            current_title = None
            current_data = []
        elif current_title is None:
            current_title = re.findall(r'\[\[\[(.*?)\]\]\]', line)
        else:
            current_data.append(line)
    
    if current_title and current_data:
        data.append({
            "title": current_title,
            "data": current_data
        })
    
    return data

def save_to_json(data, output_file):
    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    input_file = '/tmp/mc1.new'
    output_file = 'src/data/mc.json'

    parsed_data = parse_text_file(input_file)

    save_to_json(parsed_data, output_file)
