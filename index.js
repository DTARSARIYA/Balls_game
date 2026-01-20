let score = 0;
let fallSpeed = 1; // pixels per frame
let ballInterval = 1000; // milliseconds

const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");

// Function to create a new ball
function createBall() {
  const ball = document.createElement("div");
  ball.classList.add("ball");

  const maxWidth = gameArea.clientWidth - 40;
  ball.style.left = Math.floor(Math.random() * maxWidth) + "px";
  gameArea.appendChild(ball);

  let topPos = 0;

  // Falling animation
  const fall = setInterval(() => {
    topPos += fallSpeed;
    ball.style.top = topPos + "px";

    if (topPos >= gameArea.clientHeight) {
      clearInterval(fall);
      ball.remove();
    }
  }, 16); // ~60 FPS

  // Click to "pop" the ball
  ball.addEventListener("click", () => {
    clearInterval(fall);
    ball.remove();
    score++;
    scoreDisplay.textContent = score;
  });
}

// Interval to create balls
let ballGenerator = setInterval(createBall, ballInterval);

// Speed up over time
setInterval(() => {
  if (ballInterval > 300) {
    ballInterval -= 100;
    clearInterval(ballGenerator);
    ballGenerator = setInterval(createBall, ballInterval);
  }
  fallSpeed += 0.3;
}, 50000); // Every 50 seconds
    