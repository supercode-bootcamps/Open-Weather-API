// api.openweathermap.org/data/2.5/weather?q=London,uk&appid=78c29c57fa1b0939a568dac3a843325c


let button = document.querySelector("button");
let form = document.querySelector("form");

const localTime = document.querySelector("#localTime .value");
const wind = document.querySelector("#wind .value");
const cloudiness = document.querySelector("#cloudiness .value");
const pressure = document.querySelector("#pressure .value");
const humidity = document.querySelector("#humidity .value");
const sunrise = document.querySelector("#sunrise .value");
const sunset = document.querySelector("#sunset .value");
const geoCoords = document.querySelector("#geoCoords .value");

form.addEventListener("submit",(e) => {
  e.preventDefault();
  let city = document.querySelector("#searchField");
  city = city.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78c29c57fa1b0939a568dac3a843325c`
    )
    .then((response) => response.json())
    .then((data) => {
      localTime.innerHTML = "Uhrzeit von jetzt";
      wind.innerHTML = data.wind.speed;
      console.log(data)})
})
