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
