

// Update the current time
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
}

// Pomodoro Timer Variables
let timerInterval;
let timeLeft = 25 * 60; // Default 25 minutes in seconds
let isRunning = false;
let isPaused = false;
let completedSessions = 0; // Counter for completed sessions
let totalTime = 25 * 60; // Total time for current session
let isMusicMuted = false; // Music mute state

const lofiMusic = document.getElementById('lofiMusic');

// Update the timer display
function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  document.getElementById('timer').textContent = `${minutes}:${seconds}`;
}

// Update the circle progress
function updateCircleProgress() {
  const progress = document.querySelector('.timer-progress');
  const offset = 440 - (440 * (totalTime - timeLeft)) / totalTime;
  progress.style.strokeDashoffset = offset;
}

// Update the session count display
function updateSessionDisplay() {
  document.getElementById('sessions').textContent = `Phiên Hoàn Thành: ${completedSessions}`;
}

// Start the Pomodoro Timer
function startTimer() {
  if (isPaused) {
    // Resume from paused state
    isPaused = false;
    isRunning = true;
    if (!isMusicMuted) lofiMusic.play();
    document.getElementById('startBtn').disabled = true;
    document.getElementById('pauseBtn').disabled = false;

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
        updateCircleProgress();
      } else {
        clearInterval(timerInterval);
        alert('Pomodoro session complete!');
        isRunning = false;
        completedSessions++;
        updateSessionDisplay();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
        lofiMusic.pause();
      }
    }, 1000);
    return;
  }

  if (isRunning) return;

  // Start a new session
  isRunning = true;
  if (!isMusicMuted) lofiMusic.play();
  document.getElementById('startBtn').disabled = true;
  document.getElementById('pauseBtn').disabled = false;
  document.getElementById('resetBtn').disabled = false;

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
      updateCircleProgress();
    } else {
      clearInterval(timerInterval);
      alert('Pomodoro session complete!');
      isRunning = false;
      completedSessions++;
      updateSessionDisplay();
      document.getElementById('startBtn').disabled = false;
      document.getElementById('pauseBtn').disabled = true;
      lofiMusic.pause();
    }
  }, 1000);
}

// Pause the Pomodoro Timer
function pauseTimer() {
  if (!isRunning || isPaused) return;
  isPaused = true;
  clearInterval(timerInterval);
  document.getElementById('startBtn').disabled = false;
  document.getElementById('pauseBtn').disabled = true;
  lofiMusic.pause();
}

// Reset the Pomodoro Timer
function resetTimer() {
  clearInterval(timerInterval);
  const selectedTime = document.getElementById('timeSelect').value;
  totalTime = selectedTime * 60;
  timeLeft = totalTime; // Set to selected time in minutes
  updateTimerDisplay();
  updateCircleProgress();
  isRunning = false;
  isPaused = false;
  document.getElementById('startBtn').disabled = false;
  document.getElementById('pauseBtn').disabled = true;
  document.getElementById('resetBtn').disabled = true;
  lofiMusic.pause();
  lofiMusic.currentTime = 0;
}

// Reset the session count
function resetSessions() {
  completedSessions = 0;
  updateSessionDisplay();
}

// Mute or unmute music
// function toggleMusicMute() {
//   isMusicMuted = !isMusicMuted;
//   const muteButton = document.getElementById('muteMusicBtn');
//   if (isMusicMuted) {
//     lofiMusic.pause();
//     muteButton.textContent = 'Bật Nhạc';
//   } else {
//     lofiMusic.play();
//     muteButton.textContent = 'Tắt Nhạc';
//   }
// }

// Initialize Timer Based on Selection
document.getElementById('timeSelect').addEventListener('change', () => {
  if (!isRunning) {
    const selectedTime = document.getElementById('timeSelect').value;
    totalTime = selectedTime * 60;
    timeLeft = totalTime;
    updateTimerDisplay();
    updateCircleProgress();
  }
});

// Attach event listeners
document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('pauseBtn').addEventListener('click', pauseTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);
document.getElementById('resetSessionsBtn').addEventListener('click', resetSessions);
// document.getElementById('muteMusicBtn').addEventListener('click', toggleMusicMute);

// Initialize the clock and timer
updateClock();
updateTimerDisplay();
updateCircleProgress();
updateSessionDisplay();
setInterval(updateClock, 1000);