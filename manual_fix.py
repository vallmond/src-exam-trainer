#!/usr/bin/env python3
"""
Manual fix for the translations in the answer key creator application.
This script directly edits the HTML file to replace the translation function.
"""
import os
import re

def create_translation_function():
    """
    Create a translation function that handles problematic entries.
    
    Returns:
        str: The JavaScript translation function
    """
    return """
        // Translation function with proper handling of special cases
        function translateToRussian(text) {
            // Handle multi-line text by replacing newlines with spaces
            const normalizedText = text.replace(/\\n/g, ' ');
            
            // Try to find a translation for the normalized text
            if (translations[normalizedText]) {
                return translations[normalizedText];
            }
            
            // If not found, try the original text
            if (translations[text]) {
                return translations[text];
            }
            
            // If still not found, return the original text
            return text;
        }
    """

def update_html_file(html_file, output_file):
    """
    Update the HTML file with a more robust translation function.
    
    Args:
        html_file (str): Path to the HTML file to update
        output_file (str): Path to save the updated HTML file
    """
    with open(html_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Replace the translation function
    translation_function = create_translation_function()
    
    # Find the existing translation function and replace it
    pattern = r'function translateToRussian\(text\) \{.*?return translations\[text\] \|\| text;.*?\}'
    if re.search(pattern, html_content, re.DOTALL):
        html_content = re.sub(pattern, translation_function, html_content, flags=re.DOTALL)
    else:
        # If not found, insert it after the translations dictionary
        pattern = r'const translations = \{.*?\};'
        html_content = re.sub(pattern, r'\g<0>\n\n' + translation_function, html_content, flags=re.DOTALL)
    
    # Write the updated HTML file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

def main():
    """Main function to run the script."""
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    html_path = os.path.join(current_dir, 'answer_key_creator_final.html')
    output_path = os.path.join(current_dir, 'answer_key_creator_final_fixed.html')
    
    # Update the HTML file
    update_html_file(html_path, output_path)
    
    print(f"Created final fixed answer key creator: {output_path}")
    print("This version includes a more robust translation function that handles special cases.")
    print("Please use this as your final version.")

if __name__ == "__main__":
    main()
