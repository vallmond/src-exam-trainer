const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('/Users/dzmitryshokel/Projects/exam/src/data/exam_questions.json', 'utf8'));

// Update categories based on ID
data.forEach(item => {
  if (item.id >= 175 && item.id < 235) {
    item.category = "GMDSS";
  } else if (item.id >= 235) {
    item.category = "Obsługa";
  }
});

// Write the updated JSON back to file
fs.writeFileSync('/Users/dzmitryshokel/Projects/exam/src/data/exam_questions.json', JSON.stringify(data, null, 2));

console.log('Categories updated successfully');
