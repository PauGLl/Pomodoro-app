// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import "channels"

Rails.start()
Turbolinks.start()



const pomodoroTimer = document.querySelector('#pomodoro-timer');
const shortTimer = document.querySelector('#short-break-timer');
const longTimer = document.querySelector('#long-break-timer');
const onGoingTimer = document.querySelector('#on-going-timer');
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');

pomodoroTimer.addEventListener('click', (event) => {
  longTimer.classList.remove('active');
  shortTimer.classList.remove('active');
  pomodoroTimer.classList.add('active');
});
shortTimer.addEventListener('click', (event) => {
  pomodoroTimer.classList.remove('active');
  longTimer.classList.remove('active');
  shortTimer.classList.add('active');
});
longTimer.addEventListener('click', (event) => {
  pomodoroTimer.classList.remove('active');
  shortTimer.classList.remove('active');
  longTimer.classList.add('active');
});

startBtn.addEventListener('click', (event) => {
  startTimer();
});
stopBtn.addEventListener('click', (event) => {
  stopTimer();
});

const timer = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 4,
  sessions: 0,
};

const modeButtons = document.querySelector('#js-mode-buttons');
modeButtons.addEventListener('click', handleMode);

function updateClock() {
  const { remainingTime } = timer;
  const minutes = `${remainingTime.minutes}`.padStart(2, '0');
  const seconds = `${remainingTime.seconds}`.padStart(2, '0');

  const min = document.getElementById('js-minutes');
  const sec = document.getElementById('js-seconds');
  min.textContent = minutes;
  sec.textContent = seconds;

  const text = timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
  document.title = `${minutes}:${seconds} — ${text}`;
}

function switchMode(mode) {
  timer.mode = mode;
  timer.remainingTime = {
    total: timer[mode] * 60,
    minutes: timer[mode],
    seconds: 0,
  };

  document
    .querySelectorAll('button[data-mode]')
    .forEach(e => e.classList.remove('active'));
  document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
  document.body.style.backgroundColor = `var(--${mode})`;

  updateClock();
}

function handleMode(event) {
  const { mode } = event.target.dataset;

  switchMode(mode);
  stopTimer();
}

// Start the countdown

let interval;

function getRemainingTime(endTime) {
  const currentTime = Date.parse(new Date());
  const difference = endTime - currentTime;

  const total = Number.parseInt(difference / 1000, 10);
  const minutes = Number.parseInt((total / 60) % 60, 10);
  const seconds = Number.parseInt(total % 60, 10);

  return {
    total,
    minutes,
    seconds,
  };
}

function startTimer() {
  let { total } = timer.remainingTime;
  const endTime = Date.parse(new Date()) + total * 1000;

  if (timer.mode === 'pomodoro') timer.sessions++;

  interval = setInterval(function () {
    timer.remainingTime = getRemainingTime(endTime);
    updateClock();

    total = timer.remainingTime.total;
    if (total <= 0) {
      clearInterval(interval);

      switch (timer.mode) {
        case 'pomodoro':
          if (timer.sessions % timer.longBreakInterval === 0) {
            switchMode('longBreak');
          } else {
            switchMode('shortBreak');
          }
          break;
        default:
          switchMode('pomodoro');
      }

      // document.querySelector("#sound").play();

      startTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
};

document.addEventListener('DOMContentLoaded', () => {
  switchMode('pomodoro');
});
