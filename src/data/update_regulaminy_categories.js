const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('/Users/dzmitryshokel/Projects/exam/src/data/exam_questions.json', 'utf8'));

// Update categories based on ID
let updatedCount = 0;
data.forEach(item => {
  if (item.id < 115) {
    item.category = "Regulaminy i Terminy";
    updatedCount++;
  }
});

// Write the updated JSON back to file
fs.writeFileSync('/Users/dzmitryshokel/Projects/exam/src/data/exam_questions.json', JSON.stringify(data, null, 2));

console.log(`Categories updated successfully. Updated ${updatedCount} questions.`);
