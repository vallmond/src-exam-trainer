/**
 * Script to generate a standalone HTML exam application
 * This script reads JSON data files and generates a complete HTML file
 * with embedded CSS and JavaScript
 */

const fs = require('fs');
const path = require('path');

// Define paths
const dataDir = path.join(__dirname, 'src', 'data');
const outputDir = path.join(__dirname, 'final');
const outputFile = path.join(outputDir, 'exam_app_with_translations.html');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Read JSON data files
const questionsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'exam_questions.json'), 'utf8'));
const correctAnswersData = JSON.parse(fs.readFileSync(path.join(dataDir, 'correct_answers.json'), 'utf8'));
const translationsData = JSON.parse(fs.readFileSync(path.join(dataDir, 'translations.json'), 'utf8'));

// Create a map of correct answers for easy lookup
const correctAnswersMap = {};
correctAnswersData.forEach(answer => {
  correctAnswersMap[answer.id] = answer.correct_option;
});

// Generate the HTML content
const htmlContent = `<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exam Application</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        h1, h2, h3 {
            margin-bottom: 15px;
            color: #2c3e50;
        }
        
        button {
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin: 5px;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #2980b9;
        }
        
        button:disabled {
            background-color: #95a5a6;
            cursor: not-allowed;
        }
        
        select, input {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
            margin-bottom: 15px;
            width: 100%;
            max-width: 300px;
        }
        
        .container {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        
        /* Exam settings styles */
        #exam-settings {
            margin-bottom: 30px;
        }
        
        .settings-group {
            margin-bottom: 20px;
        }
        
        /* Question styles */
        .hidden {
            display: none;
        }
        
        #question-container {
            margin-bottom: 30px;
        }
        
        .category {
            font-weight: bold;
            color: #7f8c8d;
            margin-bottom: 10px;
        }
        
        .question {
            font-size: 18px;
            margin-bottom: 20px;
            position: relative;
        }
        
        .answers {
            margin-bottom: 20px;
        }
        
        .answer-option {
            margin-bottom: 15px;
            padding: 10px;
            border: 1px solid #eee;
            border-radius: 4px;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            position: relative;
        }
        
        .answer-option:hover {
            background-color: #f9f9f9;
        }
        
        .answer-option input[type="radio"] {
            margin-right: 10px;
            width: auto;
        }
        
        /* Progress styles */
        #progress {
            margin-bottom: 20px;
            text-align: center;
        }
        
        .progress-bar {
            background-color: #ecf0f1;
            height: 10px;
            border-radius: 5px;
            margin-top: 10px;
            overflow: hidden;
        }
        
        .progress-fill {
            background-color: #2ecc71;
            height: 100%;
            width: 0;
            transition: width 0.3s;
        }
        
        /* Controls styles */
        .controls {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        
        /* Results styles */
        .score-summary {
            background-color: #e8f4fc;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 30px;
            text-align: center;
        }
        
        .results-question {
            margin-bottom: 20px;
            padding: 15px;
            border-radius: 4px;
            border-left: 5px solid #ddd;
        }
        
        .correct {
            border-left-color: #2ecc71;
            background-color: #f0fff0;
        }
        
        .incorrect {
            border-left-color: #e74c3c;
            background-color: #fff0f0;
        }
        
        .correct-selected {
            background-color: #d5f5e3;
        }
        
        .incorrect-selected {
            background-color: #fadbd8;
        }
        
        .correct-answer {
            background-color: #d5f5e3;
        }
        
        /* Info button and tooltip */
        .info-button {
            display: inline-block;
            width: 20px;
            height: 20px;
            background-color: #3498db;
            color: white;
            border-radius: 50%;
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            cursor: pointer;
            margin-left: 10px;
            position: relative;
        }
        
        .tooltip {
            visibility: hidden;
            width: 200px;
            background-color: #34495e;
            color: white;
            text-align: center;
            border-radius: 4px;
            padding: 5px;
            position: absolute;
            z-index: 1;
            bottom: 125%;
            left: 50%;
            margin-left: -100px;
            opacity: 0;
            transition: opacity 0.3s;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .info-button:hover .tooltip {
            visibility: visible;
            opacity: 1;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
            body {
                padding: 10px;
            }
            
            .container {
                padding: 15px;
            }
            
            .controls {
                flex-direction: column;
            }
            
            .controls button {
                margin-bottom: 10px;
                width: 100%;
            }
            
            .question {
                font-size: 16px;
            }
            
            .tooltip {
                width: 150px;
                margin-left: -75px;
            }
        }
        
        /* Additional mobile optimizations */
        @media (max-width: 480px) {
            h1 {
                font-size: 24px;
            }
            
            .answer-option {
                padding: 8px;
            }
            
            .answer-option label {
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Maritime Radio Communication Exam</h1>
        
        <!-- Exam Settings -->
        <div id="exam-settings">
            <h2>Exam Settings</h2>
            
            <div class="settings-group">
                <label for="category-select">Select Category:</label>
                <select id="category-select">
                    <option value="all">All Categories</option>
                    <!-- Categories will be populated dynamically -->
                </select>
            </div>
            
            <div class="settings-group">
                <label for="question-count">Number of Questions:</label>
                <input type="number" id="question-count" min="5" max="100" value="20">
            </div>
            
            <div class="settings-group">
                <label for="show-translations">Show Translations:</label>
                <input type="checkbox" id="show-translations" checked>
            </div>
            
            <button id="start-btn">Start Exam</button>
        </div>
        
        <!-- Question Display -->
        <div id="question-container" class="hidden"></div>
        
        <!-- Progress Indicator -->
        <div id="progress" class="hidden">
            <div>Question <span id="current-question">1</span> of <span id="total-questions">20</span></div>
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
        </div>
        
        <!-- Controls -->
        <div class="controls hidden">
            <button id="prev-btn">Previous</button>
            <button id="next-btn">Next</button>
            <button id="finish-btn" class="hidden">Finish Exam</button>
        </div>
        
        <!-- Results -->
        <div id="results" class="hidden">
            <h2>Exam Results</h2>
            <div id="results-container"></div>
            <div class="controls">
                <button id="restart-btn">Restart</button>
                <button id="export-btn">Export as PDF</button>
            </div>
        </div>
    </div>
    
    <!-- External libraries for PDF export -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    
    <script>
        // Embedded data
        const allQuestionsData = ${JSON.stringify(questionsData)};
        const correctAnswersMap = ${JSON.stringify(correctAnswersMap)};
        const translations = ${JSON.stringify(translationsData)};
        
        // Global variables
        let allQuestions = allQuestionsData;
        let questions = [];
        let userAnswers = [];
        let currentQuestionIndex = 0;
        let selectedCategory = 'all';
        let questionCount = 20;
        let examStarted = false;
        let showTranslations = true;
        
        // Initialize the application when the DOM is loaded
        document.addEventListener('DOMContentLoaded', initializeApp);
        
        function initializeApp() {
            // Populate categories
            populateCategories();
            
            // Add event listeners
            document.getElementById('start-btn').addEventListener('click', startExam);
            document.getElementById('prev-btn').addEventListener('click', () => {
                currentQuestionIndex--;
                displayQuestion(currentQuestionIndex);
            });
            document.getElementById('next-btn').addEventListener('click', () => {
                currentQuestionIndex++;
                displayQuestion(currentQuestionIndex);
            });
            document.getElementById('finish-btn').addEventListener('click', () => {
                showResults();
            });
            document.getElementById('restart-btn').addEventListener('click', () => {
                // Show settings screen again
                document.getElementById('exam-settings').style.display = 'block';
                document.getElementById('question-container').classList.add('hidden');
                document.getElementById('progress').classList.add('hidden');
                document.querySelector('.controls').classList.add('hidden');
                document.getElementById('results').classList.add('hidden');
                examStarted = false;
            });
            document.getElementById('export-btn').addEventListener('click', exportResultsAsPDF);
            
            // Add keyboard event listener
            document.addEventListener('keydown', handleKeyboardInput);
            
            // Add translation toggle
            document.getElementById('show-translations').addEventListener('change', (e) => {
                showTranslations = e.target.checked;
                if (examStarted) {
                    displayQuestion(currentQuestionIndex);
                }
            });
        }
        
        function populateCategories() {
            const categorySelect = document.getElementById('category-select');
            const categories = new Set();
            
            // Extract unique categories
            allQuestionsData.forEach(question => {
                // Split by newline and take the first line for display
                const categoryName = question.category.split('\\n')[0];
                categories.add(categoryName);
            });
            
            // Add options to select
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        }
        
        function startExam() {
            // Get settings
            selectedCategory = document.getElementById('category-select').value;
            questionCount = parseInt(document.getElementById('question-count').value);
            showTranslations = document.getElementById('show-translations').checked;
            
            // Validate inputs
            if (isNaN(questionCount) || questionCount < 1) {
                alert('Please enter a valid number of questions');
                return;
            }
            
            // Hide settings, show question
            document.getElementById('exam-settings').style.display = 'none';
            document.getElementById('question-container').classList.remove('hidden');
            document.getElementById('progress').classList.remove('hidden');
            document.querySelector('.controls').classList.remove('hidden');
            
            examStarted = true;
            resetExam();
        }
        
        function resetExam() {
            if (!examStarted) return;
            
            // Filter questions by category if needed
            const filteredQuestions = selectedCategory === 'all' 
                ? allQuestions 
                : allQuestions.filter(q => q.category.split('\\n')[0] === selectedCategory);
            
            // Shuffle and get the requested number of random questions (or all if less than requested)
            const count = Math.min(filteredQuestions.length, questionCount);
            questions = getRandomQuestions(filteredQuestions, count);
            
            // Initialize user answers array with empty values
            userAnswers = Array(questions.length).fill(null);
            
            // Reset current question index
            currentQuestionIndex = 0;
            
            // Update total questions count
            document.getElementById('total-questions').textContent = questions.length;
            
            // Display the first question
            displayQuestion(currentQuestionIndex);
            
            // Hide results if visible
            const resultsSection = document.getElementById('results');
            resultsSection.classList.add('hidden');
            
            // Show question container and controls
            const questionContainer = document.getElementById('question-container');
            const progressSection = document.getElementById('progress');
            const controls = document.querySelector('.controls');
            
            questionContainer.classList.remove('hidden');
            progressSection.classList.remove('hidden');
            controls.classList.remove('hidden');
        }
        
        function getRandomQuestions(allQuestions, count) {
            const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
            return shuffled.slice(0, count);
        }
        
        function displayQuestion(index) {
            const question = questions[index];
            const container = document.getElementById('question-container');
            
            // Update progress
            document.getElementById('current-question').textContent = index + 1;
            const progressFill = document.querySelector('.progress-fill');
            progressFill.style.width = \`\${((index + 1) / questions.length) * 100}%\`;
            
            // Create HTML for the question
            // Get translation for the question if available
            const questionTranslation = showTranslations ? translateToRussian(question.question) : '';
            
            let html = \`
                <div class="category">
                    <span>\${question.category.split('\\n')[0]}</span>
                </div>
                <div class="question">
                    <span>\${index + 1}. \${question.question}</span>
                    \${questionTranslation ? \`<span class="info-button">i<span class="tooltip">\${questionTranslation}</span></span>\` : ''}
                </div>
                <div class="answers">
            \`;
            
            // Add answer options
            question.answers.forEach((answer, answerIndex) => {
                const isChecked = userAnswers[index] === answer.option ? 'checked' : '';
                // Get translation for the answer if available
                const answerTranslation = showTranslations ? translateToRussian(answer.text) : '';
                
                html += \`
                    <div class="answer-option">
                        <input type="radio" id="answer-\${answerIndex}" name="question-\${index}" value="\${answer.option}" \${isChecked}>
                        <label for="answer-\${answerIndex}">\${answer.option}. \${answer.text}</label>
                        \${answerTranslation ? \`<span class="info-button">i<span class="tooltip">\${answerTranslation}</span></span>\` : ''}
                    </div>
                \`;
            });
            
            html += '</div>';
            container.innerHTML = html;
            
            // Add event listeners to radio buttons
            const radioButtons = container.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    userAnswers[index] = e.target.value;
                });
            });
            
            // Update button states
            updateButtonStates();
        }
        
        function updateButtonStates() {
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const finishBtn = document.getElementById('finish-btn');
            
            // Previous button
            prevBtn.disabled = currentQuestionIndex === 0;
            
            // Next button
            if (currentQuestionIndex === questions.length - 1) {
                nextBtn.classList.add('hidden');
                finishBtn.classList.remove('hidden');
            } else {
                nextBtn.classList.remove('hidden');
                finishBtn.classList.add('hidden');
            }
        }
        
        function calculateScore() {
            let correctCount = 0;
            let totalAnswered = 0;
            
            questions.forEach((question, index) => {
                const userAnswer = userAnswers[index];
                if (userAnswer) {
                    totalAnswered++;
                    const correctOption = correctAnswersMap[question.id];
                    if (userAnswer === correctOption) {
                        correctCount++;
                    }
                }
            });
            
            return {
                correct: correctCount,
                total: questions.length,
                answered: totalAnswered,
                percentage: Math.round((correctCount / questions.length) * 100)
            };
        }
        
        function showResults() {
            const questionContainer = document.getElementById('question-container');
            const resultsSection = document.getElementById('results');
            const resultsContainer = document.getElementById('results-container');
            const progressSection = document.getElementById('progress');
            const controls = document.querySelector('.controls');
            
            // Calculate the score
            const score = calculateScore();
            
            // Hide questions and show results
            questionContainer.classList.add('hidden');
            progressSection.classList.add('hidden');
            controls.classList.add('hidden');
            resultsSection.classList.remove('hidden');
            
            // Create HTML for results
            let html = \`
                <div class="score-summary">
                    <h3>Your Score: \${score.correct} / \${score.total} (\${score.percentage}%)</h3>
                    <p>You answered \${score.answered} out of \${score.total} questions.</p>
                </div>
            \`;
            
            // Group questions by category for the results
            const questionsByCategory = {};
            questions.forEach(question => {
                if (!questionsByCategory[question.category]) {
                    questionsByCategory[question.category] = [];
                }
                questionsByCategory[question.category].push(question);
            });
            
            // Display results by category
            Object.keys(questionsByCategory).forEach(category => {
                html += \`<h3>\${category.split('\\n')[0]}</h3>\`;
                
                questionsByCategory[category].forEach((question, index) => {
                    const userAnswer = userAnswers[questions.indexOf(question)];
                    const correctOption = correctAnswersMap[question.id];
                    const isCorrect = userAnswer === correctOption;
                    
                    html += \`
                        <div class="results-question \${isCorrect ? 'correct' : 'incorrect'}">
                            <div class="question">
                                <span>\${question.number}. \${question.question}</span>
                                \${userAnswer ? (isCorrect ? ' ✓' : ' ✗') : ' (Not answered)'}
                            </div>
                            <div class="answers">
                    \`;
                    
                    // Add answer options with highlighting for selected and correct answers
                    question.answers.forEach(answer => {
                        const isSelected = userAnswer === answer.option;
                        const isCorrectOption = answer.option === correctOption;
                        let answerClass = '';
                        
                        if (isSelected && isCorrectOption) {
                            answerClass = 'correct-selected';
                        } else if (isSelected && !isCorrectOption) {
                            answerClass = 'incorrect-selected';
                        } else if (!isSelected && isCorrectOption) {
                            answerClass = 'correct-answer';
                        }
                        
                        html += \`
                            <div class="answer-option \${answerClass}">
                                \${answer.option}. \${answer.text}
                                \${isSelected ? ' (Your answer)' : ''}
                                \${isCorrectOption ? ' (Correct answer)' : ''}
                            </div>
                        \`;
                    });
                    
                    html += '</div></div>';
                });
            });
            
            resultsContainer.innerHTML = html;
        }
        
        function handleKeyboardInput(e) {
            // Only process if we're viewing questions (not results)
            if (document.getElementById('results').classList.contains('hidden') && examStarted) {
                const key = e.key.toLowerCase();
                
                // Handle A, B, C keys for answer selection
                if (['a', 'b', 'c'].includes(key)) {
                    const option = key.toUpperCase();
                    const radioSelector = \`input[value="\${option}"]\`;
                    const radioButton = document.querySelector(radioSelector);
                    
                    if (radioButton) {
                        radioButton.checked = true;
                        userAnswers[currentQuestionIndex] = option;
                        
                        // Visual feedback
                        const label = radioButton.nextElementSibling;
                        label.style.fontWeight = 'bold';
                        setTimeout(() => { label.style.fontWeight = 'normal'; }, 200);
                    }
                }
                
                // Handle arrow keys for navigation
                if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    displayQuestion(currentQuestionIndex);
                } else if (e.key === 'ArrowRight' && currentQuestionIndex < questions.length - 1) {
                    currentQuestionIndex++;
                    displayQuestion(currentQuestionIndex);
                }
            }
        }
        
        function exportResultsAsPDF() {
            const { jsPDF } = window.jspdf;
            
            // Create a new PDF document
            const doc = new jsPDF();
            
            // Get the results container
            const resultsContainer = document.getElementById('results-container');
            
            // Use html2canvas to capture the results as an image
            html2canvas(resultsContainer).then(canvas => {
                // Get the image data
                const imgData = canvas.toDataURL('image/png');
                
                // Calculate the width and height to fit on the PDF
                const imgWidth = 190;
                const pageHeight = 290;
                const imgHeight = canvas.height * imgWidth / canvas.width;
                let heightLeft = imgHeight;
                
                // Add the image to the PDF
                let position = 10;
                doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
                
                // Add new pages if needed
                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }
                
                // Save the PDF
                doc.save('exam_results.pdf');
            });
        }
        
        function translateToRussian(text) {
            // Return the translation if available, otherwise return the original text
            return translations[text] || text;
        }
    </script>
</body>
</html>`;

// Write the HTML file
fs.writeFileSync(outputFile, htmlContent);

console.log(`Successfully generated exam application at: ${outputFile}`);
