#!/usr/bin/env python3
"""
Script to read PDF file content and extract text.
"""
import os
import sys
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

def main():
    """Main function to run the script."""
    if len(sys.argv) != 2:
        print("Usage: python read_pdf.py <path_to_pdf>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    pages_text = read_pdf(pdf_path)
    
    if pages_text:
        print(f"Successfully read {len(pages_text)} pages from the PDF")
        # Print first page as a sample
        if pages_text:
            print("\nSample text from first page:")
            print("-" * 50)
            print(pages_text[0][:500] + "..." if len(pages_text[0]) > 500 else pages_text[0])
            print("-" * 50)
    else:
        print("Failed to extract text from the PDF")

if __name__ == "__main__":
    main()
