#!/usr/bin/env python3
"""
Script to fix the translation application by properly handling CSV data.
This creates a new version with corrected translations.
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
            # Read the entire file content
            content = f.read()
            
        # Parse the CSV manually to better handle special cases
        lines = content.split('\n')
        if lines and lines[0].startswith('Original Text,Russian Translation'):
            lines = lines[1:]  # Skip header
        
        current_original = ""
        current_translation = ""
        in_quotes = False
        
        for line in lines:
            if not line.strip():
                continue
                
            # If not in quotes and line contains a comma not inside quotes
            if not in_quotes and ',' in line and not (line.count('"') % 2 == 1):
                # If we have accumulated text, save it
                if current_original:
                    translations[current_original.strip()] = current_translation.strip()
                
                # Start a new entry
                parts = line.split(',', 1)
                current_original = parts[0].strip('"')
                current_translation = parts[1].strip('"') if len(parts) > 1 else ""
            else:
                # We're continuing a multi-line entry
                if not current_original:
                    current_original = line
                else:
                    current_translation += "\n" + line
        
        # Add the last entry if any
        if current_original:
            translations[current_original.strip()] = current_translation.strip()
            
    except Exception as e:
        print(f"Error reading CSV: {e}")
        # Fallback to simpler method
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
        except Exception as e2:
            print(f"Fallback method also failed: {e2}")
    
    return translations

def manually_create_translations_dict():
    """Create a small set of sample translations for testing."""
    return {
        "Zgodnie z kolejnością pierwszeństwa łączności:": "В соответствии с приоритетом связи:",
        "łączność ostrzegawcza ma pierwszeństwo przed łącznością pilną": "предупреждающая связь имеет приоритет над срочной связью",
        "łączność ostrzegawcza ma pierwszeństwo przed łącznością publiczną": "предупреждающая связь имеет приоритет над общественной связью",
        "łączność pilna ma pierwszeństwo przed łącznością w niebezpieczeństwie": "срочная связь имеет приоритет над связью в случае бедствия",
        "Łączność publiczna to łączność:": "Общественная связь - это связь:",
        "dla uzyskania porady medycznej": "для получения медицинской консультации",
        "pomiędzy stacją statkową i stacją nadbrzeżną": "между судовой станцией и береговой станцией",
        "do przekazywania ostrzeżeń": "для передачи предупреждений"
    }

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
    
    # Create a JSON string of the translations
    translations_json = json.dumps(translations, ensure_ascii=False, indent=4)
    
    # Create the translation function with the JSON data
    translation_function = f"""
        // Translation function with actual translations
        function translateToRussian(text) {{
            // Dictionary of translations
            const translations = {translations_json};
            
            // Return the translation if available, otherwise return the original text
            return translations[text] || text;
        }}
    """
    
    # For the answer key creator, replace the existing translation function
    if "answer_key_creator" in html_file:
        html_content = re.sub(
            r'// Translation function.*?return \[RU\].*?\}',
            translation_function,
            html_content,
            flags=re.DOTALL
        )
    else:
        # For the exam app, insert the translation function after the script tag
        translation_function_for_exam = translation_function + "\n        let showTranslations = true;"
        html_content = html_content.replace('<script>', '<script>\n' + translation_function_for_exam)
    
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
        ('answer_key_creator_app.html', 'answer_key_creator_fixed.html'),
        ('exam_app.html', 'exam_app_fixed.html')
    ]
    
    # Try to read translations from CSV
    translations = read_csv_translations(translations_path)
    
    # If no translations were found, use a small set of sample translations
    if not translations:
        print("Warning: Could not read translations from CSV. Using sample translations instead.")
        translations = manually_create_translations_dict()
    
    # Update each HTML file
    for input_file, output_file in files_to_update:
        input_path = os.path.join(current_dir, input_file)
        output_path = os.path.join(current_dir, output_file)
        
        if os.path.exists(input_path):
            update_html_with_translations(input_path, output_path, translations)
            print(f"Created fixed file: {output_path}")
        else:
            print(f"Warning: Input file {input_path} not found.")
    
    print(f"Applied {len(translations)} translations.")
    print("Open these files in your browser to use the applications with fixed translations.")

if __name__ == "__main__":
    main()
