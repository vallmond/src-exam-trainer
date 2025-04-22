/**
 * Module for generating message examples code for the exam application.
 * This module provides functions to generate JavaScript code for displaying
 * maritime radio communication message examples.
 *
 * @returns {string} JavaScript code for message examples functionality
 */
function generateMessageExamplesCode() {
  // Define the message examples as an array of objects
  const messageExamples = [
    {
      category: 'Distress (MAYDAY)',
      examples: [
        {
          title: '🚨 1. MAYDAY – Fire in the engine room',
          message: "📻 Distress Call (Yacht Stella):\nMAYDAY, MAYDAY, MAYDAY\nThis is Motor Yacht Stella, callsign MX1234, MMSI 235123456\nMAYDAY\nMotor Yacht Stella, callsign MX1234, MMSI 235123456\nMy position is 51 degrees 45 minutes North, 004 degrees 20 minutes West\nAt time 1530 UTC\nWe have a fire in the engine room\nThere are 5 persons on board\nWe are fighting the fire but require immediate assistance\nOver.\n\n📻 Response (Coastguard):\nMAYDAY\nMotor Yacht Stella, Motor Yacht Stella, this is Milford Haven Coastguard\nreceived\nMAYDAY\nYour position 51 degrees 45 minutes North, 004 degrees 20 minutes West at 1530 UTC is acknowledged\nWe are launching rescue services to your location now\nMaintain watch on channel 16 and switch to channel 67 for further instructions\nOver.",
          description: 'Example of a distress call for a vessel with fire in the engine room and the coastguard response'
        },
        {
          title: '🚨 2. MAYDAY – Taking on water',
          message: "📻 Distress Call (Sailing Yacht Ocean Spirit):\nMAYDAY, MAYDAY, MAYDAY\nThis is Sailing Yacht Ocean Spirit, callsign ZY7890, MMSI 244987321\nMAYDAY\nSailing Yacht Ocean Spirit, callsign ZY7890, MMSI 244987321\nMy position is 52 degrees 30 minutes North, 003 degrees 15 minutes East\nAt time 1015 UTC\nWe are taking on water and cannot stop the flooding\nThere are 4 persons on board\nWe are preparing to abandon ship\nRequire immediate assistance\nOver.\n\n📻 Response (Coastguard):\nMAYDAY\nSailing Yacht Ocean Spirit, Sailing Yacht Ocean Spirit, this is Netherlands Coastguard\nreceived\nMAYDAY\nYour position 52 degrees 30 minutes North, 003 degrees 15 minutes East at 1015 UTC is acknowledged\nRescue helicopter and lifeboat are en route to your position\nEstimated time of arrival is 20 minutes\nMaintain watch on channel 16 and keep this channel clear for emergency traffic\nOver.",
          description: 'Example of a distress call for a vessel taking on water and preparing to abandon ship'
        },
        {
          title: '🚨 3. MAYDAY – Complete distress communication sequence',
          message: "📌 MAYDAY Distress Call (from \"Sailing Yacht Endeavor\")\nDistress Call (from Sailing Yacht Endeavor)\nMAYDAY, MAYDAY, MAYDAY\nThis is Sailing Yacht Endeavor, Sailing Yacht Endeavor, Sailing Yacht Endeavor\ncallsign ZT9876, MMSI 123456789\nMAYDAY\nSailing Yacht Endeavor, callsign ZT9876, MMSI 123456789\nMy position is 47 degrees 45 minutes North, 005 degrees 25 minutes West\nAt time 1345 UTC\nWe are taking on water and cannot stop the flooding\nThere are 6 persons on board\nWe are preparing to abandon ship\nRequire immediate assistance\nOver.\n\n📌 Response to MAYDAY (from Coastguard)\nFirst Acknowledgment (from Coastguard)\nMAYDAY\nSailing Yacht Endeavor, Sailing Yacht Endeavor\nThis is United Kingdom Coastguard\nRECEIVED\nMAYDAY\nSailing Yacht Endeavor, callsign ZT9876, MMSI 123456789\nYour position 47 degrees 45 minutes North, 005 degrees 25 minutes West at 1345 UTC is acknowledged\nWe are launching rescue operations immediately\nETA 15 minutes\nPlease switch to channel 67 for further instructions\nOver.\n\n📌 SEELONCE FEENEE Message (from Coastguard)\nMAYDAY\nALL STATIONS, ALL STATIONS, ALL STATIONS\nThis is United Kingdom Coastguard, United Kingdom Coastguard, United Kingdom Coastguard\ncallsign UKCG123\nTime of message: 1405 UTC\nMMSI 123456789\nSEELONCE FEENEE.",
          description: 'Complete distress communication sequence including initial MAYDAY call, coastguard acknowledgment, and SEELONCE FEENEE message'
        }
      ]
    },
    {
      category: 'Urgency (PAN-PAN)',
      examples: [
        {
          title: '⚠️ 2. PAN-PAN – Man overboard',
          message: "📻 Urgency Call:\nPAN-PAN, PAN-PAN, PAN-PAN\nAll stations, all stations, all stations\nThis is Sailing Yacht Aurora, Aurora, Aurora\nPosition: 52 degrees 00 minutes North, 001 degrees 30 minutes East\nWe have a man overboard, male, wearing a red lifejacket\nSearching the area, need assistance from nearby vessels\nOver.\n\n📻 Reply from Nearby Vessel:\nSailing Yacht Aurora, this is Motor Vessel Horizon\nWe are 2 nautical miles from your position\nAltering course to assist in search\nEstimated time of arrival 10 minutes\nOver.",
          description: 'Urgency call for man overboard situation with response from a nearby vessel'
        },
        {
          title: '⚠️ 3. PAN-PAN – Steering failure',
          message: "📻 Urgency Call:\nPAN-PAN, PAN-PAN, PAN-PAN\nAll stations, all stations, all stations\nThis is Fishing Vessel Coral Bay, Coral Bay, Coral Bay\nPosition: 53 degrees 15 minutes North, 005 degrees 05 minutes West\nWe have complete steering failure\nDrifting in moderate seas, engine functioning\nRequesting tow or escort to nearest safe harbor\nOver.\n\n📻 Coastguard Reply:\nFishing Vessel Coral Bay, this is Holyhead Coastguard\nPAN-PAN message received\nWe are alerting a lifeboat to your position\nKeep listening on channel 16, switch to channel 67 for updates\nOver.",
          description: 'Urgency call for vessel with steering failure and coastguard response'
        },
        {
          title: '⚠️ 4. PAN-PAN – Medical emergency',
          message: "📻 Urgency Call:\nPAN-PAN, PAN-PAN, PAN-PAN\nAll stations, all stations, all stations\nThis is Sailing Yacht Moonlight, Moonlight, Moonlight\nPosition: 50 degrees 20 minutes North, 001 degrees 45 minutes West\nWe have a crew member with a suspected broken arm\nConscious, in pain, stable condition\nRequesting medical advice or evacuation\nOver.\n\n📻 Coastguard Reply:\nSailing Yacht Moonlight, this is Solent Coastguard\nPAN-PAN received\nWe are connecting you with medical radio consultation\nMaintain this channel for further instructions\nOver.",
          description: 'Urgency call for medical emergency with coastguard response'
        },
        {
          title: '⚠️ 5. PAN-PAN – Anchor dragging',
          message: "📻 Urgency Call:\nPAN-PAN, PAN-PAN, PAN-PAN\nAll stations, all stations, all stations\nThis is Motor Vessel Seaglass, Seaglass, Seaglass\nAnchored at 49 degrees 57 minutes North, 003 degrees 01 minutes West\nAnchor is dragging, vessel moving towards shallow water\nEngine running, trying to regain control\nAssistance may be required\nOver.\n\n📻 Nearby Vessel Reply:\nMotor Vessel Seaglass, this is Yacht Neptune nearby\nWe are standing by if you need help or tow\nWe're 0.5 miles south of your position\nOver.",
          description: 'Urgency call for vessel with dragging anchor and response from nearby vessel'
        }
      ]
    },
    {
      category: 'Safety (SECURITÉ)',
      examples: [
        {
          title: '📢 6. SECURITÉ – Floating debris warning',
          message: "📻 Safety Call:\nSECURITÉ, SECURITÉ, SECURITÉ\nAll stations, all stations, all stations\nThis is Sailing Vessel Windrunner, Windrunner, Windrunner\nPosition: 51 degrees 12 minutes North, 001 degrees 25 minutes East\nLarge floating container spotted, approx. 10 meters long\nDanger to navigation, drifting east\nAll vessels advised to navigate with caution\nOver.\n\n📻 Coastguard Reply:\nSailing Vessel Windrunner, this is Dover Coastguard\nSECURITÉ message received and acknowledged\nWe will broadcast navigational warning to all vessels\nThank you for your report\nOver.",
          description: 'Safety call warning about floating debris and coastguard response'
        },
        {
          title: '📢 7. SECURITÉ – Weather warning',
          message: "📻 Safety Broadcast (from Coastguard):\nSECURITÉ, SECURITÉ, SECURITÉ\nAll stations, all stations, all stations\nThis is Falmouth Coastguard\nGale warning in effect for sea area Plymouth\nSouthwest winds expected Force 8, increasing Force 9 later\nAll vessels are advised to take precautions\nTime of issue: 1600 UTC\nOut.",
          description: 'Safety broadcast from coastguard about severe weather conditions'
        }
      ]
    }
  ];

  // Convert the message examples to a JSON string
  const messageExamplesJSON = JSON.stringify(messageExamples);

  return `
    // Radio message examples data
    const messageExamples = ${messageExamplesJSON};
    
    // Message examples functions
    function showMessageExamples() {
      document.getElementById('exam-settings').style.display = 'none';
      document.getElementById('message-examples').classList.remove('hidden');
    }
    
    function initializeMessageExamples() {
      const container = document.getElementById('message-examples-container');
      let html = '';
      
      messageExamples.forEach(category => {
        html += '<div class="message-category">';
        html += '<h3>' + category.category + '</h3>';
        html += '<div class="message-examples-list">';
        
        category.examples.forEach(example => {
          html += '<div class="message-example">';
          html += '<div class="message-title">' + example.title + '</div>';
          
          // Replace newlines with <br> tags for proper HTML display
          let formattedMessage = example.message.replace(/\\n/g, '<br>');
          
          // Highlight keywords
          const keywords = ['MAYDAY', 'PAN-PAN', 'SECURITÉ', 'SEELONCE FEENEE', 'This is', 'callsign', 'MMSI', 'Over', 'At time', 'received', 'RECEIVED'];
          keywords.forEach(keyword => {
            const regex = new RegExp(keyword, 'g');
            formattedMessage = formattedMessage.replace(regex, '<span class="keyword-highlight">' + keyword + '</span>');
          });
          
          html += '<div class="message-content">' + formattedMessage + '</div>';
          
          html += '<div class="message-description">' + example.description + '</div>';
          html += '</div>';
        });
        
        html += '</div>';
        html += '</div>';
      });
      
      container.innerHTML = html;
    }
    
    function hideMessageExamples() {
      document.getElementById('message-examples').classList.add('hidden');
      document.getElementById('exam-settings').style.display = 'block';
    }
  `;
}

module.exports = {
  generateMessageExamplesCode
};
