/**
 * HTML generation utilities for the exam application
 */

/**
 * Generates the CSS styles for the exam application
 * @returns {string} CSS styles as a string
 */
function generateStyles() {
  return `
    /* Reset and base styles */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    .version {
        font-size: 14px;
        color: #7f8c8d;
        font-weight: normal;
        vertical-align: middle;
    }
    
    .app-info {
        font-size: 12px;
        color: #95a5a6;
        margin-bottom: 15px;
        text-align: right;
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
    
    .settings-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }
    
    /* Question styles */
    .category {
        font-size: 14px;
        color: #7f8c8d;
        margin-bottom: 10px;
    }
    
    .question {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 20px;
        position: relative;
    }
    
    .answers {
        margin-bottom: 20px;
    }
    
    .answer-option {
        margin-bottom: 10px;
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
    
    /* Controls styles */
    .controls {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    
    /* Progress bar styles */
    .progress-bar {
        height: 10px;
        background-color: #ecf0f1;
        border-radius: 5px;
        margin: 10px 0 20px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background-color: #3498db;
        width: 0;
        transition: width 0.3s ease;
    }
    
    #progress {
        margin-bottom: 20px;
    }
    
    /* Utility classes */
    .hidden {
        display: none;
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
    }
    
    .incorrect {
        border-left-color: #e74c3c;
    }
    
    .correct-selected {
        background-color: #d5f5e3;
    }
    
    .incorrect-selected {
        background-color: #fadbd8;
    }
    
    .correct-answer {
        background-color: #eafaf1;
    }
    
    /* Info button and tooltip styles */
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
        
        h1 {
            font-size: 28px;
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
  `;
}

/**
 * Generates the JavaScript code for the exam application
 * @param {Object} data - Data for the application
 * @param {Array} data.questionsData - Questions data
 * @param {Object} data.correctAnswersMap - Map of correct answers
 * @param {Object} data.translationsData - Translations data
 * @param {string} appVersion - Application version
 * @returns {string} JavaScript code as a string
 */
function generateJavaScript(data, appVersion) {
  return `
    // Embedded data
    const allQuestionsData = ${JSON.stringify(data.questionsData)};
    const correctAnswersMap = ${JSON.stringify(data.correctAnswersMap)};
    const translations = ${JSON.stringify(data.translationsData)};
    
    // Global variables
    let allQuestions = allQuestionsData;
    let questions = [];
    let userAnswers = [];
    let currentQuestionIndex = 0;
    let selectedCategory = 'all';
    let questionCount = 20;
    let examStarted = false;
    let showTranslations = true;
    let questionHistory = {};
    const appVersion = '${appVersion}'; // App version from generator
    
    // Initialize the application when the DOM is loaded
    document.addEventListener('DOMContentLoaded', initializeApp);
    
    function initializeApp() {
        // Populate categories
        populateCategories();
        
        // Load question history from localStorage
        loadQuestionHistory();
        
        // Add event listeners
        document.getElementById('start-btn').addEventListener('click', startExam);
        document.getElementById('prev-btn').addEventListener('click', navigateToPrevious);
        document.getElementById('next-btn').addEventListener('click', navigateToNext);
        document.getElementById('finish-btn').addEventListener('click', showResults);
        document.getElementById('restart-btn').addEventListener('click', restartExam);
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
    
    function navigateToPrevious() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion(currentQuestionIndex);
        }
    }
    
    function navigateToNext() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        }
    }
    
    function restartExam() {
        // Show settings screen again
        document.getElementById('exam-settings').style.display = 'block';
        document.getElementById('question-container').classList.add('hidden');
        document.getElementById('progress').classList.add('hidden');
        document.querySelector('.controls').classList.add('hidden');
        document.getElementById('results').classList.add('hidden');
        examStarted = false;
    }
    
    function loadQuestionHistory() {
        try {
            const savedHistory = localStorage.getItem('examQuestionHistory');
            if (savedHistory) {
                questionHistory = JSON.parse(savedHistory);
            }
        } catch (e) {
            console.log('Could not load question history:', e);
            questionHistory = {};
        }
    }
    
    function updateQuestionHistory() {
        // Update history based on current exam results
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            const correctOption = correctAnswersMap[question.id];
            const isCorrect = userAnswer === correctOption;
            
            // Initialize history for this question if it doesn't exist
            if (!questionHistory[question.id]) {
                questionHistory[question.id] = { correct: 0, incorrect: 0, total: 0 };
            }
            
            // Update counters
            if (userAnswer) { // Only count answered questions
                questionHistory[question.id].total++;
                if (isCorrect) {
                    questionHistory[question.id].correct++;
                } else {
                    questionHistory[question.id].incorrect++;
                }
            }
        });
        
        // Save to localStorage
        try {
            localStorage.setItem('examQuestionHistory', JSON.stringify(questionHistory));
        } catch (e) {
            console.log('Could not save question history:', e);
        }
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
    
    // Get random questions from the array with weighted probability based on previous answers
    function getRandomQuestions(allQuestions, count) {
        // Check if we have previous results in localStorage
        let questionHistory = {};
        try {
            const savedHistory = localStorage.getItem('examQuestionHistory');
            if (savedHistory) {
                questionHistory = JSON.parse(savedHistory);
            }
        } catch (e) {
            console.log('Could not load question history:', e);
        }
        
        // Assign weights to questions based on history
        const weightedQuestions = allQuestions.map(question => {
            const history = questionHistory[question.id] || { correct: 0, incorrect: 0, total: 0 };
            
            // Calculate weight - higher for incorrect answers, lower for correct ones
            let weight = 1; // Default weight
            
            if (history.total > 0) {
                // If question was answered incorrectly more often, increase its weight
                if (history.incorrect > history.correct) {
                    weight = 1.5 + (history.incorrect / history.total);
                } 
                // If question was answered correctly more often, decrease its weight
                else if (history.correct > history.incorrect) {
                    weight = 0.5 - (history.correct / (2 * history.total));
                    // Ensure minimum weight
                    weight = Math.max(weight, 0.1);
                }
            }
            
            return { question, weight };
        });
        
        // Sort questions randomly but with weight influence
        weightedQuestions.sort(() => Math.random() - 0.5);
        
        // Sort by weight (higher weights = higher probability)
        weightedQuestions.sort((a, b) => b.weight - a.weight);
        
        // Take the top 'count' questions
        return weightedQuestions.slice(0, count).map(item => item.question);
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
        
        // Next button and Finish button
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.style.display = 'none';
            finishBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            finishBtn.style.display = 'none';
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
        
        // Update question history in localStorage
        updateQuestionHistory();
        
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
  `;
}

/**
 * Generates the HTML structure for the exam application
 * @param {string} appVersion - Application version
 * @returns {string} HTML structure as a string
 */
function generateHtmlStructure(appVersion) {
  const currentDate = new Date().toLocaleString();
  
  return `
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exam Application</title>
    <style>
        ${generateStyles()}
    </style>
</head>
<body>
    <div class="container">
        <h1>Maritime Radio Communication Exam <span class="version">v${appVersion}</span></h1>
        <div class="app-info">Generated on: ${currentDate}</div>
        
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
                <input type="number" id="question-count" min="1" value="20">
            </div>
            
            <div class="settings-group">
                <label for="show-translations">
                    <input type="checkbox" id="show-translations" checked>
                    Show Translations
                </label>
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
            <button id="finish-btn" style="display: none;">Finish</button>
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
  `;
}

/**
 * Generates the complete HTML content for the exam application
 * @param {Object} data - Data for the application
 * @param {string} appVersion - Application version
 * @returns {string} Complete HTML content
 */
function generateHtmlContent(data, appVersion) {
  return `${generateHtmlStructure(appVersion)}
    <script>
      ${generateJavaScript(data, appVersion)}
    </script>
</body>
</html>`;
}

module.exports = {
  generateStyles,
  generateJavaScript,
  generateHtmlStructure,
  generateHtmlContent
};
