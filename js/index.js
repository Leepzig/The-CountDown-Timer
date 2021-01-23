/*
TODO
-Create an Add Timer button
-Create an add Timer form
-add the feature to put minutes instead of hours
      -make a minute timer and an hour timer a sub class of super Timer?
-Fix timerControls class: -start button is not recieving the function
      -reorganize renderClock() to be more readable
-add a note class
-make note subclass : todoList
- Emerson mentioned that I was updating the HTML directly every second, how can I change that?

BUGS:
-erase function works when called in console, but when button is pressed throws error, cannot .remove() of null
-display function not working
-buttons are recieving the start/stop functions but not actually starting/stopping the time. because timerRunning = undefined
-recordtime is not registering as a function on the stoptime()
-impossible to reset the timer if the timer hits 0

DEBUGGED:
-every refresh it executes the stop time function
-the new timer HTML is getting overwritten with the timer when the start timer funciton runs

DONE


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

// used to reset the timer, but currently only works if the timer has been stopped
function resetTimer() {
  timeInSeconds = inputTimeInHours * 60 * 60
  return timeInSeconds
}

//records the information in localStorage and is displayed in display_records
function recordTime() {
  var timeElapsed = convertMilliseconds(endTime - startTime)
  var answer = prompt("Why are you stopping?")
  var currentTime = new Date
  localStorage[currentTime] = JSON.stringify([{date: currentTime.toLocaleString, duration:timeElapsed, reason:answer}])
}

//function to stop the timer when it hits 0 and to show a congrats message. it is called in updateTimer()
function congratMessag() {
  if (timeInSeconds <= 0) {
    clearInterval(timerOn);
    alert("You did it!!!! You're Amazing!!!!!  Now time to get started on next week.");
  }
}