/**
 * Script to generate a standalone HTML exam application
 * This script reads JSON data files and generates a complete HTML file
 * with embedded CSS and JavaScript
 * 
 * Version tracking is implemented to increment version number on each generation
 */

const path = require('path');
const { 
  ensureDirectoryExists, 
  readJsonFile, 
  writeToFile 
} = require('./src/lib/fileUtils');
const { getAndIncrementVersion } = require('./src/lib/versionManager');
const { processExamData } = require('./src/lib/dataProcessor');
const { generateHtmlContent } = require('./src/lib/htmlGenerator');

// Define paths
const dataDir = path.join(__dirname, 'src', 'data');
const outputDir = path.join(__dirname, 'final');
const outputFile = path.join(outputDir, 'exam_app_with_translations.html');
const versionFile = path.join(__dirname, 'version.json');

// Main function to generate the exam application
function generateExamApp() {
  try {
    // Ensure output directory exists
    ensureDirectoryExists(outputDir);

    // Get and increment version
    const appVersion = getAndIncrementVersion(versionFile);

    // Read JSON data files
    const questionsData = readJsonFile(path.join(dataDir, 'exam_questions.json'));
    const correctAnswersData = readJsonFile(path.join(dataDir, 'correct_answers.json'));
    const translationsData = readJsonFile(path.join(dataDir, 'translations.json'));

    // Process the data
    const processedData = processExamData(questionsData, correctAnswersData, translationsData);

    // Generate the HTML content
    const htmlContent = generateHtmlContent(processedData, appVersion);

    // Write the HTML file
    writeToFile(outputFile, htmlContent);

    console.log(`Successfully generated exam application at: ${outputFile}`);
  } catch (error) {
    console.error('Error generating exam application:', error);
    process.exit(1);
  }
}

// Run the generator
generateExamApp();
