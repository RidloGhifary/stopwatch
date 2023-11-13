const startButton = document.querySelector('.js-start-timer'),
  pauseButton = document.querySelector('.js-pause-timer'),
  resetButton = document.querySelector('.js-reset-timer'),
  lapButton = document.querySelector('.js-lap-timer'),
  lapTimerContainer = document.querySelector('.js-lap-list-container'),
  wrapper = document.querySelector('.wrapper')

let milliseconds = document.getElementById('miliseconds'),
  seconds = document.getElementById('seconds'),
  minutes = document.getElementById('minutes'),
  hours = document.getElementById('hours')

let hour = 0
let minute = 0
let second = 0
let milisecond = 0
let timer
let lapTimerArr = []

function timerFunction() {
  if (timer) {
    milisecond++
    if (milisecond == 100) {
      second++
      milisecond = 0
    }
    if (second == 60) {
      minute++
      second = 0
    }
    if (minute == 60) {
      hour++
      minute = 0
      second = 0
    }

    milliseconds.innerHTML = milisecond < 10 ? '0' + milisecond : milisecond
    seconds.innerHTML = second < 10 ? '0' + second + ' :' : second + ' :'
    minutes.innerHTML = minute < 10 ? '0' + minute + ' :' : minute + ' :'
    hours.innerHTML = hour < 10 ? '0' + hour + ' :' : hour + ' :'

    if (timer) {
      pauseButton.classList.remove('hide')
      lapButton.classList.remove('hide')
      startButton.classList.add('hide')
      resetButton.classList.add('hide')
    } else {
      startButton.classList.remove('hide')
      resetButton.classList.remove('hide')
    }

    setTimeout(timerFunction, 10)
  }
}

function startTimer() {
  timer = true
  startButton.innerHTML = 'Resume' ? startButton.innerHTML = 'Start'
    : startButton.innerHTML = 'Resume'

  startButton.classList.add('hide')
  pauseButton.classList.remove('hide')
  lapButton.classList.remove('hide')
  timerFunction()
}

function pauseTimer() {
  timer = false
  timer ? startButton.innerHTML = 'Start' : startButton.innerHTML = 'Resume'

  pauseButton.classList.add('hide')
  startButton.classList.remove('hide')
  lapButton.classList.add('hide')
  resetButton.classList.remove('hide')
}

function resetTimer() {
  wrapper.classList.remove('move-top')
  timer = false
  hour = 0
  minute = 0
  second = 0
  milisecond = 0
  lapTimerArr.length = 0

  const listBanyak = document.querySelectorAll('.js-lap-list')

  listBanyak.forEach(element => {
    element.remove()
  })

  milliseconds.innerHTML = '0' + milisecond
  seconds.innerHTML = '0' + second + ' :'
  minutes.innerHTML = '0' + minute + ' :'
  hours.innerHTML = '0' + hour + ' :'

  startButton.innerHTML = 'Start'
  resetButton.classList.add('hide')
}

function lapTimer() {
  wrapper.classList.add('move-top')

  let showLapTimer = `${hour < 10 ? '0' + hour : hour} : ${minute < 10 ? '0' + minute : minute} : ${second < 10 ? '0' + second : second} : ${milisecond < 10 ? '0' + milisecond : milisecond}`
  lapTimerArr.unshift(showLapTimer)

  //const wrapper = document.querySelector('.wrapper')
  //let a = document.createElement('div')
  //let b = document.createElement('p')
  //let c = document.createElement('hr')

  //a.setAttribute('class', 'js-lap-list-container')
  //b.setAttribute('class', 'js-lap-list')

  //a.appendChild(b)
  //a.appendChild(c)

  let lapList = ''
  lapTimerArr.forEach((element, index) => {
    lapList += `
        <p class="js-lap-list" key="${index}">${element}</p>
        `
  })

  lapTimerContainer.innerHTML = lapList
}

startButton.addEventListener('click', startTimer)
pauseButton.addEventListener('click', pauseTimer)
resetButton.addEventListener('click', resetTimer)
lapButton.addEventListener('click', lapTimer)