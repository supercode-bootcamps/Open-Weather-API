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

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let city = document.querySelector("#searchField");
  city = city.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78c29c57fa1b0939a568dac3a843325c&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      // ---------- main Section ----------------
      cityName.innerHTML = data.name;
      mainIcon.innerHTML = "data.weather[0].icon + hier sollte ein Icon sein";
      temperature.innerHTML = `${data.main.temp}&#186 C`;

      // ---------- detail Section ----------------

      let convertTime = () => {
        let localDate = new Date();
        let utc = localDate.getTime() + localDate.getTimezoneOffset() * 60000;
        let showLocalTime = new Date(utc + 3600000 * (data.timezone / 3600));
        let localHours =
          showLocalTime.getHours() < 10
            ? "0" + showLocalTime.getHours()
            : showLocalTime.getHours();
        let localMins =
          showLocalTime.getMinutes() < 10
            ? "0" + showLocalTime.getMinutes()
            : showLocalTime.getMinutes();
        return `${localHours} : ${localMins}, ${showLocalTime.getDate()} ${
          monthNames[showLocalTime.getMonth()]
        } ${showLocalTime.getFullYear()}`;
      };
      localTime.innerHTML = convertTime();

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

      // ---------- convert sunrise/sunset into hour -------------

      let showSuntime = (milliseconds) => {
        let day, hour, minute, seconds;
        seconds = Math.floor(milliseconds / 1000);
        minute = Math.floor(seconds / 60);
        seconds = seconds % 60;
        hour = Math.floor(minute / 60);
        minute = minute % 60;
        day = Math.floor(hour / 24);
        hour = hour % 24;
        console.log();
        return `${hour}:${minute}`;
      };

      sunrise.innerHTML = showSuntime(data.sys.sunrise);
      sunset.innerHTML = showSuntime(data.sys.sunset);
      geoCoords.innerHTML = data.coord.lat + "," + data.coord.lon;

      console.log(data);
    });
});
