#!/usr/bin/env python3
"""
Script to create a standalone HTML file with embedded exam data.
This creates a single HTML file that can be opened directly in a browser without a server.
"""
import json
import os

def read_json_file(file_path):
    """Read a JSON file and return its contents."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def create_standalone_html(template_path, questions_path, answers_path, output_path):
    """
    Create a standalone HTML file with embedded exam data.
    
    Args:
        template_path (str): Path to the HTML template file
        questions_path (str): Path to the questions JSON file
        answers_path (str): Path to the answers JSON file
        output_path (str): Path to save the standalone HTML file
    """
    # Read the template HTML file
    with open(template_path, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # Read the questions and answers JSON files
    questions = read_json_file(questions_path)
    answers = read_json_file(answers_path)
    
    # Convert the questions and answers to JSON strings
    questions_json = json.dumps(questions)
    answers_json = json.dumps(answers)
    
    # Replace the placeholder data in the HTML template
    html_content = html_content.replace(
        '// This will be replaced with the actual JSON data\n        [{"id":1,"number":"1","category":"REGULAMINY I PODSTAWOWE TERMINY ANGLOJĘZYCZNE\\nSTOSOWANE W SŁUŻBIE RADIOKOMUNIKACYJNEJ MORSKIEJ","question":"Zgodnie z kolejnością pierwszeństwa łączności:","answers":[{"option":"A","text":"łączność ostrzegawcza ma pierwszeństwo przed łącznością pilną"},{"option":"B","text":"łączność ostrzegawcza ma pierwszeństwo przed łącznością publiczną"},{"option":"C","text":"łączność pilna ma pierwszeństwo przed łącznością w niebezpieczeństwie"}]}]',
        questions_json
    )
    
    html_content = html_content.replace(
        '// This will be replaced with the actual JSON data\n        [{"id":1,"number":"1","category":"REGULAMINY I PODSTAWOWE TERMINY ANGLOJĘZYCZNE\\nSTOSOWANE W SŁUŻBIE RADIOKOMUNIKACYJNEJ MORSKIEJ","correct_option":"A"}]',
        answers_json
    )
    
    # Write the standalone HTML file
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Created standalone HTML file: {output_path}")
    print(f"This file contains {len(questions)} questions and can be opened directly in a browser.")

def main():
    """Main function to run the script."""
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    template_path = os.path.join(current_dir, 'exam_standalone.html')
    questions_path = os.path.join(current_dir, 'exam_questions.json')
    answers_path = os.path.join(current_dir, 'correct_answers.json')
    output_path = os.path.join(current_dir, 'exam_app.html')
    
    # Create the standalone HTML file
    create_standalone_html(template_path, questions_path, answers_path, output_path)

if __name__ == "__main__":
    main()
