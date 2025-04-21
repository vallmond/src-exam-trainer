/**
 * Radio alphabet functionality for the exam application
 */

/**
 * Generates the radio alphabet data and functions
 * @returns {string} JavaScript code for radio alphabet functionality
 */
function generateRadioAlphabetCode() {
  return `
    // Radio phonetic alphabet data
    const radioAlphabet = [
        { letter: 'A', code: 'Alfa' },
        { letter: 'B', code: 'Bravo' },
        { letter: 'C', code: 'Charlie' },
        { letter: 'D', code: 'Delta' },
        { letter: 'E', code: 'Echo' },
        { letter: 'F', code: 'Foxtrot' },
        { letter: 'G', code: 'Golf' },
        { letter: 'H', code: 'Hotel' },
        { letter: 'I', code: 'India' },
        { letter: 'J', code: 'Juliett' },
        { letter: 'K', code: 'Kilo' },
        { letter: 'L', code: 'Lima' },
        { letter: 'M', code: 'Mike' },
        { letter: 'N', code: 'November' },
        { letter: 'O', code: 'Oscar' },
        { letter: 'P', code: 'Papa' },
        { letter: 'Q', code: 'Quebec' },
        { letter: 'R', code: 'Romeo' },
        { letter: 'S', code: 'Sierra' },
        { letter: 'T', code: 'Tango' },
        { letter: 'U', code: 'Uniform' },
        { letter: 'V', code: 'Victor' },
        { letter: 'W', code: 'Whiskey' },
        { letter: 'X', code: 'X-ray' },
        { letter: 'Y', code: 'Yankee' },
        { letter: 'Z', code: 'Zulu' },
        { letter: '0', code: 'Zero' },
        { letter: '1', code: 'One' },
        { letter: '2', code: 'Two' },
        { letter: '3', code: 'Three' },
        { letter: '4', code: 'Four' },
        { letter: '5', code: 'Five' },
        { letter: '6', code: 'Six' },
        { letter: '7', code: 'Seven' },
        { letter: '8', code: 'Eight' },
        { letter: '9', code: 'Nine' }
    ];
    
    // Radio alphabet functions
    function showRadioAlphabet() {
        document.getElementById('exam-settings').style.display = 'none';
        document.getElementById('radio-alphabet').classList.remove('hidden');
    }
    
    function initializeRadioAlphabet() {
        const container = document.getElementById('alphabet-container');
        let html = '';
        
        radioAlphabet.forEach(item => {
            html += \`
                <div class="alphabet-item">
                    <div class="alphabet-letter">\${item.letter}</div>
                    <div class="alphabet-code">\${item.code}</div>
                </div>
            \`;
        });
        
        container.innerHTML = html;
    }
  `;
}

module.exports = {
  generateRadioAlphabetCode
};
