#!/usr/bin/env python3
"""
Script to generate a template for correct answers based on the exam questions with categories.
This script will create a JSON file with a random correct answer for each question.
In a real scenario, you would manually update this file with the actual correct answers.
"""
import json
import random

def generate_correct_answers(questions_file, output_file):
    """
    Generate a template for correct answers with categories.
    
    Args:
        questions_file (str): Path to the questions JSON file
        output_file (str): Path to save the correct answers JSON file
    """
    try:
        # Load the questions
        with open(questions_file, 'r', encoding='utf-8') as f:
            questions = json.load(f)
        
        # Generate correct answers (randomly for this template)
        correct_answers = []
        for question in questions:
            # Get available options for this question
            options = [answer["option"] for answer in question["answers"]]
            
            # For this template, we'll just pick a random option as the correct answer
            # In a real scenario, you would manually specify the correct answers
            correct_option = random.choice(options)
            
            correct_answers.append({
                "id": question["id"],
                "number": question["number"],
                "category": question["category"],
                "correct_option": correct_option
            })
        
        # Save to file
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(correct_answers, f, ensure_ascii=False, indent=2)
        
        print(f"Successfully generated correct answers template with {len(correct_answers)} entries")
        print(f"Please manually update {output_file} with the actual correct answers")
        
    except Exception as e:
        print(f"Error generating correct answers: {e}")

if __name__ == "__main__":
    questions_file = "exam_questions_with_categories.json"
    output_file = "correct_answers_with_categories.json"
    generate_correct_answers(questions_file, output_file)
