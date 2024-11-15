let correctAnswerCount = 0;

function generateNewDiceValues() {
  var randomNumber1 = Math.floor(Math.random() * 9) + 1; // 1-9
  var randomDiceImage1 = "dice" + randomNumber1 + ".png"; // e.g., dice1.png
  var randomImageSource1 = "images/" + randomDiceImage1;
  document.querySelectorAll("img")[0].setAttribute("src", randomImageSource1);

  var randomNumber2 = Math.floor(Math.random() * 9) + 1; // 1-9
  var randomDiceImage2 = "dice" + randomNumber2 + ".png"; // e.g., dice2.png
  var randomImageSource2 = "images/" + randomDiceImage2;
  document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);

  return randomNumber1 * randomNumber2; // Return the correct answer for comparison
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
    var userInput = event.results[0][0].transcript; // Get the transcript of the speech
    console.log("User said: " + userInput);

    // Check if the spoken answer is correct
    if (parseInt(userInput) === correctAnswer) {
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
      if (correctAnswerCount >= 20) {
        document.getElementById("badge3").classList.add("show");
        document.getElementById("badge3").style.display = "inline-block";
      }

      // Generate a new task automatically after 3 seconds
      setTimeout(function() {
        correctAnswer = generateNewDiceValues(); // Generate new values for the next task
        document.querySelector("h1").innerHTML = "Versuche es!";
      }, 2000); // 2-second delay
    } else {
      // Stay on the same task for another attempt
      document.querySelector("h1").innerHTML = "leider...versuch noch mal";
      var tom2 = new Audio("sounds/crash.mp3");
      tom2.play();
    }
  };

  recognition.onerror = function(event) {
    document.querySelector("h1").innerHTML = "Entschuldigung, ich habe dich nicht verstanden.";
    var tom2 = new Audio("sounds/crash.mp3");
    tom2.play();
  };
});
