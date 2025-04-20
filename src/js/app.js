/**
 * Answer Key Creator Application
 * 
 * This script handles the functionality for creating answer keys for maritime radio communication exams.
 * It loads question data from JSON files and provides an interface for selecting correct answers.
 */

// Global variables
let allQuestionsData = [];
let questions = [];
let currentQuestionIndex = 0;
let userAnswers = {};
let categories = [];
let selectedCategory = 'all';
let showTranslations = true;
let translations = {};

/**
 * Initialize data and application
 * 
 * Note: Instead of fetching data from files, we'll use the data embedded in the HTML
 * This is necessary because browsers can't fetch local files directly due to security restrictions
 */
function initData() {
    try {
        // allQuestionsData and translations will be defined in the HTML file
        console.log(`Using ${allQuestionsData.length} questions and ${Object.keys(translations).length} translations`);
        
        // Hide loading indicator and show intro
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('intro').classList.remove('hidden');
        
        // Initialize the application
        initializeApp();
    } catch (error) {
        console.error('Error initializing data:', error);
        document.getElementById('error-message').textContent = 'Failed to load data. Please check the console for details.';
        document.getElementById('error-message').classList.remove('hidden');
    }
}

/**
 * Translate text to Russian using the translations dictionary
 */
function translateToRussian(text) {
    if (!text || !showTranslations) return '';
    
    // Check if we have a direct translation
    if (translations[text]) {
        return translations[text];
    }
    
    // If no direct translation, return a placeholder
    return "Translation not available";
}

/**
 * Initialize the application
 */
function initializeApp() {
    console.log("Initializing application...");
    
    // Sort questions by ID to ensure they're in the original order
    questions = [...allQuestionsData].sort((a, b) => a.id - b.id);
    
    // Extract unique categories
    categories = [...new Set(questions.map(q => q.category))];
    console.log(`Found ${categories.length} unique categories`);
    
    // Populate category dropdown
    const categorySelect = document.getElementById('category-select');
    categorySelect.innerHTML = '<option value="all">All Categories</option>';
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.split('\n')[0]; // Use first line of category as display text
        categorySelect.appendChild(option);
    });
    
    // Set up event listeners
    document.getElementById('start-btn').addEventListener('click', startCreatingAnswerKey);
    document.getElementById('prev-btn').addEventListener('click', goToPreviousQuestion);
    document.getElementById('next-btn').addEventListener('click', goToNextQuestion);
    document.getElementById('finish-btn').addEventListener('click', showSummary);
    document.getElementById('download-btn').addEventListener('click', downloadAnswerKey);
    document.getElementById('export-anytime-btn').addEventListener('click', downloadAnswerKey);
    document.getElementById('restart-btn').addEventListener('click', restartApp);
    
    // Translation toggle
    document.getElementById('translation-checkbox').addEventListener('change', (e) => {
        showTranslations = e.target.checked;
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            displayQuestion(currentQuestionIndex);
        }
    });
    
    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyboardInput);
    
    console.log("Application initialized successfully");
}

/**
 * Start creating the answer key
 */
function startCreatingAnswerKey() {
    console.log("Starting to create answer key...");
    
    selectedCategory = document.getElementById('category-select').value;
    console.log(`Selected category: ${selectedCategory}`);
    
    // Filter questions by category if needed
    if (selectedCategory !== 'all') {
        console.log(`Filtering questions by category: ${selectedCategory}`);
        questions = [...allQuestionsData].sort((a, b) => a.id - b.id)
            .filter(q => q.category === selectedCategory);
    } else {
        questions = [...allQuestionsData].sort((a, b) => a.id - b.id);
    }
    
    console.log(`Working with ${questions.length} questions after filtering`);
    
    // Initialize user answers object
    userAnswers = {};
    
    // Update total questions count
    document.getElementById('total-questions').textContent = questions.length;
    
    // Hide intro and show main content
    document.getElementById('intro').classList.add('hidden');
    document.getElementById('main-content').classList.remove('hidden');
    
    // Display the first question
    currentQuestionIndex = 0;
    console.log(`Displaying first question (index: ${currentQuestionIndex})`);
    displayQuestion(currentQuestionIndex);
}

/**
 * Display a question
 */
function displayQuestion(index) {
    console.log(`Displaying question at index: ${index}`);
    
    if (!questions || questions.length === 0) {
        console.error("No questions available to display");
        return;
    }
    
    const question = questions[index];
    if (!question) {
        console.error(`No question found at index ${index}`);
        return;
    }
    
    console.log(`Question ID: ${question.id}, Number: ${question.number}, Category: ${question.category}`);
    
    const container = document.getElementById('question-container');
    if (!container) {
        console.error("Question container element not found");
        return;
    }
    
    // Update progress
    document.getElementById('current-question').textContent = index + 1;
    updateCompletionStatus();
    
    // Create HTML for the question
    let html = `
        <div class="category">
            <span>${question.category.split('\n')[0]}</span>
        </div>
        <div class="question">
            <span>${question.number}. ${question.question}</span>
            ${showTranslations ? `<span class="info-icon">i<span class="tooltip">${translateToRussian(question.question)}</span></span>` : ''}
        </div>
        <div class="answers">
    `;
    
    // Add answer options
    question.answers.forEach((answer, answerIndex) => {
        const isChecked = userAnswers[question.id] === answer.option ? 'checked' : '';
        html += `
            <div class="answer-option">
                <input type="radio" id="answer-${answerIndex}" name="question-${question.id}" value="${answer.option}" ${isChecked}>
                <label for="answer-${answerIndex}">${answer.option}. ${answer.text}</label>
                ${showTranslations ? `<span class="info-icon">i<span class="tooltip">${translateToRussian(answer.text)}</span></span>` : ''}
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
    console.log("Question HTML generated and inserted into container");
    
    // Add event listeners to radio buttons
    const radioButtons = container.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            userAnswers[question.id] = e.target.value;
            console.log(`Answer selected for question ${question.id}: ${e.target.value}`);
            updateCompletionStatus();
        });
    });
    
    // Update button states
    updateButtonStates();
}

/**
 * Update the completion status
 */
function updateCompletionStatus() {
    try {
        const totalQuestions = questions.length;
        const answeredQuestions = Object.keys(userAnswers).length;
        const percent = Math.round((answeredQuestions / totalQuestions) * 100);
        
        document.getElementById('completion-percent').textContent = `${percent}% (${answeredQuestions}/${totalQuestions})`;
        document.getElementById('status-progress').style.width = `${percent}%`;
        
        console.log(`Completion status updated: ${percent}% (${answeredQuestions}/${totalQuestions})`);
    } catch (error) {
        console.error(`Error updating completion status: ${error.message}`);
    }
}

/**
 * Update the states of the navigation buttons
 */
function updateButtonStates() {
    try {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const finishBtn = document.getElementById('finish-btn');
        
        // Previous button is disabled if we're on the first question
        prevBtn.disabled = currentQuestionIndex === 0;
        
        // Next button is hidden if we're on the last question
        if (currentQuestionIndex === questions.length - 1) {
            nextBtn.classList.add('hidden');
            finishBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            finishBtn.classList.add('hidden');
        }
        
        console.log(`Button states updated: prevBtn.disabled=${prevBtn.disabled}, nextBtn.hidden=${nextBtn.classList.contains('hidden')}, finishBtn.hidden=${finishBtn.classList.contains('hidden')}`);
    } catch (error) {
        console.error(`Error updating button states: ${error.message}`);
    }
}

/**
 * Go to the previous question
 */
function goToPreviousQuestion() {
    console.log("Going to previous question");
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

/**
 * Go to the next question
 */
function goToNextQuestion() {
    console.log("Going to next question");
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
}

/**
 * Show the summary
 */
function showSummary() {
    console.log("Showing summary");
    try {
        // Hide main content and show summary
        document.getElementById('main-content').classList.add('hidden');
        document.getElementById('summary').classList.remove('hidden');
        
        // Update summary information
        const totalAnswered = Object.keys(userAnswers).length;
        document.getElementById('total-answered').textContent = totalAnswered;
        
        // Create category summaries
        const categorySummaries = document.getElementById('category-summaries');
        categorySummaries.innerHTML = '';
        
        // Group questions by category
        const categoryCounts = {};
        categories.forEach(category => {
            categoryCounts[category] = {
                total: questions.filter(q => q.category === category).length,
                answered: 0
            };
        });
        
        // Count answered questions by category
        Object.keys(userAnswers).forEach(id => {
            const question = allQuestionsData.find(q => q.id === parseInt(id));
            if (question && categoryCounts[question.category]) {
                categoryCounts[question.category].answered++;
            }
        });
        
        // Create summary for each category
        Object.entries(categoryCounts).forEach(([categoryName, count]) => {
            const percent = Math.round((count.answered / count.total) * 100) || 0;
            
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category-summary';
            categoryDiv.innerHTML = `
                <strong>${categoryName.split('\n')[0]}:</strong> ${count.answered}/${count.total} (${percent}%)
            `;
            
            categorySummaries.appendChild(categoryDiv);
        });
        
        console.log("Summary displayed successfully");
    } catch (error) {
        console.error(`Error showing summary: ${error.message}`);
    }
}

/**
 * Download the answer key
 */
function downloadAnswerKey() {
    console.log("Downloading answer key");
    try {
        // Create the answer key data
        const answerKey = [];
        
        // Get all questions from the original data
        const allQuestions = [...allQuestionsData].sort((a, b) => a.id - b.id);
        
        allQuestions.forEach(question => {
            // Only include questions that have an answer
            if (userAnswers[question.id]) {
                answerKey.push({
                    id: question.id,
                    number: question.number,
                    category: question.category,
                    correct_option: userAnswers[question.id]
                });
            }
        });
        
        console.log(`Answer key created with ${answerKey.length} questions`);
        
        // Create a JSON blob
        const jsonData = JSON.stringify(answerKey, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        
        // Create a download link
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'correct_answers.json';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
        
        console.log("Answer key downloaded successfully");
    } catch (error) {
        console.error(`Error downloading answer key: ${error.message}`);
    }
}

/**
 * Restart the application
 */
function restartApp() {
    console.log("Restarting application");
    try {
        // Reset variables
        currentQuestionIndex = 0;
        userAnswers = {};
        
        // Show intro and hide other sections
        document.getElementById('intro').classList.remove('hidden');
        document.getElementById('main-content').classList.add('hidden');
        document.getElementById('summary').classList.add('hidden');
        
        console.log("Application restarted successfully");
    } catch (error) {
        console.error(`Error restarting application: ${error.message}`);
    }
}

/**
 * Handle keyboard input
 */
function handleKeyboardInput(e) {
    // Only process if we're viewing questions
    if (!document.getElementById('main-content').classList.contains('hidden')) {
        const key = e.key.toLowerCase();
        
        // Handle A, B, C keys for answer selection
        if (['a', 'b', 'c'].includes(key)) {
            const option = key.toUpperCase();
            const radioSelector = `input[value="${option}"]`;
            const radioButton = document.querySelector(radioSelector);
            
            if (radioButton) {
                radioButton.checked = true;
                const questionId = questions[currentQuestionIndex].id;
                userAnswers[questionId] = option;
                updateCompletionStatus();
                
                // Visual feedback
                const label = radioButton.nextElementSibling;
                label.style.fontWeight = 'bold';
                setTimeout(() => { label.style.fontWeight = 'normal'; }, 200);
            }
        }
        
        // Handle arrow keys for navigation
        if (e.key === 'ArrowLeft' && currentQuestionIndex > 0) {
            goToPreviousQuestion();
        } else if (e.key === 'ArrowRight' && currentQuestionIndex < questions.length - 1) {
            goToNextQuestion();
        }
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initData);
