#!/usr/bin/env python3
"""
Script to fix the multi-line translation issues in the answer key creator application.
"""
import json
import os
import csv
import re

def read_csv_translations_properly(csv_file):
    """
    Read translations from a CSV file with proper handling of multi-line text.
    
    Args:
        csv_file (str): Path to the CSV file with translations
        
    Returns:
        dict: Dictionary mapping original text to translated text
    """
    translations = {}
    
    try:
        # Read the entire file content
        with open(csv_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split by lines and process
        lines = content.split('\n')
        
        # Skip header
        if lines and lines[0].startswith('Original Text,Russian Translation'):
            lines = lines[1:]
        
        # Process each line
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            if not line:
                i += 1
                continue
            
            # Check if this is the start of a translation entry
            if line.startswith('"') and '","' in line:
                # This is a complete line with both original and translation
                parts = line.split('","', 1)
                if len(parts) == 2:
                    original = parts[0][1:]  # Remove leading quote
                    translation = parts[1]
                    if translation.endswith('"'):
                        translation = translation[:-1]  # Remove trailing quote
                    
                    # Clean up any escaped quotes
                    original = original.replace('""', '"')
                    translation = translation.replace('""', '"')
                    
                    translations[original] = translation
            elif line.startswith('"') and not line.endswith('"'):
                # This is the start of a multi-line entry
                original = line[1:]  # Remove leading quote
                translation_lines = []
                
                # Find the end of the original text
                j = i + 1
                while j < len(lines) and not lines[j].strip().startswith('"'):
                    original += '\n' + lines[j].strip()
                    j += 1
                
                if j < len(lines) and '","' in lines[j]:
                    # Found the line with the translation start
                    parts = lines[j].split('","', 1)
                    if len(parts) == 2:
                        original += '\n' + parts[0]
                        translation_lines.append(parts[1])
                        
                        # Find the end of the translation
                        k = j + 1
                        while k < len(lines) and not lines[k].strip().endswith('"'):
                            translation_lines.append(lines[k].strip())
                            k += 1
                        
                        if k < len(lines) and lines[k].strip().endswith('"'):
                            translation_lines.append(lines[k].strip()[:-1])  # Remove trailing quote
                        
                        translation = '\n'.join(translation_lines)
                        
                        # Clean up any escaped quotes
                        original = original.replace('""', '"')
                        translation = translation.replace('""', '"')
                        
                        translations[original] = translation
                        
                        i = k  # Skip to the end of this entry
            
            i += 1
    
    except Exception as e:
        print(f"Error reading CSV: {e}")
        
        # Fallback to simpler method for debugging
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

def manually_fix_problematic_entries(translations):
    """
    Manually fix known problematic entries.
    
    Args:
        translations (dict): Dictionary of translations
        
    Returns:
        dict: Fixed dictionary of translations
    """
    # Fix specific problematic entries
    problematic_keys = [
        "134. Jaki symbol został ustalony przez IMO dla wskazania transpondera AIS SART na mapie\nelektronicznej?"
    ]
    
    for key in problematic_keys:
        if key in translations:
            value = translations[key]
            # Replace newlines with spaces in the key
            new_key = key.replace('\n', ' ')
            # Add the fixed entry and remove the problematic one
            translations[new_key] = value
            del translations[key]
    
    return translations

def create_fixed_app(template_path, questions_path, translations_path, output_path):
    """
    Create a fixed answer key creator application.
    
    Args:
        template_path (str): Path to the HTML template file
        questions_path (str): Path to the questions JSON file
        translations_path (str): Path to the translations CSV file
        output_path (str): Path to save the fixed HTML file
    """
    # Read the template HTML file
    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Read the questions JSON file
    questions = json.load(open(questions_path, 'r', encoding='utf-8'))
    
    # Read translations from CSV with proper handling of multi-line text
    translations = read_csv_translations_properly(translations_path)
    
    # Fix problematic entries
    translations = manually_fix_problematic_entries(translations)
    
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
    
    # Write the fixed HTML file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Created fixed answer key creator: {output_path}")
    print(f"This file contains {len(questions)} questions and {len(translations)} translations.")
    print("Multi-line translation issues have been fixed.")

def main():
    """Main function to run the script."""
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(current_dir, 'answer_key_creator.html')
    questions_path = os.path.join(current_dir, 'exam_questions.json')
    translations_path = os.path.join(current_dir, 'translations.csv')
    output_path = os.path.join(current_dir, 'answer_key_creator_app.html')
    
    # Create the fixed HTML file
    create_fixed_app(template_path, questions_path, translations_path, output_path)

if __name__ == "__main__":
    main()
