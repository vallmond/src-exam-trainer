/**
 * File utility functions for the exam application
 */
const fs = require('fs');
const path = require('path');

/**
 * Ensures that a directory exists, creating it if necessary
 * @param {string} dirPath - Path to the directory
 */
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Reads and parses a JSON file
 * @param {string} filePath - Path to the JSON file
 * @returns {Object} Parsed JSON data
 */
function readJsonFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error);
    throw error;
  }
}

/**
 * Writes content to a file
 * @param {string} filePath - Path to the file
 * @param {string} content - Content to write
 */
function writeToFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.error(`Error writing to file ${filePath}:`, error);
    throw error;
  }
}

/**
 * Writes JSON data to a file
 * @param {string} filePath - Path to the file
 * @param {Object} data - Data to write
 * @param {number} indentation - Number of spaces for indentation
 */
function writeJsonFile(filePath, data, indentation = 2) {
  writeToFile(filePath, JSON.stringify(data, null, indentation));
}

module.exports = {
  ensureDirectoryExists,
  readJsonFile,
  writeToFile,
  writeJsonFile
};
