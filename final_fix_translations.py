#!/usr/bin/env python3
"""
Final script to fix the translations in the answer key creator application.
This version manually processes the CSV to handle problematic entries.
"""
import json
import os
import re

def manually_process_csv(csv_file):
    """
    Manually process the CSV file to handle all edge cases.
    
    Args:
        csv_file (str): Path to the CSV file with translations
        
    Returns:
        dict: Dictionary mapping original text to translated text
    """
    translations = {}
    
    with open(csv_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Skip header
    if lines and lines[0].startswith('Original Text,Russian Translation'):
        lines = lines[1:]
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        if not line:
            i += 1
            continue
        
        # Handle simple case: no quotes, just a comma-separated pair
        if ',' in line and not line.startswith('"') and not '",' in line:
            parts = line.split(',', 1)
            if len(parts) == 2:
                original = parts[0].strip()
                translation = parts[1].strip()
                if original and translation:
                    translations[original] = translation
            i += 1
            continue
        
        # Handle quoted entries
        if line.startswith('"') and '",' in line and line.endswith('"'):
            # Simple quoted entry on a single line
            parts = line.split('",', 1)
            if len(parts) == 2:
                original = parts[0][1:].strip()  # Remove leading quote
                translation = parts[1].strip()
                if translation.startswith('"') and translation.endswith('"'):
                    translation = translation[1:-1]  # Remove quotes
                if original and translation:
                    translations[original] = translation
            i += 1
            continue
        
        # Handle multi-line entries or problematic entries
        # Collect lines until we find a pattern that looks like the end of an entry
        collected_lines = [line]
        j = i + 1
        while j < len(lines) and not (lines[j].strip().startswith('"') and '",' in lines[j].strip()):
            collected_lines.append(lines[j].strip())
            j += 1
        
        # Process the collected lines
        full_line = ' '.join(collected_lines).replace('\n', ' ')
        
        # Try to extract original and translation
        if '",' in full_line:
            parts = full_line.split('",', 1)
            if len(parts) == 2:
                original = parts[0][1:].strip() if parts[0].startswith('"') else parts[0].strip()
                translation = parts[1].strip()
                if translation.endswith('"'):
                    translation = translation[:-1]  # Remove trailing quote
                if original and translation:
                    translations[original] = translation
        
        i = j  # Move to the next entry
    
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
    
    # Create a clean JSON string of the translations
    clean_translations = {}
    for k, v in translations.items():
        # Clean up any problematic characters
        clean_key = k.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
        clean_value = v.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ')
        clean_translations[clean_key] = clean_value
    
    translations_json = json.dumps(clean_translations, ensure_ascii=False, indent=4)
    
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
    output_path = os.path.join(current_dir, 'answer_key_creator_final.html')
    
    # Read translations
    translations = manually_process_csv(translations_path)
    
    # Update the HTML file
    update_app_with_translations(html_path, translations, output_path)
    
    print(f"Created final answer key creator: {output_path}")
    print(f"Applied {len(translations)} translations.")
    print("This is the final version with all translations properly handled.")

if __name__ == "__main__":
    main()
