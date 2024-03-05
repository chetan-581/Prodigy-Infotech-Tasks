let timer;
let running = false;
let startTime;
let elapsedTime = 0;
let lapCounter = 1;

const display = document.querySelector('.display');
const startStopButton = document.getElementById('startStopButton');
const lapButton = document.getElementById('lapButton');
const resetButton = document.getElementById('resetButton');
const lapList = document.getElementById('lapList');
const stopwatch = document.querySelector('.stopwatch');

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const millisecondsFormatted = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${millisecondsFormatted}`;
}

function updateTime() {
  const currentTime = Date.now();
  const delta = currentTime - startTime + elapsedTime;
  display.textContent = formatTime(delta);
}

function startStop() {
  if (running) {
    clearInterval(timer);
    running = false;
    startStopButton.textContent = 'Start';
    stopwatch.style.animationPlayState = 'paused'; // Pause animation when stopped
  } else {
    startTime = Date.now();
    timer = setInterval(updateTime, 10);
    running = true;
    startStopButton.textContent = 'Stop';
    stopwatch.style.animationName = 'glow'; // Apply animation when started
    stopwatch.style.animationDuration = '1s';
    stopwatch.style.animationIterationCount = 'infinite';
    stopwatch.style.animationDirection = 'alternate';
    stopwatch.style.animationTimingFunction = 'ease';
    stopwatch.style.animationFillMode = 'backwards'; // Freeze at last keyframe
    stopwatch.style.animationPlayState = 'running'; // Start animation
  }
}

resetButton.addEventListener('click', function() {
  reset();
  stopwatch.style.animation = 'none'; // Remove animation when reset
})

function lap() {
  if (running) {
    const lapTime = Date.now() - startTime + elapsedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${formatTime(lapTime)}`;
    lapList.appendChild(lapItem);
    lapCounter++;
  }
}



resetButton.addEventListener('click', function() {
  reset();
  stopwatch.style.animation = 'none'; // Remove animation when reset
});

function reset() {
  clearInterval(timer);
  running = false;
  startStopButton.textContent = 'Start';
  display.textContent = '00:00:00';
  elapsedTime = 0;
  lapCounter = 1;
  lapList.innerHTML = '';
  stopwatch.classList.remove('glow');
}

startStopButton.addEventListener('click', startStop);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);