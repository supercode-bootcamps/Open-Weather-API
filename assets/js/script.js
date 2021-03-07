// api.openweathermap.org/data/2.5/weather?q=London,uk&appid=78c29c57fa1b0939a568dac3a843325c

let button = document.querySelector("button");
let form = document.querySelector("form");

const cityName = document.querySelector("#cityName");
const mainIcon = document.querySelector("#mainIcon");
const temperature = document.querySelector("#temperature");

const localTime = document.querySelector("#localTime .value");
const wind = document.querySelector("#wind .value");
const cloudiness = document.querySelector("#cloudiness .value");
const pressure = document.querySelector("#pressure .value");
const humidity = document.querySelector("#humidity .value");
const sunrise = document.querySelector("#sunrise .value");
const sunset = document.querySelector("#sunset .value");
const geoCoords = document.querySelector("#geoCoords .value");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = document.querySelector("#searchField");
  city = city.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78c29c57fa1b0939a568dac3a843325c`
  )
    .then((response) => response.json())
    .then((data) => {
      // ---------- main Section ----------------
      cityName.innerHTML = data.name;
      mainIcon.innerHTML = "data.weather[0].icon + hier sollte ein Icon sein";
      temperature.innerHTML = data.main.temp + "in Celsius umrechnen?";

      // ---------- detail Section ----------------
      localTime.innerHTML =
        "Welchen Datensatz müssen wir hier nehmen? ---- Uhrzeit umrechnen";

      // ---------- details für windberechnung -------------
      if (data.wind.speed < 4.5) {
        wind.innerHTML = "easy breasy";
      }
      if (data.wind.speed < 32) {
        wind.innerHTML = "windy";
      }
      if (data.wind.speed > 32) {
        wind.innerHTML = "stormy";
      }

      cloudiness.innerHTML = data.weather[0].description;
      pressure.innerHTML = data.main.pressure;
      humidity.innerHTML = data.main.humidity;
      sunrise.innerHTML = data.sys.sunrise + "---- Uhrzeit umrechnen";
      sunset.innerHTML = data.sys.sunrise + "---- Uhrzeit umrechnen";
      geoCoords.innerHTML = data.coord.lat + "," + data.coord.lon;

      console.log(data);
    });
});
