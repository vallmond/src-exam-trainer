/**
 * Module for generating message examples code for the exam application.
 * This module provides functions to generate JavaScript code for displaying
 * maritime radio communication message examples.
 *
 * @returns {string} JavaScript code for message examples functionality
 */
function generateMessageExamplesCode() {
  // Define message templates and examples
  const messageTemplates = {
    distress: {
      category: 'Distress (MAYDAY)',
      types: [
        {
          type: 'call',
          title: 'Distress Call Template',
          lines: [
            { type: 'keyword', template: 'MAYDAY, MAYDAY, MAYDAY', example: 'MAYDAY, MAYDAY, MAYDAY' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_name_3x', template: 'THIS IS (nazwa statku powtórzona 3 razy)', example: 'THIS IS Spinaker, Spinaker, Spinaker' },
            { type: 'spacer', template: '', example: '' },
            { type: 'keyword', template: 'MAYDAY', example: 'MAYDAY' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_id', template: 'THIS IS (numer MMSI, nazwa i sygnał wywoławczy (Call sign) stacji w niebezpieczeństwie)', example: 'THIS IS 278054321, Spinaker, call sign Sierra 5 Lima 1 2' },
            { type: 'spacer', template: '', example: '' },
            { type: 'position', template: 'MY POSITION IS (współrzędne geograficzne lub namiar i odległość od określonego punktu) AT (czas UTC określenia pozycji)', example: 'MY POSITION IS 450(four five degrees) 36\'(three six minutes) North 0130(zero one three degrees) 32\'(three two minutes) East AT 0545 UTC' },
            { type: 'spacer', template: '', example: '' },
            { type: 'danger', template: '(Rodzaj zagrożenia)', example: 'The mast has broken and the engine is not strong enough to prevent us from grounding on a rocky shore' },
            { type: 'spacer', template: '', example: '' },
            { type: 'assistance', template: '(Rodzaj oczekiwanej pomocy)', example: 'IMMEDIATE ASSISTANCE REQUIRED' },
            { type: 'spacer', template: '', example: '' },
            { type: 'additional_info', template: '(Inne informacje potrzebne w akcji ratunkowej (np. liczba osób na burcie, warunki pogodowe itp.)', example: '5 persons on board and due to strong winds we can only remain on board for approximately two zero minutes' },
            { type: 'spacer', template: '', example: '' },
            { type: 'ending', template: 'OVER', example: 'OVER' }
          ],
          description: 'Template for a distress call using the MAYDAY procedure'
        },
        {
          type: 'relay',
          title: 'Mayday Relay Template',
          lines: [
            { type: 'keyword', template: 'MAYDAY RELAY, MAYDAY RELAY, MAYDAY RELAY', example: 'MAYDAY RELAY, MAYDAY RELAY, MAYDAY RELAY' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_id', template: 'THIS IS (numer MMSI, nazwa i Call sign statku przekazującego alarm)', example: 'THIS IS 278054321, Rescue Vessel Alpha, call sign Romeo Victor Alpha' },
            { type: 'spacer', template: '', example: '' },
            { type: 'received_mayday', template: 'RECEIVED THE FOLLOWING MAYDAY FROM (numer MMSI, nazwa i Call sign statku w niebezpieczeństwie)', example: 'RECEIVED THE FOLLOWING MAYDAY FROM 235123456, Sailing Yacht Stella, call sign Sierra Yankee Sierra' },
            { type: 'spacer', template: '', example: '' },
            { type: 'message', template: '(komunikat odebrany ze statku w niebezpieczeństwie)', example: 'Position 51 degrees 45 minutes North, 004 degrees 20 minutes West. Fire in engine room, 5 persons on board, immediate assistance required.' },
            { type: 'spacer', template: '', example: '' },
            { type: 'ending', template: 'OVER', example: 'OVER' }
          ],
          description: 'Template for relaying a distress call from another vessel'
        },
        {
          type: 'received',
          title: 'Mayday Received Template',
          lines: [
            { type: 'keyword', template: 'MAYDAY', example: 'MAYDAY' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_id', template: '(numer MMSI, nazwa i Call sign statku w niebezpieczeństwie)', example: '278054321, Spinaker, call sign Sierra 5 Lima 1 2' },
            { type: 'spacer', template: '', example: '' },
            { type: 'rescue_id', template: 'THIS IS (numer, nazwa i Call sign własnego statku)', example: 'THIS IS 235123456, Coast Guard Rescue, call sign Charlie Golf Romeo' },
            { type: 'spacer', template: '', example: '' },
            { type: 'keyword', template: 'RECEIVED MAYDAY', example: 'RECEIVED MAYDAY' }
          ],
          description: 'Template for acknowledging receipt of a distress call'
        },
        {
          type: 'cancel',
          title: 'Cancel Distress Template',
          lines: [
            { type: 'all_stations', template: 'ALL STATIONS, ALL STATIONS, ALL STATIONS', example: 'ALL STATIONS, ALL STATIONS, ALL STATIONS' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_id', template: 'THIS IS (numer MMSI, nazwa, Call sign naszego statku)', example: 'THIS IS 278054321, Spinaker, Spinaker, Spinaker, call sign Sierra 5 Lima 1 2' },
            { type: 'spacer', template: '', example: '' },
            { type: 'position', template: 'POSITION (współrzędne geograficzne) AT (czas UTC określenia pozycji)', example: 'POSITION 450(four five degrees) 36\'(three six minutes) North 0130(zero one three degrees) 32\'(three two minutes) East AT 0550 UTC' },
            { type: 'spacer', template: '', example: '' },
            { type: 'cancel_alert', template: 'CANCEL MY DISTRESS ALERT OF (data i czas UTC nadanie fałszywego alarmu)', example: 'CANCEL MY DISTRESS ALERT OF 21 November at 0545 UTC' },
            { type: 'spacer', template: '', example: '' },
            { type: 'ending', template: 'OVER', example: 'OVER' }
          ],
          description: 'Template for cancelling a false distress alert'
        },
        {
          type: 'finished',
          title: 'Mayday Finished Template',
          lines: [
            { type: 'keyword', template: 'MAYDAY', example: 'MAYDAY' },
            { type: 'spacer', template: '', example: '' },
            { type: 'all_stations', template: 'ALL STATIONS, ALL STATIONS, ALL STATIONS', example: 'ALL STATIONS, ALL STATIONS, ALL STATIONS' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_name_3x', template: 'THIS IS (nazwa stacji w niebezpieczeństwie powtórzona 3 razy)', example: 'THIS IS Coast Guard Rescue, Coast Guard Rescue, Coast Guard Rescue' },
            { type: 'spacer', template: '', example: '' },
            { type: 'time', template: '(data i czas UTC)', example: '24 April 2025 0630 UTC' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_id', template: '(numer MMSI, nazwa i Call sign stacji w niebezpieczeństwie)', example: '278054321, Spinaker, call sign Sierra 5 Lima 1 2' },
            { type: 'spacer', template: '', example: '' },
            { type: 'keyword', template: '(odpowiedni zwrot)', example: 'SEELONCE FEENEE' },
            { type: 'spacer', template: '', example: '' },
            { type: 'ending', template: 'OUT', example: 'OUT' }
          ],
          description: 'Template for announcing the end of a distress situation (SEELONCE FEENEE, PRUDONCE, or SEELONCE DISTRESS)'
        }
      ]
    },
    urgency: {
      category: 'Urgency (PAN-PAN)',
      types: [
        {
          type: 'call',
          title: 'Urgency Call Template',
          lines: [
            { type: 'keyword', template: 'PAN PAN, PAN PAN, PAN PAN', example: 'PAN PAN, PAN PAN, PAN PAN' },
            { type: 'spacer', template: '', example: '' },
            { type: 'all_stations', template: 'ALL STATIONS, ALL STATIONS, ALL STATIONS lub', example: 'ALL STATIONS, ALL STATIONS, ALL STATIONS' },
            { type: 'spacer', template: '', example: '' },
            { type: 'this_is', template: 'THIS IS', example: 'THIS IS' },
            { type: 'spacer', template: '', example: '' },
            { type: 'station_name', template: '(Nazwa stacji, którą wywołujemy powtórzona trzykrotnie)', example: 'Spinaker, Spinaker, Spinaker' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_id', template: '(numer MMSI i Call sign naszego statku)', example: '278054321, call sign Sierra 5 Lima 1 2' },
            { type: 'spacer', template: '', example: '' },
            { type: 'position', template: 'POSITION', example: 'POSITION 450(four five degrees) 36\'(three six minutes) North 0130(zero one three degrees) 32\'(three two minutes)' },
            { type: 'spacer', template: '', example: '' },
            { type: 'situation_keyword', template: '', example: 'Medivac' },
            { type: 'spacer', template: '', example: '' },
            { type: 'situation', template: '(opis sytuacji, przyczyna, dla której wywołujemy, spodziewana pomoc itp.)', example: 'Injured crewman requires medical evacuation' },
            { type: 'spacer', template: '', example: '' },
            { type: 'additional_info', template: '(Inne informacje)', example: 'Steaming towards Trieste speed 6 knots' },
            { type: 'spacer', template: '', example: '' },
            { type: 'ending', template: 'OVER', example: 'OVER' }
          ],
          description: 'Template for an urgency call using the PAN-PAN procedure'
        }
      ]
    },
    safety: {
      category: 'Safety (SECURITÉ)',
      types: [
        {
          type: 'call',
          title: 'Safety Call Template',
          lines: [
            { type: 'keyword', template: 'SECURITE, SECURITE, SECURITE', example: 'SECURITE, SECURITE, SECURITE' },
            { type: 'spacer', template: '', example: '' },
            { type: 'all_stations', template: 'ALL STATIONS, ALL STATIONS, ALL STATIONS lub\n(Nazwa stacji, którą wywołujemy powtórzona trzykrotnie)', example: 'ALL STATIONS, ALL STATIONS, ALL STATIONS' },
            { type: 'spacer', template: '', example: '' },
            { type: 'vessel_id', template: 'THIS IS (numer MMSI, nazwa i Call sign naszego statku)', example: 'THIS IS 278054321, Spinaker, Spinaker, Spinaker, call sign Sierra 5 Lima 1 2' },
            { type: 'spacer', template: '', example: '' },
            { type: 'time_info', template: '', example: 'Navigation warning 0845 UTC' },
            { type: 'spacer', template: '', example: '' },
            { type: 'message', template: '(position message)', example: 'Position 450(four five degrees) 36\'(three six minutes) North<br>0130(zero one three degrees) 32\'(three two minutes)' },
            { type: 'spacer', template: '', example: '' },
            { type: 'safety_info', template: '(treść wiadomości)', example: 'Sighted 3 20 foot cargo containers partially submerged' },
            { type: 'spacer', template: '', example: '' },
            { type: 'additional_info', template: '(Inne informacje)', example: 'Danger to navigation' },
            { type: 'spacer', template: '', example: '' },
            { type: 'ending', template: 'OUT', example: 'OUT' }
          ],
          description: 'Template for a safety call using the SECURITÉ procedure'
        }
      ]
    },
    routine: {
      category: 'Routine Call',
      types: [
        {
          type: 'call',
          title: 'Routine Call Template',
          lines: [
            { type: 'called_station_3x', template: '(Nazwa stacji, którą wywołujemy powtórzona trzykrotnie)', example: 'Lyngby Radio Lyngby Radio Lyngby Radio' },
            { type: 'spacer', template: '', example: '' },
            { type: 'calling_station', template: 'THIS IS (numer MMSI, nazwa i Call sign naszego statku)', example: 'THIS IS 278054321, Spinaker, Spinaker, Spinaker, code sign Sierra 5 Lima 1 2' },
            { type: 'spacer', template: '', example: '' },
            { type: 'message', template: '(treść wiadomości)', example: 'Request link call to subscriber +44 1253 779123' },
            { type: 'spacer', template: '', example: '' },
            { type: 'ending', template: 'OVER', example: 'OVER' }
          ],
          description: 'Template for a routine call between stations'
        }
      ]
    }
  };

  // Convert the message templates to a JSON string
  const messageTemplatesJSON = JSON.stringify(messageTemplates);

  return `
    // Radio message templates data
    const messageTemplates = ${messageTemplatesJSON};
    
    // Message examples functions
    function showMessageExamples() {
      document.getElementById('exam-settings').style.display = 'none';
      document.getElementById('message-examples').classList.remove('hidden');
    }
    
    function initializeMessageExamples() {
      const container = document.getElementById('message-examples-container');
      let html = '';
      
      // Loop through each message category (distress, urgency, safety, routine)
      Object.keys(messageTemplates).forEach(key => {
        const category = messageTemplates[key];
        
        html += '<div class="message-category">';
        html += '<h3>' + category.category + '</h3>';
        
        // Loop through each message type in the category (call, response, etc.)
        category.types.forEach(messageType => {
          html += '<div class="message-type">';
          html += '<div class="message-title">' + messageType.title + '</div>';
          html += '<div class="message-description">' + messageType.description + '</div>';
          
          // Create template display
          html += '<div class="message-template">';
          html += '<h4>Template:</h4>';
          html += '<div class="template-content">';
          
          // Display template lines
          messageType.lines.forEach(line => {
            if (line.type === 'spacer') {
              html += '<div class="template-line spacer">&nbsp;</div>';
            } else {
              // Template is already properly formatted
              html += '<div class="template-line ' + line.type + '">' + line.template + '</div>';
            }
          });
          
          html += '</div>'; // End template-content
          html += '</div>'; // End message-template
          
          // Create example display (initially hidden)
          html += '<div class="message-example hidden">';
          html += '<h4>Example:</h4>';
          html += '<div class="example-content">';
          
          // Display example lines
          messageType.lines.forEach(line => {
            if (line.type === 'spacer') {
              html += '<div class="example-line spacer">&nbsp;</div>';
            } else {
              // Example is already properly formatted
              html += '<div class="example-line ' + line.type + '">' + line.example + '</div>';
            }
          });
          
          html += '</div>'; // End example-content
          html += '</div>'; // End message-example
          
          // Add show example button
          html += '<button class="show-example-btn" data-message-type="' + messageType.type + '">Show Example</button>';
          
          html += '</div>'; // End message-type
        });
        
        html += '</div>'; // End message-category
      });
      
      container.innerHTML = html;
      
      // Add event listeners to show example buttons
      const showButtons = container.querySelectorAll('.show-example-btn');
      showButtons.forEach(button => {
        button.addEventListener('click', toggleExample);
      });
    }
    
    function toggleExample(event) {
      const button = event.currentTarget;
      const messageTypeDiv = button.closest('.message-type');
      const exampleDiv = messageTypeDiv.querySelector('.message-example');
      const templateDiv = messageTypeDiv.querySelector('.message-template');
      
      if (exampleDiv.classList.contains('hidden')) {
        // Show example, hide template
        exampleDiv.classList.remove('hidden');
        templateDiv.classList.add('hidden');
        button.textContent = 'Show Template';
      } else {
        // Show template, hide example
        exampleDiv.classList.add('hidden');
        templateDiv.classList.remove('hidden');
        button.textContent = 'Show Example';
      }
    }
    
    function hideMessageExamples() {
      document.getElementById('message-examples').classList.add('hidden');
      document.getElementById('exam-settings').style.display = 'block';
    }
    
    // Add CSS for the message templates and examples
    const style = document.createElement('style');
    style.textContent = \`
      .message-type {
        margin-bottom: 30px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
      }
      
      .message-title {
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 5px;
        color: #2c3e50;
      }
      
      .message-description {
        font-style: italic;
        margin-bottom: 15px;
        color: #7f8c8d;
      }
      
      .template-content, .example-content {
        font-family: monospace;
        white-space: pre-wrap;
        background-color: #fff;
        padding: 15px;
        border-radius: 5px;
        border: 1px solid #eee;
        margin-bottom: 10px;
      }
      
      .template-line, .example-line {
        line-height: 1.5;
      }
      
      .spacer {
        height: 10px;
      }
      
      .keyword {
        font-weight: bold;
        color: #e74c3c;
      }
      
      .show-example-btn {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 10px;
      }
      
      .show-example-btn:hover {
        background-color: #2980b9;
      }
      
      .hidden {
        display: none;
      }
    \`;
    document.head.appendChild(style);
  `;
}

module.exports = {
  generateMessageExamplesCode
};
