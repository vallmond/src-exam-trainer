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
    .controls, .button-group {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }
    
    .statistics-category {
        margin-bottom: 30px;
    }
    
    .statistics-table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
    }
    
    .statistics-table th, .statistics-table td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    
    .statistics-table th {
        background-color: #f2f2f2;
    }
    
    .statistics-table tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    
    .statistics-table tr:hover {
        background-color: #f1f1f1;
    }
    
    .success-rate-high {
        color: #27ae60;
        font-weight: bold;
    }
    
    .success-rate-medium {
        color: #f39c12;
    }
    
    .success-rate-low {
        color: #e74c3c;
    }
    
    /* Modal styles */
    .modal {
        display: flex;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        align-items: center;
        justify-content: center;
    }
    
    .modal.hidden {
        display: none;
    }
    
    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        width: 80%;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        color: #aaa;
    }
    
    .close-modal:hover {
        color: #333;
    }
    
    .modal-answer {
        margin: 10px 0;
        padding: 10px;
        border-radius: 4px;
        border-left: 3px solid transparent;
    }
    
    .modal-answer.correct-answer {
        background-color: #d5f5e3;
        border-left-color: #2ecc71;
    }
    
    .answer-option-label {
        font-weight: bold;
        margin-right: 5px;
    }
    
    /* Radio alphabet styles */
    .alphabet-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 15px;
        margin: 20px 0;
    }
    
    .alphabet-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        border-radius: 8px;
        background-color: #f8f9fa;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s ease;
    }
    
    .alphabet-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .alphabet-letter {
        font-size: 24px;
        font-weight: bold;
        color: #3498db;
        margin-bottom: 5px;
    }
    
    .alphabet-code {
        font-size: 14px;
        color: #2c3e50;
    }
    
    /* Message examples styles */
    .message-category {
        margin-bottom: 25px;
    }
    
    .message-category h3 {
        color: #2980b9;
        border-bottom: 2px solid #3498db;
        padding-bottom: 5px;
        margin-bottom: 15px;
    }
    
    .message-examples-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 15px;
    }
    
    .message-example {
        background-color: #f8f9fa;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        transition: transform 0.2s ease;
    }
    
    .message-example:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .message-title {
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 8px;
        font-size: 16px;
    }
    
    .message-content {
        background-color: #e8f4fc;
        padding: 10px;
        border-radius: 4px;
        font-family: monospace;
        margin-bottom: 8px;
        color: #34495e;
        font-weight: bold;
    }
    
    .message-description {
        font-size: 14px;
        color: #7f8c8d;
        font-style: italic;
    }
    
    /* Make question rows clickable */
    .question-row {
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .question-row:hover {
        background-color: #e8f4fc !important;
    }
    
    /* Expandable questions styles */
    .expandable-question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    
    .expand-icon {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-color: #3498db;
        color: white;
        border-radius: 50%;
        text-align: center;
        line-height: 20px;
        font-size: 16px;
        margin-left: 10px;
        flex-shrink: 0;
    }
    
    .answers-row.hidden {
        display: none;
    }
    
    .answers-row td {
        padding: 0;
        background-color: #f9f9f9;
    }
    
    .answer-container {
        padding: 10px 20px;
    }
    
    .answer-item {
        padding: 8px;
        margin-bottom: 5px;
        border-left: 3px solid transparent;
    }
    
    .answer-item.correct-answer {
        background-color: #d5f5e3;
        border-left-color: #2ecc71;
    }
    
    .expand-controls {
        margin: 20px 0;
        text-align: right;
    }
    
    .expand-btn {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        margin-left: 10px;
    }
    
    .expand-btn:hover {
        background-color: #2980b9;
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
 * @param {string} appVersion - Application version
 * @returns {string} JavaScript code as a string
 */
function generateJavaScript(data, appVersion) {
  const { generateExamScript } = require('./examAppScript');
  return generateExamScript(data, appVersion);
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
            
            <div class="button-group">
                <button id="start-btn">Start Exam</button>
                <button id="stats-btn">View Statistics</button>
                <button id="show-alphabet-btn">Radio Alphabet</button>
                <button id="show-messages-btn">Message Examples</button>
            </div>
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
        
        <!-- Statistics -->
        <div id="statistics" class="hidden">
            <h2>Question Statistics</h2>
            <div id="statistics-container"></div>
            <div class="controls">
                <button id="back-to-main-btn">Back to Main</button>
            </div>
        </div>
        
        <!-- Radio Alphabet Reference -->
        <div id="radio-alphabet" class="hidden">
            <h2>Radio Phonetic Alphabet</h2>
            <div id="alphabet-container" class="alphabet-grid"></div>
            <div class="controls">
                <button id="back-from-alphabet-btn">Back</button>
            </div>
        </div>
        
        <!-- Message Examples -->
        <div id="message-examples" class="hidden">
            <h2>Radio Message Examples</h2>
            <div id="message-examples-container"></div>
            <div class="controls">
                <button id="back-from-messages-btn">Back</button>
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
