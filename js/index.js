/*
TODO
think of a way to remove last_time from table
put in a nav bar
fix the CSS in buttons, create container with CSS?
make display for loop better/more readable
change the key in localstorage to something better and more readable
make timer into a class O.O
along with making a timer a class make it possible to have multiple timers
add a celebration when the timer hits 0
upload everything to GIT
add an analog version?
add depth to the timers



DONE
automate creation of table rows with new data
make table
start time records time localeStorage["start_time"] = 4444
stop time records time  localeStorage["stop_time"] = 4444
stop time - start time = time elapsed working
localeStorage["time_working"] = stop time - start time
alert input box? Why? = answer
localStorage[{date/time: 4444, time_elapsed: 4444, answer: hungry}]

*/



//used to display the time with zeros if less than 10
function addZeroIfLess10(num) {
  let newNum = num < 10 ? '0' + num : num;
  return newNum
}

//converts millisconds to hours:minutes:seconds
function convertMilliseconds(mil) {
  var totalSeconds = Math.floor(mil/1000)
  let hours = Math.floor(totalSeconds/3600);
  let minutes = Math.floor(totalSeconds/60) % 60;
  let seconds = totalSeconds % 60;
  var timeElapsed = `${addZeroIfLess10(hours)}:${addZeroIfLess10(minutes)}:${addZeroIfLess10(seconds)}`;
  return timeElapsed
}

var inputTimeInHours = 20
var timeInSeconds
//timeInSeconds is the variable that decreases everytime updateTimer is executed
if (localStorage['last_time']) {
  timeInSeconds = localStorage['last_time'] 
} else {
  timeInSeconds = inputTimeInHours * 60 * 60
}

function updateTimer() {
  let hours = Math.floor(timeInSeconds/3600);
  let minutes = Math.floor(timeInSeconds/60) % 60;
  let seconds = timeInSeconds % 60;
  var countDown = `${addZeroIfLess10(hours)}:${addZeroIfLess10(minutes)}:${addZeroIfLess10(seconds)}`;
  document.getElementById("container").innerHTML = countDown;
  timeInSeconds--;
  localStorage['last_time'] = timeInSeconds;
  congratMessag();
}
//timerOn is used to clearInterval() with stopTimer
var timerOn
//timerRunning is used to control what actions are allowed when the timer is running.
var timerRunning = false
var startTime

function startTimer() {
  if (timerRunning === false) {
    timerOn = setInterval(updateTimer, 1000) 
    startTime = Date.now()
    timerRunning = true
  } 
}

var endTime

function stopTimer() {
  endTime = Date.now()
  recordTime()
  clearInterval(timerOn);
  timerRunning = false
}

function resetTimer() {
  timeInSeconds = inputTimeInHours * 60 * 60
  return timeInSeconds
}

function recordTime() {
  var timeElapsed = convertMilliseconds(endTime - startTime)
  var answer = prompt("Why are you stopping?")
  var currentTime = new Date
  localStorage[currentTime] = JSON.stringify({duration:timeElapsed, reason:answer})
}

function congratMessag() {
  if (timeInSeconds <= 0) {
    clearInterval(timerOn);
    alert("You did it!!!! You're Amazing!!!!!  Now time to get started on next week.");
  }
}