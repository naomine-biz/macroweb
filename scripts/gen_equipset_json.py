#!python3

import json

def parse_data(input_data):
    sets = input_data.strip().split('\n\n')
    
    result = []
    
    for set_data in sets:
        lines = set_data.strip().split('\n')
        
        first_line = lines[0].split(':')
        number = int(first_line[0].strip())
        name = first_line[1].strip()

        items = []
        for line in lines[1:]:
            parts = line.split(' : ')
            item_name = ""
            if len(parts) == 3:
                item_name = parts[2].strip()
            elif len(parts) == 2:
                item_name = ""
            items.append(item_name)

        result.append({
            "number": number,
            "name": name,
            "items": items
        })
    
    return result

def main():
    input_file = '/tmp/eq1.new'
    output_file = 'src/data/eq.json'
    
    with open(input_file, 'r', encoding='utf-8') as file:
        input_data = file.read()

    result = parse_data(input_data)

    with open(output_file, 'w', encoding='utf-8') as json_file:
        json.dump(result, json_file, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
