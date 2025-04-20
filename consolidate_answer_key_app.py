#!/usr/bin/env python3
"""
Script to create a single consolidated answer key creator application
with all functionality including translations.
"""
import json
import os
import csv
import re

def read_json_file(file_path):
    """Read a JSON file and return its contents."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def read_csv_translations(csv_file):
    """
    Read translations from a CSV file.
    
    Args:
        csv_file (str): Path to the CSV file with translations
        
    Returns:
        dict: Dictionary mapping original text to translated text
    """
    translations = {}
    
    try:
        with open(csv_file, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            # Skip header
            next(reader, None)
            
            for row in reader:
                if len(row) >= 2:
                    original = row[0].strip()
                    translation = row[1].strip()
                    if original and translation:
                        translations[original] = translation
    except Exception as e:
        print(f"Error reading CSV: {e}")
    
    return translations

def create_consolidated_app(template_path, questions_path, translations_path, output_path):
    """
    Create a consolidated answer key creator application.
    
    Args:
        template_path (str): Path to the HTML template file
        questions_path (str): Path to the questions JSON file
        translations_path (str): Path to the translations CSV file
        output_path (str): Path to save the consolidated HTML file
    """
    # Read the template HTML file
    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Read the questions JSON file
    questions = read_json_file(questions_path)
    
    # Read translations from CSV
    translations = read_csv_translations(translations_path)
    
    # Convert the questions to JSON string
    questions_json = json.dumps(questions)
    
    # Create a JSON string of the translations
    translations_json = json.dumps(translations, ensure_ascii=False, indent=4)
    
    # Replace the placeholder data in the HTML template
    html_content = html_content.replace(
        '// This will be replaced with the actual JSON data\n        [{"id":1,"number":"1","category":"REGULAMINY I PODSTAWOWE TERMINY ANGLOJĘZYCZNE\\nSTOSOWANE W SŁUŻBIE RADIOKOMUNIKACYJNEJ MORSKIEJ","question":"Zgodnie z kolejnością pierwszeństwa łączności:","answers":[{"option":"A","text":"łączność ostrzegawcza ma pierwszeństwo przed łącznością pilną"},{"option":"B","text":"łączność ostrzegawcza ma pierwszeństwo przed łącznością publiczną"},{"option":"C","text":"łączność pilna ma pierwszeństwo przed łącznością w niebezpieczeństwie"}]}]',
        questions_json
    )
    
    # Replace the translation function with actual translations
    translation_function = f"""
        // Translation function with actual translations from CSV
        function translateToRussian(text) {{
            // Dictionary of translations from CSV file
            const translations = {translations_json};
            
            // Return the translation if available, otherwise return the original text
            return translations[text] || text;
        }}
    """
    
    # Replace the placeholder translation function
    html_content = re.sub(
        r'// Translation function \(placeholder.*?return \"\[RU\] \" \+ text;\s+\}',
        translation_function,
        html_content,
        flags=re.DOTALL
    )
    
    # Write the consolidated HTML file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Created consolidated answer key creator: {output_path}")
    print(f"This file contains {len(questions)} questions and {len(translations)} translations.")
    print("This is the final version with all functionality including translations.")

def main():
    """Main function to run the script."""
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(current_dir, 'answer_key_creator.html')
    questions_path = os.path.join(current_dir, 'exam_questions.json')
    translations_path = os.path.join(current_dir, 'translations.csv')
    output_path = os.path.join(current_dir, 'answer_key_creator_app.html')
    
    # Create the consolidated HTML file
    create_consolidated_app(template_path, questions_path, translations_path, output_path)

if __name__ == "__main__":
    main()
