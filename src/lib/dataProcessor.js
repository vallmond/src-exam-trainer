/**
 * Data processing utilities for the exam application
 */

/**
 * Creates a map of correct answers for easy lookup
 * @param {Array} correctAnswersData - Array of correct answer objects
 * @returns {Object} Map of question IDs to correct options
 */
function createCorrectAnswersMap(correctAnswersData) {
  const correctAnswersMap = {};
  correctAnswersData.forEach(answer => {
    correctAnswersMap[answer.id] = answer.correct_option;
  });
  return correctAnswersMap;
}

/**
 * Processes the data needed for the exam application
 * @param {Object} questionsData - The questions data
 * @param {Object} correctAnswersData - The correct answers data
 * @param {Object} translationsData - The translations data
 * @returns {Object} Processed data for the application
 */
function processExamData(questionsData, correctAnswersData, translationsData) {
  const correctAnswersMap = createCorrectAnswersMap(correctAnswersData);
  
  return {
    questionsData,
    correctAnswersMap,
    translationsData
  };
}

module.exports = {
  createCorrectAnswersMap,
  processExamData
};
