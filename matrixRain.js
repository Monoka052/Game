const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Set canvas size to the size of the arcade screen
function resizeCanvas() {
  const arcadeScreen = document.querySelector(".arcade-screen");
  canvas.width = arcadeScreen.clientWidth;
  canvas.height = arcadeScreen.clientHeight;
}

// Call resizeCanvas on load and on window resize
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const matrixCode = "Are you a horse?";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

// VHS Effect mode
let currentEffect = 1;

// Apply VHS Effect 1: Scanlines
function applyVHSEffect1() {
  // Add scanlines and subtle noise for VHS effect 1
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Darken with a translucent layer
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Add scanlines
  for (let i = 0; i < canvas.height; i += 2) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, i, canvas.width, 1); // Draw horizontal lines
  }
}

// Apply VHS Effect 2: Color distortion
function applyVHSEffect2() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Shift colors slightly to simulate VHS color distortion
    data[i] += 10; // Red channel
    data[i + 1] -= 5; // Green channel
    data[i + 2] += 5; // Blue channel
  }

  // Apply the modified data back to the canvas
  ctx.putImageData(imageData, 0, 0);
}

// Apply VHS Effect 3: White noise (static)
function applyVHSEffect3() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    // Generate random static noise for each pixel
    const noise = Math.random() * 255;
    data[i] = noise; // Red
    data[i + 1] = noise; // Green
    data[i + 2] = noise; // Blue
  }

  // Apply the modified data back to the canvas
  ctx.putImageData(imageData, 0, 0);
}

// Main drawMatrix function for the matrix rain effect
function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0f0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const char = matrixCode[Math.floor(Math.random() * matrixCode.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }

  // Apply the VHS effect based on the current mode
  if (currentEffect === 1) {
    applyVHSEffect1();
  } else if (currentEffect === 2) {
    applyVHSEffect2();
  } else if (currentEffect === 3) {
    applyVHSEffect3(); // Apply white noise effect
  }
}

// Set interval to draw the matrix rain effect continuously
setInterval(drawMatrix, 50);

// Event listener to switch between effects when 1, 2, or 3 keys are pressed
document.addEventListener("keydown", function (event) {
  if (event.key === "1") {
    currentEffect = 1; // Switch to VHS Effect 1 (scanlines)
  } else if (event.key === "2") {
    currentEffect = 2; // Switch to VHS Effect 2 (color distortion)
  } else if (event.key === "3") {
    currentEffect = 3; // Switch to VHS Effect 3 (white noise)
  }
});

// Preload background images
const backgrounds = ['Videos and Images/hoor2.png', 'Videos and Images/ghh.png',];

// Function to change the background image
function changeBackground(index) {
  document.body.style.backgroundImage = `url('${backgrounds[index]}')`;
}

// Add keydown event listener to handle background changes
document.addEventListener('keydown', function(event) {
  if (event.key === '4') {
    changeBackground(0); // Change to first background
  } else if (event.key === '5') {
    changeBackground(1); // Change to second background
  }
});

// Existing code for loading questions, muting, etc.
