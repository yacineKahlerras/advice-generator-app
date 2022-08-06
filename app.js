/** vars */
const url = "https://api.adviceslip.com/advice";
const adviceId = document.querySelector(".title-id");
const adviceText = document.querySelector(".advice-text");
const button = document.querySelector(".button");
const loading = document.querySelector(".loading-container");
let isServerWaiting = false;
let adviceInDemand = false;

const init = () => {
  getAdvice();
};

// gets advice from url and puts them into html
const getAdvice = async () => {
  loading.classList.add("show");
  if (isServerWaiting) {
    adviceInDemand = true;
    return;
  }

  let data = await fetchData();
  data = data.slip;
  adviceId.textContent = `ADVICE #${data.id}`;
  adviceText.textContent = `"${data.advice}"`;
  loading.classList.remove("show");

  isServerWaiting = true;
  setTimeout(waitForServer, 2000);
};

// waits for server to load
const waitForServer = async () => {
  isServerWaiting = false;
  if (adviceInDemand) {
    adviceInDemand = false;
    getAdvice();
  }
};

// gets json data from url
const fetchData = async () => {
  let response = await fetch(url).catch((err) => console.error(err));
  if (response) return response.json();
  return response;
};

window.addEventListener("DOMContentLoaded", init);
button.addEventListener("click", init);
