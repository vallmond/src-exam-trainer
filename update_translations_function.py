#!/usr/bin/env python3
"""
Script to update the translateToRussian function in the HTML files
with actual translations from the CSV file.
"""
import csv
import os
import re
import json

def read_csv_translations(csv_file):
    """
    Read translations from a CSV file with proper handling of special characters.
    
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

def update_translation_function(html_file, output_file, translations):
    """
    Update the translateToRussian function in the HTML file.
    
    Args:
        html_file (str): Path to the HTML file to update
        output_file (str): Path to save the updated HTML file
        translations (dict): Dictionary mapping original text to translated text
    """
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Create a JSON string of the translations
    translations_json = json.dumps(translations, ensure_ascii=False, indent=4)
    
    # Create the new translation function
    new_function = f"""
        // Translation function with actual translations from CSV
        function translateToRussian(text) {{
            // Dictionary of translations from CSV file
            const translations = {translations_json};
            
            // Return the translation if available, otherwise return the original text
            return translations[text] || text;
        }}
    """
    
    # Replace the existing translation function
    html_content = re.sub(
        r'// Translation function.*?return \[RU\].*?\}',
        new_function,
        html_content,
        flags=re.DOTALL
    )
    
    # Write the updated HTML file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

def main():
    """Main function to run the script."""
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    translations_path = os.path.join(current_dir, 'translations.csv')
    
    # Files to update
    files_to_update = [
        ('answer_key_creator_fixed.html', 'answer_key_creator_with_translations.html'),
        ('exam_app_fixed.html', 'exam_app_with_translations.html')
    ]
    
    # Read translations from CSV
    translations = read_csv_translations(translations_path)
    
    if not translations:
        print("Error: No translations found in the CSV file.")
        return
    
    # Update each HTML file
    for input_file, output_file in files_to_update:
        input_path = os.path.join(current_dir, input_file)
        output_path = os.path.join(current_dir, output_file)
        
        if os.path.exists(input_path):
            update_translation_function(input_path, output_path, translations)
            print(f"Updated translation function in: {output_path}")
        else:
            print(f"Warning: Input file {input_path} not found.")
    
    print(f"Applied {len(translations)} translations from {translations_path}")
    print("Open these files in your browser to use the applications with translations from your CSV file.")

if __name__ == "__main__":
    main()
