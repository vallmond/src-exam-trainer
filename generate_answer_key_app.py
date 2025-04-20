#!/usr/bin/env python3
"""
Answer Key Generator App Script

This script generates a standalone HTML file for the answer key creator application
by combining the HTML template, CSS, JavaScript, and data files from the src directory.
"""

import json
import os
import sys

def read_file(file_path):
    """Read the contents of a file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    except Exception as e:
        print(f"Error reading file {file_path}: {e}")
        return None

def generate_answer_key_app():
    """Generate the answer key creator application"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    src_dir = os.path.join(base_dir, 'src')
    
    # Check if src directory exists
    if not os.path.exists(src_dir):
        print(f"Error: Source directory {src_dir} not found")
        return False
    
    # Read the template files
    css_content = read_file(os.path.join(src_dir, 'css', 'styles.css'))
    js_content = read_file(os.path.join(src_dir, 'js', 'app.js'))
    html_template = read_file(os.path.join(src_dir, 'index.html'))
    
    if not all([css_content, js_content, html_template]):
        print("Error: Failed to read template files")
        return False
    
    # Read the data files
    try:
        with open(os.path.join(src_dir, 'data', 'exam_questions.json'), 'r', encoding='utf-8') as file:
            questions_data = json.load(file)
        
        with open(os.path.join(src_dir, 'data', 'translations.json'), 'r', encoding='utf-8') as file:
            translations_data = json.load(file)
    except Exception as e:
        print(f"Error reading data files: {e}")
        return False
    
    # Create the output HTML file
    output_file = os.path.join(base_dir, 'answer_key_creator.html')
    
    try:
        with open(output_file, 'w', encoding='utf-8') as file:
            # Start with the HTML doctype and opening tags
            file.write('<!DOCTYPE html>\n<html lang="en">\n<head>\n')
            file.write('    <meta charset="UTF-8">\n')
            file.write('    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n')
            file.write('    <title>Answer Key Creator</title>\n')
            
            # Embed the CSS
            file.write('    <style>\n')
            file.write(css_content)
            file.write('\n    </style>\n')
            
            # Close the head and start the body
            file.write('</head>\n<body>\n')
            
            # Extract the body content from the HTML template
            body_content = html_template.split('<body>')[1].split('</body>')[0]
            
            # Remove the loading section and script tags
            body_content = body_content.replace('<div id="loading" class="loading">Loading questions and translations</div>', '')
            
            # Write the body content
            file.write(body_content)
            
            # Embed the data
            file.write('    <script>\n')
            file.write(f'        // Embedded exam questions data\n')
            file.write(f'        const allQuestionsData = {json.dumps(questions_data, ensure_ascii=False)};\n\n')
            file.write(f'        // Embedded translations data\n')
            file.write(f'        const translations = {json.dumps(translations_data, ensure_ascii=False)};\n')
            file.write('    </script>\n')
            
            # Embed the JavaScript
            file.write('    <script>\n')
            # Modify the JavaScript to initialize directly without loading data
            modified_js = js_content.replace(
                'function initData() {',
                'function initData() {\n        // Data is already embedded in the page'
            )
            file.write(modified_js)
            file.write('    </script>\n')
            
            # Close the body and HTML tags
            file.write('</body>\n</html>')
        
        print(f"Successfully generated answer key creator app: {output_file}")
        return True
    
    except Exception as e:
        print(f"Error generating answer key creator app: {e}")
        return False

if __name__ == "__main__":
    generate_answer_key_app()
