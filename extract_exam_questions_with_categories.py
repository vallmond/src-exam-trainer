#!/usr/bin/env python3
"""
Script to extract exam questions and answers from a PDF file, identify categories,
and save them in JSON format.
"""
import os
import sys
import json
import re
import pdfplumber

def read_pdf(pdf_path):
    """
    Read a PDF file and extract text from all pages.
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        list: List of strings, each string contains text from one page
    """
    if not os.path.exists(pdf_path):
        print(f"Error: File {pdf_path} does not exist")
        return []
    
    try:
        all_text = []
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    all_text.append(text)
                else:
                    all_text.append("")  # Empty string for pages without text
        
        return all_text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return []

def extract_categories_and_questions(pages_text):
    """
    Extract categories, questions, and answers from the text.
    
    Args:
        pages_text (list): List of strings, each string contains text from one page
        
    Returns:
        list: List of dictionaries, each dictionary contains a question, its answers, and category
    """
    # Combine all pages into a single text
    full_text = "\n".join(pages_text)
    
    # Define regex pattern to identify categories (all caps lines)
    category_pattern = r'([A-ZŻŹĆŃÓŁĘĄŚ\s]+)\n\d+\.'
    
    # Find all potential categories
    categories = re.findall(category_pattern, full_text)
    categories = [cat.strip() for cat in categories if len(cat.strip()) > 10]  # Filter out short matches
    
    print(f"Identified {len(categories)} potential categories")
    
    # Split text by categories
    category_sections = []
    for i, category in enumerate(categories):
        # Find the start position of this category
        category_pos = full_text.find(category)
        
        # Find the end position (start of next category or end of text)
        if i < len(categories) - 1:
            next_category_pos = full_text.find(categories[i+1])
            section_text = full_text[category_pos:next_category_pos]
        else:
            section_text = full_text[category_pos:]
        
        category_sections.append({
            "category": category,
            "text": section_text
        })
    
    # Define regex patterns to extract questions and answers
    question_pattern = r'(\d+)\.\s+(.*?)(?=\n[A-C]\.|\n\d+\.|\Z)'
    answer_pattern = r'([A-C])\.\s+(.*?)(?=\n[A-C]\.|\n\d+\.|\Z)'
    
    # Extract questions and answers from each category section
    all_questions = []
    question_counter = 1  # Global counter for unique question IDs
    
    for section in category_sections:
        category = section["category"]
        section_text = section["text"]
        
        # Find all questions in this section
        for match in re.finditer(question_pattern, section_text, re.DOTALL):
            question_num = match.group(1)
            question_text = match.group(2).strip()
            
            # Find the end position of the current question
            question_end_pos = match.end()
            
            # Find the start position of the next question
            next_question_match = re.search(r'\n\d+\.', section_text[question_end_pos:])
            if next_question_match:
                next_question_pos = question_end_pos + next_question_match.start()
            else:
                next_question_pos = len(section_text)
            
            # Extract the text between the current question and the next question
            question_block = section_text[question_end_pos:next_question_pos]
            
            # Find all answers for this question
            answers = []
            for ans_match in re.finditer(answer_pattern, question_block, re.DOTALL):
                option = ans_match.group(1)
                answer_text = ans_match.group(2).strip()
                answers.append({"option": option, "text": answer_text})
            
            # Add the question and its answers to the list
            if answers:  # Only add if there are answers
                all_questions.append({
                    "id": question_counter,
                    "number": question_num,
                    "category": category,
                    "question": question_text,
                    "answers": answers
                })
                question_counter += 1
    
    return all_questions

def save_to_json(questions, output_path):
    """
    Save the questions and answers to a JSON file.
    
    Args:
        questions (list): List of dictionaries, each dictionary contains a question and its answers
        output_path (str): Path to save the JSON file
    """
    try:
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(questions, f, ensure_ascii=False, indent=2)
        print(f"Successfully saved {len(questions)} questions to {output_path}")
    except Exception as e:
        print(f"Error saving to JSON: {e}")

def main():
    """Main function to run the script."""
    if len(sys.argv) < 2:
        print("Usage: python extract_exam_questions_with_categories.py <path_to_pdf> [output_json_path]")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    output_path = sys.argv[2] if len(sys.argv) > 2 else "exam_questions_with_categories.json"
    
    # Read the PDF
    print(f"Reading PDF: {pdf_path}")
    pages_text = read_pdf(pdf_path)
    
    if not pages_text:
        print("Failed to extract text from the PDF")
        sys.exit(1)
    
    # Extract questions and answers with categories
    print("Extracting categories, questions, and answers...")
    questions = extract_categories_and_questions(pages_text)
    
    # Print a summary
    print(f"Extracted {len(questions)} questions with multiple-choice answers")
    
    # Get unique categories
    categories = set(q["category"] for q in questions)
    print(f"Found {len(categories)} categories:")
    for category in categories:
        category_questions = [q for q in questions if q["category"] == category]
        print(f"  - {category}: {len(category_questions)} questions")
    
    # Save to JSON
    save_to_json(questions, output_path)
    
    # Print a sample question
    if questions:
        print("\nSample question:")
        print(json.dumps(questions[0], ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
