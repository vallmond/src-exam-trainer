#!/usr/bin/env python3
import csv
import json
import os

def convert_csv_to_json(csv_file, json_file):
    """
    Convert a CSV file with translations to JSON format
    """
    translations = {}
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.reader(file)
            # Skip header row
            next(reader)
            
            for row in reader:
                if len(row) >= 2:
                    original = row[0].strip()
                    translation = row[1].strip()
                    translations[original] = translation
        
        with open(json_file, 'w', encoding='utf-8') as outfile:
            json.dump(translations, outfile, ensure_ascii=False, indent=2)
            
        print(f"Successfully converted {csv_file} to {json_file}")
        print(f"Total translations: {len(translations)}")
        return True
    
    except Exception as e:
        print(f"Error converting CSV to JSON: {e}")
        return False

if __name__ == "__main__":
    base_dir = "/Users/dzmitryshokel/Projects/exam"
    csv_file = os.path.join(base_dir, "translations.csv")
    json_file = os.path.join(base_dir, "src/data/translations.json")
    
    convert_csv_to_json(csv_file, json_file)
