
//used to display the time with zeros if less than 10
function addZeroIfLess10(num) {
  let newNum = num < 10 ? '0' + num : num;
  return newNum
}

function convertMilliseconds(mil) {
  var totalSeconds = Math.floor(mil/1000)
  let hours = Math.floor(totalSeconds/3600);
  let minutes = Math.floor(totalSeconds/60) % 60;
  let seconds = totalSeconds % 60;
  var timeElapsed = `${addZeroIfLess10(hours)}:${addZeroIfLess10(minutes)}:${addZeroIfLess10(seconds)}`;
  return timeElapsed
}

class Timer {
  constructor(time, name) {
    this.time = time
    this.name = name
    this.timeInSeconds = time * 60 * 60
    this.timerOn;
    this.timerRunning = false;
    this.startTime;
    this.endTime;
    if (localStorage['last_time']) {
      this.timeInSeconds = localStorage['last_time'] 
    } else {
      this.timeInSeconds = time * 60 * 60
    }
  }
 
  updateTimer() {
    var hours = Math.floor(this.timeInSeconds/3600)
    var minutes = Math.floor(this.timeInSeconds/60) % 60;
    var seconds = this.timeInSeconds % 60;
    var countDown = `${addZeroIfLess10(hours)}:${addZeroIfLess10(minutes)}:${addZeroIfLess10(seconds)}`;
    document.getElementById("container").innerHTML = countDown;
    this.timeInSeconds--;
    localStorage['last_time'] = this.timeInSeconds;
    this.congratMessag()
  }

  startTimer() {
    this.startTime = Date.now()
    if (this.timerRunning === false) {
      this.timerOn = setInterval(this.updateTimer.bind(this), 1000)
      // this.timerOn = setInterval(function() { this.updateTimer.bind(this) }, 1000)
      // this.timerOn = setInterval(() => { this.updateTimer }, 1000)
      console.log(this.timeInSeconds)
      this.timerRunning = true
    } 
  }
  
  stopTimer() {
    this.endTime = Date.now()
    this.recordTime()
    clearInterval(this.timerOn);
    this.timerRunning = false
  }
  
  resetTimer() {
    this.timeInSeconds = this.time * 60 * 60
    return this.timeInSeconds
  }

  recordTime() {
    var timeElapsed = convertMilliseconds(this.endTime - this.startTime)
    var answer = prompt("Why are you stopping?")
    var currentTime = new Date
    currentTime = currentTime.toLocaleString()
    if (localStorage[this.name]) {
      var arr = JSON.parse(localStorage[this.name])
    } else {
      var arr = []
    }
    arr.push({date: currentTime, duration:timeElapsed, reason:answer});
    localStorage[this.name] = JSON.stringify(arr)
  }

  congratMessag() {
    if (this.timeInSeconds <= 0) {
      clearInterval(this.timerOn);
      alert("You did it!!!! You're Amazing!!!!!  Now time to get started on next week.");
    }
  }

}

var codingTimer = new Timer(20, 'codingTimer')


// THE FUTURE:
// var eggTimer = new Timer('egg', 4)
// var eggControls = new TimerControls(eggTimer)
// var codeTimer = new Timer('egg', 20)
// var codeControls = new TimerControls(codeTimer)