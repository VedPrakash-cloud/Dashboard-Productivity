let timerRun;
let totalSecondsRemaining = 1500;
let showTimer;
let timerBtn;
let modal;

function getCorrectTime() {
  let minutes = Math.floor(totalSecondsRemaining / 60);
  let seconds = Math.floor(totalSecondsRemaining % 60);

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function timerCheck() {
  clearInterval(timerRun);

  if (!showTimer) {
    showTimer = document.querySelector(".countDown");
  }

  timerRun = setInterval(() => {
    totalSecondsRemaining -= 1;

    showTimer.innerHTML = getCorrectTime();

    if (totalSecondsRemaining === 0) {
      clearInterval(timerRun);
      totalSecondsRemaining = 1500;
    }
  }, 1000);
}

function pauseCheck() {
  clearInterval(timerRun);
}

function clearTimeRun() {
  if (!showTimer) {
    showTimer = document.querySelector(".countDown");
  }
  totalSecondsRemaining = 1500;
  clearInterval(timerRun);
  showTimer.innerHTML = `25:00`;
}

function modalWatch() {
  if (!modal) {
    modal = document.querySelector(".watch-modal");
  }

  if (!modal) return;

  modal.style.display = "flex";

  let currentTime = getCorrectTime();

  modal.innerHTML = `
    <div class="watch-form">
        <p class="watch-close">X</p>
        <div class="watchModal-nav">
            <div class="center">
                <h5 class="watchModal-heading">Pomodoro Timer</h5>
                <div class="watchModal-container">
                    <h3 class="countDown">${currentTime}</h3>
                    <div class="modalWatchBtn">
                        <button class="pause"><i class="fa-regular fa-circle-pause"></i></button>
                        <button class="timerBtn"><i class="fa-regular fa-circle-play"></i></button>
                        <button class="stop"><i class="fa-regular fa-circle-xmark"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

  showTimer = modal.querySelector(".countDown");
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".timerBtn")) {
    modalWatch();
    timerCheck();
  }

  if (e.target.closest(".watch-close")) {
    if (modal) {
      modal.style.display = "none";
      if(showTimer){
        showTimer = document.querySelector(".countDown");
      }
      showTimer.innerHTML = getCorrectTime();
      pauseCheck();
    }
  }
});
