#!/usr/bin/env python3
"""
Script to generate a CSV file with all questions and answers for translation.
The CSV will have two columns: original text and translation (empty for filling in).
"""
import json
import csv
import os

def read_json_file(file_path):
    """Read a JSON file and return its contents."""
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

def extract_texts_for_translation(questions):
    """
    Extract all unique texts that need translation from the questions.
    
    Args:
        questions (list): List of question objects
        
    Returns:
        list: List of unique texts to translate
    """
    texts = set()
    
    # Extract category names
    for question in questions:
        category = question.get('category', '')
        if category:
            # Split category by newline and add each line
            for line in category.split('\n'):
                if line.strip():
                    texts.add(line.strip())
    
    # Extract question texts
    for question in questions:
        question_text = question.get('question', '')
        if question_text:
            texts.add(question_text)
    
    # Extract answer texts
    for question in questions:
        answers = question.get('answers', [])
        for answer in answers:
            answer_text = answer.get('text', '')
            if answer_text:
                texts.add(answer_text)
    
    # Convert set to sorted list for consistent output
    return sorted(list(texts))

def create_translation_csv(questions, output_file):
    """
    Create a CSV file with all texts for translation.
    
    Args:
        questions (list): List of question objects
        output_file (str): Path to save the CSV file
    """
    texts = extract_texts_for_translation(questions)
    
    with open(output_file, 'w', encoding='utf-8', newline='') as f:
        writer = csv.writer(f)
        # Write header
        writer.writerow(['Original Text', 'Russian Translation'])
        
        # Write rows
        for text in texts:
            writer.writerow([text, ''])
    
    return len(texts)

def main():
    """Main function to run the script."""
    # Define file paths
    current_dir = os.path.dirname(os.path.abspath(__file__))
    questions_path = os.path.join(current_dir, 'exam_questions.json')
    output_path = os.path.join(current_dir, 'translation_template.csv')
    
    # Read questions
    questions = read_json_file(questions_path)
    
    # Create translation CSV
    num_texts = create_translation_csv(questions, output_path)
    
    print(f"Created translation template CSV: {output_path}")
    print(f"The file contains {num_texts} unique texts for translation.")
    print("Fill in the second column with Russian translations and save the file.")

if __name__ == "__main__":
    main()
