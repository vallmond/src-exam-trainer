/**
 * JavaScript business logic for the exam application
 */

/**
 * Generates the JavaScript code for the exam application
 * @param {Object} data - Data for the application
 * @param {Array} data.questionsData - Questions data
 * @param {Object} data.correctAnswersMap - Map of correct answers
 * @param {Object} data.translationsData - Translations data
 * @param {string} appVersion - Application version
 * @returns {string} JavaScript code as a string
 */
function generateExamScript(data, appVersion) {
  const { generateRadioAlphabetCode } = require('./radioAlphabet');
  const { generateMessageExamplesCode } = require('./messageExamples');
  return `
    // Embedded data
    const allQuestionsData = ${JSON.stringify(data.questionsData)};
    const correctAnswersMap = ${JSON.stringify(data.correctAnswersMap)};
    const translations = ${JSON.stringify(data.translationsData)};
    
    ${generateRadioAlphabetCode()}
    
    ${generateMessageExamplesCode()}
    
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
        
        // Initialize radio alphabet
        initializeRadioAlphabet();
        
        // Initialize message examples
        initializeMessageExamples();
        
        // Load question history from localStorage
        loadQuestionHistory();
        
        // Add event listeners
        document.getElementById('start-btn').addEventListener('click', startExam);
        document.getElementById('prev-btn').addEventListener('click', navigateToPrevious);
        document.getElementById('next-btn').addEventListener('click', navigateToNext);
        document.getElementById('finish-btn').addEventListener('click', showResults);
        document.getElementById('restart-btn').addEventListener('click', restartExam);
        document.getElementById('export-btn').addEventListener('click', exportResultsAsPDF);
        document.getElementById('stats-btn').addEventListener('click', showStatistics);
        document.getElementById('back-to-main-btn').addEventListener('click', backToMain);
        document.getElementById('show-alphabet-btn').addEventListener('click', showRadioAlphabet);
        document.getElementById('back-from-alphabet-btn').addEventListener('click', hideRadioAlphabet);
        document.getElementById('show-messages-btn').addEventListener('click', showMessageExamples);
        document.getElementById('back-from-messages-btn').addEventListener('click', hideMessageExamples);
        
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
        document.getElementById('statistics').classList.add('hidden');
        examStarted = false;
    }
    
    // Helper function to add back button to a page
    function addBackButton(containerId, buttonId) {
        const container = document.getElementById(containerId);
        if (!document.getElementById(buttonId)) {
            const backBtn = document.createElement('button');
            backBtn.id = buttonId;
            backBtn.className = 'back-btn';
            backBtn.textContent = '← Back to Main Menu';
            backBtn.addEventListener('click', showMainMenu);
            container.insertBefore(backBtn, container.firstChild);
        }
    }
    
    function backToMain() {
        // Go back to the main screen
        document.getElementById('exam-settings').style.display = 'block';
        document.getElementById('statistics').classList.add('hidden');
    }
    
    function showRadioAlphabet() {
        // Hide main screen and show radio alphabet
        document.getElementById('exam-settings').style.display = 'none';
        document.getElementById('radio-alphabet').classList.remove('hidden');
        
        // Add back button to radio alphabet page
        addBackButton('radio-alphabet', 'back-btn-alphabet');
    }
    
    function hideRadioAlphabet() {
        // Hide radio alphabet and show exam settings
        document.getElementById('radio-alphabet').classList.add('hidden');
        document.getElementById('exam-settings').style.display = 'block';
    }
    
    function showMessageExamples() {
        // Hide main screen and show message examples
        document.getElementById('exam-settings').style.display = 'none';
        document.getElementById('message-examples').classList.remove('hidden');
        
        // Add back button to message examples page
        addBackButton('message-examples', 'back-btn-messages');
    }
    
    function hideMessageExamples() {
        // Hide message examples and show exam settings
        document.getElementById('message-examples').classList.add('hidden');
        document.getElementById('exam-settings').style.display = 'block';
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
        
        // Get exactly the requested number of questions (or all if less than requested)
        const count = Math.min(filteredQuestions.length, questionCount);
        questions = getRandomQuestions(filteredQuestions, questionCount);
        
        // Verify we have the correct number of questions
        console.log('Requested ' + questionCount + ' questions, got ' + questions.length);
        
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
        let lastExamData = { questions: [], incorrectAnswers: [] };
        
        try {
            const savedHistory = localStorage.getItem('examQuestionHistory');
            if (savedHistory) {
                questionHistory = JSON.parse(savedHistory);
            }
            
            // Get data from the last exam session
            const savedLastExam = localStorage.getItem('lastExamData');
            if (savedLastExam) {
                lastExamData = JSON.parse(savedLastExam);
            }
        } catch (e) {
            console.log('Could not load question history:', e);
        }
        
        // Create a set of question IDs that were answered incorrectly in the last session
        const recentlyIncorrectIds = new Set(lastExamData.incorrectAnswers);
        
        // Divide questions into three groups:
        // 1. Questions that were answered incorrectly in the last session (exclude these)
        // 2. Questions that have never been answered
        // 3. Questions that have been answered before but not incorrectly in the last session
        const excludedQuestions = [];
        const newQuestions = [];
        const previouslyAnsweredQuestions = [];
        
        allQuestions.forEach(question => {
            const history = questionHistory[question.id] || { correct: 0, incorrect: 0, total: 0 };
            
            if (recentlyIncorrectIds.has(question.id)) {
                // Questions answered incorrectly in the last session
                excludedQuestions.push(question);
            } else if (history.total === 0) {
                // Questions never answered before
                newQuestions.push(question);
            } else {
                // Questions answered before but not incorrectly in the last session
                previouslyAnsweredQuestions.push(question);
            }
        });
        
        // Calculate weights for previously answered questions
        const weightedQuestions = previouslyAnsweredQuestions.map(question => {
            const history = questionHistory[question.id];
            
            // Calculate weight based on question history
            let weight = 1; // Default weight
            
            // Calculate success rate (percentage of correct answers)
            const successRate = history.correct / history.total;
            
            // Calculate mastery level
            // A question is considered mastered if it has been answered correctly at least 3 times
            // and has a success rate of at least 80%
            const isMastered = history.correct >= 3 && successRate >= 0.8;
            
            if (isMastered) {
                // Mastered questions get lower weight
                weight = 0.3;
            } else if (history.incorrect > history.correct) {
                // Questions with more incorrect than correct answers get higher weight
                // The more incorrect answers, the higher the weight
                weight = 2.0 + (history.incorrect / history.total);
            } else if (history.correct > history.incorrect && !isMastered) {
                // Questions that are being learned but not yet mastered
                // get a moderate weight that decreases as success rate increases
                weight = 1.0 - (successRate * 0.5);
            }
            
            // Ensure minimum weight
            weight = Math.max(weight, 0.1);
            
            return { question, weight };
        });
        
        // Add some randomness to the weighted questions
        weightedQuestions.sort(() => Math.random() - 0.5);
        
        // Sort by weight (higher weights = higher probability)
        weightedQuestions.sort((a, b) => b.weight - a.weight);
        
        // Simple approach: If we have enough available questions (excluding incorrect ones from last session),
        // use them. Otherwise, include some from the excluded list to meet the count.
        let selectedQuestions = [];
        
        // First, try to get questions from non-excluded pool
        const availablePool = [...newQuestions, ...previouslyAnsweredQuestions];
        
        // If we don't have enough questions, include some from excluded list
        if (availablePool.length < count && excludedQuestions.length > 0) {
            // Shuffle excluded questions
            excludedQuestions.sort(() => Math.random() - 0.5);
            // Add enough to reach the requested count
            const neededFromExcluded = Math.min(count - availablePool.length, excludedQuestions.length);
            selectedQuestions = [...availablePool, ...excludedQuestions.slice(0, neededFromExcluded)];
        } else {
            selectedQuestions = [...availablePool];
        }
        
        // Shuffle all selected questions
        selectedQuestions.sort(() => Math.random() - 0.5);
        
        // Take exactly the requested count (or all if less)
        selectedQuestions = selectedQuestions.slice(0, count);
        
        // Store the current exam questions for the next session
        window.setTimeout(() => {
            localStorage.setItem('lastExamData', JSON.stringify({
                questions: selectedQuestions.map(q => q.id),
                incorrectAnswers: []
            }));
        }, 0);
        
        console.log('Requested ' + count + ' questions, selected ' + selectedQuestions.length + ' questions');
        
        return selectedQuestions;
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
        
        // Track incorrectly answered questions for the next session
        const incorrectAnswers = [];
        questions.forEach((question, index) => {
            const userAnswer = userAnswers[index];
            if (userAnswer) {
                const correctOption = correctAnswersMap[question.id];
                if (userAnswer !== correctOption) {
                    incorrectAnswers.push(question.id);
                }
            }
        });
        
        // Update the last exam data with incorrect answers
        try {
            const lastExamData = JSON.parse(localStorage.getItem('lastExamData')) || { questions: [] };
            lastExamData.incorrectAnswers = incorrectAnswers;
            localStorage.setItem('lastExamData', JSON.stringify(lastExamData));
        } catch (e) {
            console.log('Could not update last exam data:', e);
        }
        
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
        
        // Add back button to results page
        addBackButton('results', 'back-btn-results');
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
    
    function showStatistics() {
        // Hide main screen and show statistics
        document.getElementById('exam-settings').style.display = 'none';
        document.getElementById('results').classList.add('hidden');
        document.getElementById('statistics').classList.remove('hidden');
        
        // Add back button to statistics page
        addBackButton('statistics', 'back-btn-statistics');
        
        // Generate statistics content
        generateStatistics();
    }
    
    // Global object to store question data for rows
    let questionRowData = {};
    
    function generateStatistics() {
        // Reset question row data
        questionRowData = {};
        const statisticsContainer = document.getElementById('statistics-container');
        
        // Group questions by category
        const questionsByCategory = {};
        allQuestionsData.forEach(question => {
            const categoryName = question.category.split('\\n')[0];
            if (!questionsByCategory[categoryName]) {
                questionsByCategory[categoryName] = [];
            }
            questionsByCategory[categoryName].push(question);
        });
        
        // Load question history
        let history = {};
        try {
            const savedHistory = localStorage.getItem('examQuestionHistory');
            if (savedHistory) {
                history = JSON.parse(savedHistory);
            }
        } catch (e) {
            console.log('Could not load question history:', e);
        }
        
        // Generate HTML for statistics
        let html = '';
        
        // Add overall statistics
        const totalQuestions = allQuestionsData.length;
        const answeredQuestions = Object.keys(history).length;
        const masteredQuestions = Object.values(history).filter(h => 
            h.correct >= 3 && (h.correct / h.total) >= 0.8
        ).length;
        
        html += '<div class="overall-stats">'
            + '<h3>Overall Progress</h3>'
            + '<p>Total Questions: ' + totalQuestions + '</p>'
            + '<p>Questions Attempted: ' + answeredQuestions + ' (' + Math.round((answeredQuestions / totalQuestions) * 100) + '%)</p>'
            + '<p>Questions Mastered: ' + masteredQuestions + ' (' + Math.round((masteredQuestions / totalQuestions) * 100) + '%)</p>'
            + '</div>'
            + '<div class="filter-controls">'
            + '<button id="show-all-btn" class="filter-btn active">Show All Questions</button>'
            + '<button id="show-unattempted-btn" class="filter-btn">Show Unattempted Questions</button>'
            + '<button id="show-errors-btn" class="filter-btn">Show Questions with Errors</button>'
            + '</div>'
            + '<div class="expand-controls">'
            + '<button id="expand-all-btn" class="expand-btn">Expand All Answers</button>'
            + '<button id="collapse-all-btn" class="expand-btn hidden">Collapse All Answers</button>'
            + '</div>';
        
        // Generate statistics for each category
        Object.keys(questionsByCategory).sort().forEach(category => {
            const questions = questionsByCategory[category];
            
            html += '<div class="statistics-category"><h3>' + category + '</h3>';
            html += '<table class="statistics-table">'
                + '<thead>'
                + '<tr>'
                + '<th width="60%">Question</th>'
                + '<th width="10%">Attempts</th>'
                + '<th width="10%">Correct</th>'
                + '<th width="20%">Success Rate</th>'
                + '</tr>'
                + '</thead>'
                + '<tbody>';
            
            questions.forEach(question => {
                const questionHistory = history[question.id] || { correct: 0, incorrect: 0, total: 0 };
                const attempts = questionHistory.total;
                const correct = questionHistory.correct;
                const successRate = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
                
                // Determine success rate class
                let successRateClass = '';
                if (attempts > 0) {
                    if (successRate >= 80) {
                        successRateClass = 'success-rate-high';
                    } else if (successRate >= 50) {
                        successRateClass = 'success-rate-medium';
                    } else {
                        successRateClass = 'success-rate-low';
                    }
                }
                
                // Create unique IDs for the question row and answer section
                const rowId = 'question-row-' + question.id;
                const answersId = 'answers-' + question.id;
                
                // Get the correct answer option
                const correctOption = correctAnswersMap[question.id];
                
                // Create the main row with the question
                html += '<tr id="' + rowId + '" class="question-row" data-answers-id="' + answersId + '">'
                    + '<td><div class="expandable-question">' + question.number + '. ' + question.question 
                    + '<span class="expand-icon">+</span></div></td>'
                    + '<td>' + attempts + '</td>'
                    + '<td>' + correct + '</td>'
                    + '<td class="' + successRateClass + '">' + successRate + '%</td>'
                    + '</tr>';
                
                // Create the hidden answers row
                html += '<tr id="' + answersId + '" class="answers-row hidden">'
                    + '<td colspan="4">'
                    + '<div class="answer-container">';
                
                // Add each answer option with correct answer highlighted
                question.answers.forEach(answer => {
                    const isCorrect = answer.option === correctOption;
                    const answerClass = isCorrect ? 'correct-answer' : '';
                    const correctMark = isCorrect ? ' ✓' : '';
                    
                    html += '<div class="answer-item ' + answerClass + '">'
                        + '<span class="answer-option-label">' + answer.option + '.</span> '
                        + answer.text
                        + correctMark
                        + '</div>';
                });
                
                html += '</div></td></tr>';
                
                // Store the question data in a separate object to avoid JSON encoding issues
                window.setTimeout(() => {
                    questionRowData[rowId] = {
                        id: question.id,
                        question: question.question,
                        answers: question.answers,
                        correctOption: correctAnswersMap[question.id]
                    };
                }, 0);
            });
            
            html += '</tbody></table></div>';
        });
        
        statisticsContainer.innerHTML = html;
        
        // Add filter functionality
        document.getElementById('show-all-btn').addEventListener('click', function() {
            setActiveFilterButton(this);
            applyQuestionFilter('all');
        });
        
        document.getElementById('show-unattempted-btn').addEventListener('click', function() {
            setActiveFilterButton(this);
            applyQuestionFilter('unattempted');
        });
        
        document.getElementById('show-errors-btn').addEventListener('click', function() {
            setActiveFilterButton(this);
            applyQuestionFilter('errors');
        });
        
        function setActiveFilterButton(activeButton) {
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            activeButton.classList.add('active');
        }
        
        // Add modal for showing correct answers
        if (!document.getElementById('answer-modal')) {
            const modalHtml = '<div id="answer-modal" class="modal hidden">'
                + '<div class="modal-content">'
                + '<span class="close-modal">&times;</span>'
                + '<h3 id="modal-question"></h3>'
                + '<div id="modal-answers"></div>'
                + '</div>'
                + '</div>';
            
            document.body.insertAdjacentHTML('beforeend', modalHtml);
            
            // Add event listener to close the modal
            document.querySelector('.close-modal').addEventListener('click', () => {
                document.getElementById('answer-modal').classList.add('hidden');
            });
            
            // Close modal when clicking outside of it
            window.addEventListener('click', (event) => {
                const modal = document.getElementById('answer-modal');
                if (event.target === modal) {
                    modal.classList.add('hidden');
                }
            });
        }
        
        // Add click event listeners to expandable questions
        const questionRows = document.querySelectorAll('.question-row');
        questionRows.forEach(row => {
            row.addEventListener('click', (e) => {
                const answersId = row.getAttribute('data-answers-id');
                const answersRow = document.getElementById(answersId);
                const expandIcon = row.querySelector('.expand-icon');
                
                // Toggle the answers visibility
                if (answersRow.classList.contains('hidden')) {
                    answersRow.classList.remove('hidden');
                    expandIcon.textContent = '-';
                } else {
                    answersRow.classList.add('hidden');
                    expandIcon.textContent = '+';
                }
            });
        });
        
        // Add event listener for expand all button
        document.getElementById('expand-all-btn').addEventListener('click', () => {
            const answersRows = document.querySelectorAll('.answers-row');
            const expandIcons = document.querySelectorAll('.expand-icon');
            
            answersRows.forEach(row => row.classList.remove('hidden'));
            expandIcons.forEach(icon => icon.textContent = '-');
            
            document.getElementById('expand-all-btn').classList.add('hidden');
            document.getElementById('collapse-all-btn').classList.remove('hidden');
        });
        
        // Add event listener for collapse all button
        document.getElementById('collapse-all-btn').addEventListener('click', () => {
            const answersRows = document.querySelectorAll('.answers-row');
            const expandIcons = document.querySelectorAll('.expand-icon');
            
            answersRows.forEach(row => row.classList.add('hidden'));
            expandIcons.forEach(icon => icon.textContent = '+');
            
            document.getElementById('collapse-all-btn').classList.add('hidden');
            document.getElementById('expand-all-btn').classList.remove('hidden');
        });
    }
    
    // Function to apply question filters
    function applyQuestionFilter(filterType) {
        const questionRows = document.querySelectorAll('.question-row');
        
        // Load question history once for all questions
        let history = {};
        try {
            const savedHistory = localStorage.getItem('examQuestionHistory');
            if (savedHistory) {
                history = JSON.parse(savedHistory);
            }
        } catch (e) {
            console.log('Could not load question history:', e);
        }
        
        // Track which categories have visible questions
        const categoriesWithVisibleQuestions = new Set();
        
        // First pass: determine which questions should be visible
        questionRows.forEach(row => {
            const rowId = row.id;
            const questionData = questionRowData[rowId];
            const questionId = questionData?.id;
            
            const questionHistory = history[questionId] || { correct: 0, incorrect: 0, total: 0 };
            const attempts = questionHistory.total;
            const correct = questionHistory.correct;
            const hasErrors = attempts > 0 && correct < attempts;
            
            let shouldShow = false;
            
            // Apply filter
            if (filterType === 'all') {
                shouldShow = true;
            } else if (filterType === 'unattempted' && attempts === 0) {
                shouldShow = true;
            } else if (filterType === 'errors' && hasErrors) {
                shouldShow = true;
            }
            
            // Show or hide the question row
            if (shouldShow) {
                row.style.display = '';
                // Track which category this question belongs to
                const categorySection = row.closest('.statistics-category');
                if (categorySection) {
                    categoriesWithVisibleQuestions.add(categorySection);
                }
            } else {
                row.style.display = 'none';
            }
            
            // Hide the answers row if it was visible
            const answersId = row.getAttribute('data-answers-id');
            const answersRow = document.getElementById(answersId);
            if (answersRow) {
                answersRow.classList.add('hidden');
                const expandIcon = row.querySelector('.expand-icon');
                if (expandIcon) {
                    expandIcon.textContent = '+';
                }
            }
        });
        
        // Second pass: show or hide categories based on whether they have visible questions
        const categories = document.querySelectorAll('.statistics-category');
        categories.forEach(category => {
            if (filterType === 'all' || categoriesWithVisibleQuestions.has(category)) {
                category.style.display = '';
            } else {
                category.style.display = 'none';
            }
        });
        
        // Reset expand/collapse buttons
        document.getElementById('collapse-all-btn').classList.add('hidden');
        document.getElementById('expand-all-btn').classList.remove('hidden');
    }
    

  `;
}

module.exports = {
  generateExamScript
};
