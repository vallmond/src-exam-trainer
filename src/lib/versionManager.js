/**
 * Version management utilities for the exam application
 */
const path = require('path');
const { readJsonFile, writeJsonFile } = require('./fileUtils');

/**
 * Gets the current app version and increments it
 * @param {string} versionFilePath - Path to the version file
 * @returns {string} The incremented version string
 */
function getAndIncrementVersion(versionFilePath) {
  let appVersion = '1.0.0';
  
  try {
    if (require('fs').existsSync(versionFilePath)) {
      const versionData = readJsonFile(versionFilePath);
      appVersion = versionData.version;
      
      // Increment version (patch number)
      const versionParts = appVersion.split('.');
      versionParts[2] = (parseInt(versionParts[2]) + 1).toString();
      appVersion = versionParts.join('.');
    }
    
    // Save updated version
    writeJsonFile(versionFilePath, { version: appVersion });
    console.log(`Generating app version: ${appVersion}`);
  } catch (e) {
    console.error('Error handling version:', e);
  }
  
  return appVersion;
}

module.exports = {
  getAndIncrementVersion
};
