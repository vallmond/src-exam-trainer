#!/usr/bin/env python3
"""
Script to directly fix the translations in the answer key creator application.
Uses a simpler approach to handle the CSV file.
"""
import json
import os
import csv
import re

def read_translations_csv(csv_file):
    """
    Read translations from a CSV file using the csv module.
    
    Args:
        csv_file (str): Path to the CSV file with translations
        
    Returns:
        dict: Dictionary mapping original text to translated text
    """
    translations = {}
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        # Skip header
        next(reader, None)
        
        for row in reader:
            if len(row) >= 2:
                original = row[0].strip()
                translation = row[1].strip()
                if original and translation:
                    # Fix multi-line text by replacing newlines with spaces
                    original = original.replace('\n', ' ')
                    translation = translation.replace('\n', ' ')
                    translations[original] = translation
    
    return translations

def update_app_with_translations(html_file, translations, output_file):
    """
    Update the HTML file with the translations.
    
    Args:
        html_file (str): Path to the HTML file to update
        translations (dict): Dictionary of translations
        output_file (str): Path to save the updated HTML file
    """
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Create a JSON string of the translations
    translations_json = json.dumps(translations, ensure_ascii=False, indent=4)
    
    # Create the translation function
    translation_function = f"""
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
        translation_function,
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
    html_path = os.path.join(current_dir, 'answer_key_creator_app.html')
    output_path = os.path.join(current_dir, 'answer_key_creator_app_fixed.html')
    
    # Read translations
    translations = read_translations_csv(translations_path)
    
    # Update the HTML file
    update_app_with_translations(html_path, translations, output_path)
    
    print(f"Created fixed answer key creator: {output_path}")
    print(f"Applied {len(translations)} translations.")
    print("Please use this file as your final version.")

if __name__ == "__main__":
    main()
