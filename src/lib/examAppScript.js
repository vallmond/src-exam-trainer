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
            
            // Calculate weight based on question history
            let weight = 1; // Default weight for questions with no history
            
            if (history.total > 0) {
                // Calculate success rate (percentage of correct answers)
                const successRate = history.correct / history.total;
                
                // Calculate recency factor (how recently the question was answered incorrectly)
                // This will be higher if the question was recently answered incorrectly
                const recentlyIncorrect = history.incorrect > 0;
                const recencyFactor = recentlyIncorrect ? 1.5 : 1;
                
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
                
                // Apply recency factor to give higher weight to recently incorrect questions
                weight *= recencyFactor;
                
                // Ensure minimum weight
                weight = Math.max(weight, 0.1);
            }
            
            return { question, weight };
        });
        
        // Add some randomness to the selection process
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

module.exports = {
  generateExamScript
};
