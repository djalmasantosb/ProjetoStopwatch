class Stopwatch {
  #elapsedTimeInSeconds = 0;
  #intervalId = null;

  start(callback = () => {}) {
    this.#intervalId = setInterval(() => {
      this.#elapsedTimeInSeconds++;
      callback();
    }, 1000);
  }

  stop(callback = () => {}) {
    clearInterval(this.#intervalId);
    callback();
  }

  reset(callback = () => {}) {
    this.#elapsedTimeInSeconds = 0;
    callback();
  }

  get elapsedTime() {
    return Stopwatch.formatTime(this.#elapsedTimeInSeconds);
  }

  static formatTime(timeInSeconds) {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;

    return `${Stopwatch.zeroPadding(hours)}:${Stopwatch.zeroPadding(
      minutes
    )}:${Stopwatch.zeroPadding(seconds)}`;
  }

  static zeroPadding(originalNumber, desiredAmountDigits = 2) {
    let stringNumber = String(originalNumber);
    const zeroesRequired = desiredAmountDigits - stringNumber.length;

    if (zeroesRequired <= 0) {
      return stringNumber;
    }
    for (let counter = 0; counter < zeroesRequired; counter++) {
      stringNumber = `0${stringNumber}`;
    }
    return stringNumber;
  }
}

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const stopwatchDisplay = document.getElementById('stopwatch-display');

function updateDisplay() {
  stopwatchDisplay.innerText = sw1.elapsedTime;
}

const sw1 = new Stopwatch();

startBtn.addEventListener('click', () => {
  sw1.start(updateDisplay);
  startBtn.classList.add('bg-color-start');
  stopBtn.classList.add('secondary-button');
  stopBtn.classList.remove('bg-color-stop');
  resetBtn.classList.remove('bg-color-reset');
});

stopBtn.addEventListener('click', () => {
  sw1.stop();
  startBtn.classList.remove('bg-color-start');
  stopBtn.classList.remove('secondary-button');
  resetBtn.classList.remove('bg-color-reset');
  stopBtn.classList.add('bg-color-stop');
});

resetBtn.addEventListener('click', () => {
  sw1.reset(updateDisplay);
  resetBtn.classList.add('bg-color-reset');
});
