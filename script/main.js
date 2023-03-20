const btns = document.querySelectorAll(".btn");
const clock = document.querySelector(".clock");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const text = document.querySelector("#title");

let interval;
let timeSession = 0;
let breakSession = 0;

document.ondragstart = noselect;
document.onselectstart = noselect;
document.oncontextmenu = noselect;
function noselect() {
  return false;
}

btns.forEach((item) => {
  item.addEventListener("click", (e) => {
    const atributte = item.dataset.work;

    if (atributte === "add-work") {
      timeSession += 60;
    } else if (atributte === "add-rest") {
      breakSession += 60;
    } else if (atributte === "remove-work" && timeSession > 60) {
      timeSession -= 60;
    } else if (atributte === "remove-rest" && breakSession > 60) {
      breakSession -= 60;
    }
    console.log([timeSession, breakSession]);
    getTime();
  });
});

const getTime = () => {
  const getMinutes = Math.floor(timeSession / 60);
  const getSecoonds = timeSession % 60;

  if(getMinutes < 0) {
    return;
  } 

  if (getMinutes < 10 && getSecoonds < 10) {
    clock.textContent = `0${getMinutes} : 0${getSecoonds}`;
  } else if (getMinutes < 10 && getSecoonds > 10) {
    clock.textContent = `0${getMinutes} : ${getSecoonds}`;
  } else if (getMinutes > 10 && getMinutes <= 60 && getSecoonds < 10) {
    clock.textContent = `${getMinutes} : 0${getSecoonds}`;
  } else if (getMinutes > 60) {
    timeSession = 0;
  } else {
    clock.textContent = `${getMinutes} : ${getSecoonds}`;
  }
};

const Timer = () => {
  if (timeSession == 0) {
    clearInterval(interval);
  }
  timeSession--;
  getTime();
};
const resetTime = () => {
  timeSession = 0;
  getTime();
  clearInterval(interval);
};

reset.addEventListener("click", resetTime);

start.addEventListener("click", () => {
  if (timeSession != 0) {
    interval = setInterval(Timer, 1000);
  } else {
    return;
  }
});
