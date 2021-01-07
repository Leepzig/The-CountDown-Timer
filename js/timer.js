
var inputTimeInHours = 20
//timeInSeconds is the variable that decreases everytime updateTimer is executed
if (localStorage['last_time']) {
  var timeInSeconds = localStorage['last_time'] 
} else {
  var timeInSeconds = inputTimeInHours * 60 * 60
}


//used to display the time with zeros if less than 10
function addZeroIfLess10(num) {
  let newNum = num < 10 ? '0' + num : num;
  return newNum
}

function updateTimer() {
  let hours = Math.floor(timeInSeconds/3600);
  let minutes = Math.floor(timeInSeconds/60) % 60;
  let seconds = timeInSeconds % 60;
  var countDown = `${addZeroIfLess10(hours)}:${addZeroIfLess10(minutes)}:${addZeroIfLess10(seconds)}`;
  document.getElementById("container").innerHTML = countDown;
  timeInSeconds--;
  localStorage['last_time'] = timeInSeconds;
}
//timerOn is used to clearInterval() with stopTimer
var timerOn
//timerRunning is used to control what actions are allowed when the timer is running.
var timerRunning = false

function startTimer() {
  if (timerRunning === false) {
    timerOn = setInterval(updateTimer, 1000) 
    timerRunning = true
  } 
}

function stopTimer() {
  clearInterval(timerOn);
  timerRunning = false
}

function resetTimer() {
  timeInSeconds = inputTimeInHours * 60 * 60
  return timeInSeconds
}

updateTimer()


