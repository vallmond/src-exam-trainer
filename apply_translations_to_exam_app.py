#!/usr/bin/env python3
"""
Script to apply translations from a CSV file to the exam application.
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
    
    # Add translation functionality to the HTML file
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
        
        let showTranslations = true;
    """
    
    # Add translation functionality to the HTML
    # Find the script tag and insert our translation function after it
    html_content = html_content.replace('<script>', '<script>\n' + translation_function)
    
    # Add translation toggle UI
    translation_toggle_html = """
        <div class="translation-toggle" style="margin-bottom: 10px; text-align: right;">
            <label for="translation-checkbox" style="margin-right: 5px; font-size: 14px;">Show translations:</label>
            <input type="checkbox" id="translation-checkbox" checked>
        </div>
    """
    
    # Add the translation toggle before the progress div
    html_content = html_content.replace('<div id="progress" class="progress">', translation_toggle_html + '<div id="progress" class="progress">')
    
    # Add CSS for translation elements
    translation_css = """
        .info-icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-color: #2196F3;
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 16px;
            font-size: 12px;
            margin-left: 5px;
            cursor: help;
            position: relative;
        }
        .tooltip {
            visibility: hidden;
            width: 300px;
            background-color: #555;
            color: #fff;
            text-align: left;
            border-radius: 6px;
            padding: 10px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -150px;
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 14px;
            line-height: 1.4;
        }
        .info-icon:hover .tooltip {
            visibility: visible;
            opacity: 1;
        }
    """
    
    # Add the CSS to the style section
    html_content = html_content.replace('</style>', translation_css + '\n    </style>')
    
    # Add translation toggle event listener
    translation_toggle_js = """
            // Translation toggle
            document.getElementById('translation-checkbox').addEventListener('change', (e) => {
                showTranslations = e.target.checked;
                if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
                    displayQuestion(currentQuestionIndex);
                }
            });
    """
    
    # Add the event listener to the DOMContentLoaded section
    html_content = html_content.replace('document.addEventListener(\'DOMContentLoaded\', initializeApp);', 
                                       translation_toggle_js + '\n        document.addEventListener(\'DOMContentLoaded\', initializeApp);')
    
    # Modify the displayQuestion function to add translation icons
    # This is more complex as we need to find and modify the function
    
    # First, find the displayQuestion function
    display_question_pattern = r'(function displayQuestion\(index\) \{.*?\})'
    display_question_match = re.search(display_question_pattern, html_content, re.DOTALL)
    
    if display_question_match:
        display_question_function = display_question_match.group(1)
        
        # Modify the question display to add translation icon
        modified_function = display_question_function.replace(
            '<span>${index + 1}. ${question.question}</span>',
            '<span>${index + 1}. ${question.question}</span>' + 
            '${showTranslations ? `<span class="info-icon">i<span class="tooltip">${translateToRussian(question.question)}</span></span>` : \'\'}'
        )
        
        # Modify the answer options to add translation icons
        modified_function = modified_function.replace(
            '<label for="answer-${answerIndex}">${answer.option}. ${answer.text}</label>',
            '<label for="answer-${answerIndex}">${answer.option}. ${answer.text}</label>' +
            '${showTranslations ? `<span class="info-icon">i<span class="tooltip">${translateToRussian(answer.text)}</span></span>` : \'\'}'
        )
        
        # Replace the original function with the modified one
        html_content = html_content.replace(display_question_function, modified_function)
    
    # Write the updated HTML file
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)

def main():
    """Main function to run the script."""
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    translations_path = os.path.join(current_dir, 'translations.csv')
    html_path = os.path.join(current_dir, 'exam_app.html')
    output_path = os.path.join(current_dir, 'exam_app_with_translations.html')
    
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
    
    print(f"Created exam application with translations: {output_path}")
    print(f"Applied {len(translations)} translations.")
    print("Open this file in your browser to use the exam application with Russian translations.")

if __name__ == "__main__":
    main()
