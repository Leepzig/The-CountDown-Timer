

//helper function to format hh:mm:ss to display the time with zeros if less than 10
function addZeroIfLess10(num) {
  let newNum = num < 10 ? '0' + num : num;
  return newNum
}
//helper function to convert miliseconds to hh:mm:ss format
function convertMilliseconds(mil) {
  var totalSeconds = Math.floor(mil/1000)
  let hours = Math.floor(totalSeconds/3600);
  let minutes = Math.floor(totalSeconds/60) % 60;
  let seconds = totalSeconds % 60;
  var timeElapsed = `${addZeroIfLess10(hours)}:${addZeroIfLess10(minutes)}:${addZeroIfLess10(seconds)}`;
  return timeElapsed
}


class Timer {
  constructor(name, time) {
    //time is curretly in hours only
    this.time = time
    this.name = name
    this.timeInSeconds = time * 60 * 60
    //timerInterval holds the setInterval variable to clear with clearInterval
    this.timerInterval;
    this.timerRunning = false;
    //start/endTime used to measure the duration that someone was working
    this.startTime;
    this.endTime;
    if (localStorage['last_time' + this.name]) {
      this.timeInSeconds = localStorage['last_time' + this.name]
    } else {
      this.timeInSeconds = time * 60 * 60
    }
  }
 
  //timer used to set the time in the HTML
  updateTimer() {
    var hours = Math.floor(this.timeInSeconds/3600)
    var minutes = Math.floor(this.timeInSeconds/60) % 60;
    var seconds = this.timeInSeconds % 60;
    var countDown = `${addZeroIfLess10(hours)}:${addZeroIfLess10(minutes)}:${addZeroIfLess10(seconds)}`;
    document.getElementById(this.name).innerHTML = countDown;
    this.timeInSeconds--;
    //every second that passes will overwrite 'last_time' in localstorage so that it's saved if the window is closed
    localStorage['last_time' + this.name] = this.timeInSeconds;
    this.congratMessag()
  }

  startTimer() {
    console.log("start timer is working")
    this.startTime = Date.now()
    console.log(`TimerRunning = ${this.timerRunning}`)
    console.log(typeof(this.timerRunning))
    if (this.timerRunning === false ) { //|| this.timerRunning == undefined
      console.log('if statement = true')
      this.timerInterval = setInterval(this.updateTimer.bind(this), 1000)
      // this.timerOn = setInterval(function() { this.updateTimer.bind(this) }, 1000)
      // this.timerOn = setInterval(() => { this.updateTimer }, 1000)
      this.timerRunning = true
    } 
  }
  
  //clears the interval and records the duration by calling recordTime()
  //throws error recordTime is not a function
  stopTimer() {
    console.log("stoptimer is working.")
    this.endTime = Date.now()
    this.recordTime()
    clearInterval(this.timerInterval);
    this.timerRunning = false
  }
  
  //resets the timer but only if the timer is running impossible to stop the timer if it hits 0
  resetTimer() {
    this.timeInSeconds = this.time * 60 * 60
    return this.timeInSeconds
  }

  //record time stores the date, duration, and reason for stopping in localstorage 
  //in under the name of the specified timer in an array of objects
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


class TimerControls extends Timer {
  constructor(name, time) {
    super(name, time)
    this.name = name
    this.timerRunning = false
    //this.startTimer = clock.startTimer();
    //this.stopTimer = clock.stopTimer();
    //this.resetTimer = clock.resetTimer();
  }

  //takes text for the button and where the button will be appeneded as params, creates a button
  renderButton(text, element) {
      var node = document.createTextNode(text)
      var button = document.createElement('button')
      button.appendChild(node)
      element.appendChild(button)
      return button
  }

  //creates a new element with a class and attaches it to another element
  renderNewElementWClass(cls, element, elementToCreate) {
      var el = document.createElement(elementToCreate)
      el.classList.add(cls)
      element.appendChild(el)
      return el
  }
  //function works when called but not when pressed by the button
  //erases the HTML from the clock and also erases all the localStorage data
  unRenderClock() {
    console.log("erase functiion is being called")
    var eraseTimer = window.confirm('This will erase your timer and ALL of its data.  Click Okay to continue or cancel to cancel:')
    if (eraseTimer) {
      var element = document.getElementById(this.name + 'clock')
      element.remove()
      localStorage.removeItem(this.name)
    }
  }

  renderClock() {
    // clocks is the main place for all the timers
      var clocks = document.querySelector('.clocks')
      // creating new elements
      var div = this.renderNewElementWClass('clock-container', clocks, 'div')
      div.setAttribute('id', `${this.name}clock`)

      //creating a Title and a text node, appeding node to title
      var h2 = this.renderNewElementWClass('timer-title', div, 'h2')
      var h2Node = document.createTextNode(this.name)
      h2.appendChild(h2Node)

      var mainClock = this.renderNewElementWClass('clock', div, 'div')
      mainClock.setAttribute('id', this.name)

      //creating the controls of the timer, rendering the buttons and adding eventlisteners
      var controls = this.renderNewElementWClass('controls', div, 'div')
      var startButton = this.renderButton('Start Timer', controls )
      var stopButton = this.renderButton('Stop Timer', controls )
      var resetButton = this.renderButton('Reset Timer', controls )
      var eraseButton = this.renderButton('Erase Timer', controls )
      startButton.addEventListener('click', super.startTimer.bind(this))
      stopButton.addEventListener('click', super.stopTimer.bind(this))
      resetButton.addEventListener('click', super.resetTimer.bind(this))
      eraseButton.addEventListener('click', this.unRenderClock.bind(this))
  }

}

//used to create a new timer on the main page.
function newTimer() {
  var name = prompt("Enter the name of your timer:")
  var time = prompt("Enter the number of hours for your timer")
  var newClock = new TimerControls(name, parseInt(time))
  newClock.renderClock()
  return newClock
}

// var codingTimer = new Timer('Coding', 20)
var eggControls = new TimerControls('Egg', 4)
eggControls.renderClock()
