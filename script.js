// Flowchart-style question logic
const questions = {
  start: {
    question: "Are you a horse?",
    image: "Videos and Images/pxArt (2).png",
    next: { yes: "q2", no: "end" },
  },
  q2: {
    question: "Do you walk with four legs?",
    image: "Videos and Images/pxArt (8).png",
    next: { yes: "q3", no: "end" },
  },
  q3: {
    question: "Really?",
    image: "Videos and Images/pxArt (9).png",
    next: { yes: "q4", no: "q4" },
  },
  q4: {
    question: "Can you read and write?",
    image: "Videos and Images/pxArt (1).png",
    next: { yes: "end", no: "q5" },
  },
  q5: {
    question: "Liar, you are reading this",
    image: "Videos and Images/pxArt (7).png",
    next: { yes: "end", no: "end" },
  },
  end: {
    question: "YOU ARE NOT A HORSE!",
    image: "",
    next: {},
  },
};

let currentQuestion = "start";
let answeredQuestions = 0;
const totalQuestions = 8;

// Function to load the current question
function loadQuestion() {
  const questionElement = document.getElementById("question");
  const questionImage = document.getElementById("questionImage");
  const yesButton = document.getElementById("yesBtn");
  const noButton = document.getElementById("noBtn");

  // Load the current question's text and image
  questionElement.textContent = questions[currentQuestion].question;

  // Display image if it exists, otherwise hide the image element
  if (questions[currentQuestion].image) {
    questionImage.src = questions[currentQuestion].image;
    questionImage.style.display = "block";
  } else {
    questionImage.style.display = "none";
  }

  // If the current question is the last one, hide the Yes/No buttons
  if (
    !questions[currentQuestion].next.yes &&
    !questions[currentQuestion].next.no
  ) {
    yesButton.style.display = "none";
    noButton.style.display = "none";

    // Show the progress tracker and final message
    document.getElementById("progressTracker").style.display = "block";
    document.getElementById(
      "progressTracker"
    ).textContent = `You have unlocked ${answeredQuestions}/${totalQuestions} questions.`;

    // Show the Back button to restart the game
    document.getElementById("backButton").style.display = "block";
  } else {
    // Ensure the buttons are visible for other questions
    yesButton.style.display = "inline-block";
    noButton.style.display = "inline-block";
  }
}

// Function to move to the next question based on the choice
function nextQuestion(choice) {
  // Increment the answered questions only after progressing to the next question
  answeredQuestions++;

  // Move to the next question based on user choice
  currentQuestion = questions[currentQuestion].next[choice];

  // Load the next question
  loadQuestion();
}

// Function to restart the game
function restartGame() {
  currentQuestion = "start"; // Reset to the first question
  answeredQuestions = 0; // Reset the counter

  // Hide the progress tracker and back button
  document.getElementById("progressTracker").style.display = "none";
  document.getElementById("backButton").style.display = "none";

  // Show the Yes/No buttons again
  document.getElementById("yesBtn").style.display = "inline-block";
  document.getElementById("noBtn").style.display = "inline-block";

  // Load the first question again
  loadQuestion();
}

// Mute/Unmute Functionality
let isMuted = false;
const audioElement = document.getElementById("backgroundAudio");
const muteButton = document.getElementById("muteButton");

// Function to toggle mute status
function toggleMute() {
  if (isMuted) {
    audioElement.play();
    muteButton.textContent = "🔊"; // Unmuted
  } else {
    audioElement.pause();
    muteButton.textContent = "🔇"; // Muted
  }
  isMuted = !isMuted;
}

// Function to show/hide the user manual when the ESC key is pressed
function toggleUserManual() {
  const userManual = document.getElementById("userManual");

  // Toggle visibility of the user manual
  if (userManual.style.display === "none" || userManual.style.display === "") {
    userManual.style.display = "flex"; // Show the manual
  } else {
    userManual.style.display = "none"; // Hide the manual
  }
}

// Keyboard event listener for M (mute) and ESC (toggle manual)
document.addEventListener("keydown", function (event) {
  if (event.key === "m" || event.key === "M") {
    toggleMute();
  } else if (event.key === "Escape") {
    toggleUserManual();
  }
});

// Load the first question right away when the game starts
loadQuestion();
