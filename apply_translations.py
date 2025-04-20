#!/usr/bin/env python3
"""
Script to apply translations from a CSV file to the standalone HTML application.
This updates the application with actual Russian translations instead of placeholders.
"""
import csv
import os
import re
import json

def read_csv_translations(csv_file):
    """
    Read translations from a CSV file.
    
    Args:
        csv_file (str): Path to the CSV file with translations
        
    Returns:
        dict: Dictionary mapping original text to translated text
    """
    translations = {}
    
    with open(csv_file, 'r', encoding='utf-8', newline='') as f:
        reader = csv.reader(f)
        # Skip header
        next(reader)
        
        for row in reader:
            if len(row) >= 2 and row[0] and row[1]:
                original = row[0]
                translation = row[1]
                translations[original] = translation
    
    return translations

def update_html_with_translations(html_file, output_file, translations):
    """
    Update the HTML file with actual translations.
    
    Args:
        html_file (str): Path to the HTML file to update
        output_file (str): Path to save the updated HTML file
        translations (dict): Dictionary mapping original text to translated text
    """
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Replace the placeholder translation function with actual translations
    translation_function = """
        // Translation function with actual translations
        function translateToRussian(text) {
            // Dictionary of translations
            const translations = {
    """
    
    # Add each translation as a key-value pair in the JavaScript object
    for original, translation in translations.items():
        # Escape quotes and backslashes in the strings
        original_escaped = original.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        translation_escaped = translation.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
        translation_function += f'            "{original_escaped}": "{translation_escaped}",\n'
    
    translation_function += """        };
            
            // Return the translation if available, otherwise return the original text
            return translations[text] || text;
        }
    """
    
    # Replace the placeholder translation function
    html_content = re.sub(
        r'// Translation function \(placeholder.*?return \"\[RU\] \" \+ text;\s+\}',
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
    output_path = os.path.join(current_dir, 'answer_key_creator_with_translations.html')
    
    # Check if translations file exists
    if not os.path.exists(translations_path):
        print(f"Error: Translations file not found at {translations_path}")
        print("Please rename your filled-in translation file to 'translations.csv'")
        return
    
    # Read translations
    translations = read_csv_translations(translations_path)
    
    if not translations:
        print("Error: No translations found in the CSV file.")
        print("Make sure the CSV file has at least one row with both original text and translation.")
        return
    
    # Update HTML with translations
    update_html_with_translations(html_path, output_path, translations)
    
    print(f"Created HTML file with translations: {output_path}")
    print(f"Applied {len(translations)} translations.")
    print("Open this file in your browser to use the application with Russian translations.")

if __name__ == "__main__":
    main()
