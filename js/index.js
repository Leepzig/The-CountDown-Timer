/*
TODO
think of a way to remove last_time from table

make display for loop better/more readable

change the key in localstorage to something better and more readable

make timer into a class O.O
along with making a timer a class make it possible to have multiple timers

localStorage {timerName:
  [
    {1:
      {date:1/9/21,
      duration: 5mins,
      reason: testing},
    2: {
      date: 4555,
      duration: 555,
      reason: testing
    }
    }
  ]
}
localStorage['timerName'] = JSON.stringify([ {1: {date: '1/9/21', duration: 5, reason: testing}, 2:{date: 54, duration: 55, reason: lots}}])
var string = JSON.parse(localStorage['timerName'])

string[0]['1']["date"]



DONE
fix resetTimer()
put in a nav bar
add a celebration when the timer hits 0
upload everything to GIT
automate creation of table rows with new data
make table
start time records time localeStorage["start_time"] = 4444
stop time records time  localeStorage["stop_time"] = 4444
stop time - start time = time elapsed working
localeStorage["time_working"] = stop time - start time
alert input box? Why? = answer

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