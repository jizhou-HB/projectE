let correctAnswerCount = 0;
let currentRandomNumbers = [0, 0]; // Store the current random numbers
let isNumberDice = false; // Track the current state of the toggle

function generateNewDiceValues() {
    currentRandomNumbers[0] = Math.floor(Math.random() * 9) + 1; // 1-9
    currentRandomNumbers[1] = Math.floor(Math.random() * 9) + 1; // 1-9

    // Set the images based on the current toggle state
    updateDiceImages();

    return currentRandomNumbers[0] * currentRandomNumbers[1]; // Return the correct answer for comparison
}

function updateDiceImages() {
    const diceImages = document.querySelectorAll('.dice img');

    diceImages.forEach((img, index) => {
        if (isNumberDice) {
            // Change to number dice images based on current random numbers
            img.src = `images/number${currentRandomNumbers[index]}.png`; // Set to number dice image
        } else {
            // Change back to original images
            img.src = `images/dice${currentRandomNumbers[index]}.png`; // Set to original image source
        }
    });
}

let correctAnswer = generateNewDiceValues(); // Set initial correct answer

// Initialize Speech Recognition API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "de-DE"; // Set language to German, you can change this if needed
recognition.continuous = false; // Set to false to stop after the first result

// Event listener for voice input
document.getElementById("checkAnswerButton").addEventListener("click", function() {
  document.querySelector("h1").innerHTML = "Sage die Antwort!"; // Prompt the user to speak

  // Start listening for speech input
  recognition.start();
  
  recognition.onresult = function(event) {
    const userInput = event.results[0][0].transcript; // Get the transcript of the speech
    console.log("User said: " + userInput);
    
    let parsedInput;

    // Check if the input is a number greater than 10
    const parsedNumber = parseInt(userInput, 10);
    if (!isNaN(parsedNumber) && parsedNumber > 10) {
        parsedInput = parsedNumber; // Use the parsed number directly
    } else {
        parsedInput = normalizeInput(userInput); // Normalize for numbers 1-10
    }

    console.log("Parsed input: " + parsedInput); // Log the parsed input for debugging
    
    // Check if the spoken answer is correct
    if (parsedInput === correctAnswer) {
        console.log("Valid number: " + parsedInput);
        correctAnswerCount++;
        document.querySelector("h1").innerHTML = "🚩 Du bist Super!";
        var tom1 = new Audio("sounds/tom-2.mp3");
        tom1.play();

        // Check milestones and show badges
        if (correctAnswerCount >= 5) {
            document.getElementById("badge1").classList.add("show");
            document.getElementById("badge1").style.display = "inline-block";
        }
        if (correctAnswerCount >= 10) {
            document.getElementById("badge2").classList.add("show");
            document.getElementById("badge2").style.display = "inline-block";
        }
        if (correctAnswerCount >= 15) {
            document.getElementById("badge3").classList.add("show");
            document.getElementById("badge3").style.display = "inline-block";
        }

        // Generate a new task automatically after 3 seconds
        setTimeout(function() {
            correctAnswer = generateNewDiceValues(); // Generate new values for the next task
            document.querySelector("h1").innerHTML = "Versuche es!";
        }, 2000); // 2-second delay
    } else {
        console.log("Das ist nicht die richtige Zahl. Bitte versuchen Sie es erneut.");
        document.querySelector("h1").innerHTML = "leider...versuch noch mal";
        var tom2 = new Audio("sounds/crash.mp3");
        tom2.play();
    }
  };

  recognition.onerror = function(event) {
    console.log("Entschuldigung, ich habe dich nicht verstanden.");
    document.querySelector("h1").innerHTML = "Bitte versuchen Sie es erneut.";
    var tom2 = new Audio("sounds/crash.mp3");
    tom2.play();
  };
});

// Normalization function
function normalizeInput(input) {
    const numberMap = {
        "eins": 1, "zwei": 2, "drei": 3, "vier": 4, "fünf": 5,
        "sechs": 6, "sieben": 7, "acht": 8, "neun": 9, "zehn": 10,
        "1": 1, "2": 2, "3": 3, "4": 4, "5": 5,
        "6": 6, "7": 7, "8": 8, "9": 9, "10": 10
    };
    
    input = input.toLowerCase().trim(); // Normalize input to lowercase and trim whitespace
    
    // Check if the input is a number in the map
    return numberMap[input] !== undefined ? numberMap[input] : null; // Return null if not found
}

// Assuming you have an array of image sources for number dice
const numberDiceImages = [
    'images/number1.png',
    'images/number2.png',
    'images/number3.png',
    'images/number4.png',
    'images/number5.png',
    'images/number6.png',
    'images/number7.png',
    'images/number8.png',
    'images/number9.png'
];

// Update original dice images to match your naming convention
const originalDiceImages = [
    'images/dice1.png',
    'images/dice2.png',
    'images/dice3.png',
    'images/dice4.png',
    'images/dice5.png',
    'images/dice6.png',
    'images/dice7.png',
    'images/dice8.png',
    'images/dice9.png'
];

document.getElementById('toggleDiceCheckbox').addEventListener('change', function() {
    isNumberDice = this.checked; // Update the toggle state
    updateDiceImages(); // Update images based on the new toggle state
});

// Call this function to generate new values and update images
function nextRound() {
    correctAnswer = generateNewDiceValues(); // Generate new values for the next task
}

// Example of how to call nextRound after a correct answer
// setTimeout(nextRound, 2000); // Uncomment this line to automatically go to the next round after 2 seconds

console.log("Raw input: " + userInput);
