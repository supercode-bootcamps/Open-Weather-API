// api.openweathermap.org/data/2.5/weather?q=London,uk&appid=78c29c57fa1b0939a568dac3a843325c

let form = document.querySelector("form");

const cityName = document.querySelector("#cityName");
const temperature = document.querySelector("#temperature");

const localTime = document.querySelector("#localTime .value");
const wind = document.querySelector("#wind .value");
const cloudiness = document.querySelector("#cloudiness .value");
const pressure = document.querySelector("#pressure .value");
const humidity = document.querySelector("#humidity .value");
const sunrise = document.querySelector("#sunrise .value");
const sunset = document.querySelector("#sunset .value");
const geoCoords = document.querySelector("#geoCoords .value");

let lottie = document.querySelector("#lottie-container");

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
      cityName.innerHTML = data.name + ", " + data.sys.country;
      temperature.innerHTML = `${data.main.temp}&#186 C`;

      // -------------- lottie animation ----------------

      if (data.weather[0].description === "clear sky")
        lottie.innerHTML = `<lottie-player src="https://assets3.lottiefiles.com/packages/lf20_rONq3c.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      else if (
        data.weather[0].description === "few clouds" ||
        data.weather[0].description === "overcast clouds"
      )
        lottie.innerHTML = `<lottie-player src="https://assets3.lottiefiles.com/packages/lf20_WlYhMW.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      else if (
        data.weather[0].description === "scattered clouds" ||
        data.weather[0].description === "broken clouds"
      )
        lottie.innerHTML = `<lottie-player src="https://assets10.lottiefiles.com/packages/lf20_VpIYY7.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      else if (data.weather[0].description === "shower rain")
        lottie.innerHTML = `<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_EIoBeQ.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      else if (data.weather[0].description === "rain")
        lottie.innerHTML = `<lottie-player src="https://assets4.lottiefiles.com/packages/lf20_h86M0Q.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      else if (data.weather[0].description === "thunderstorm")
        lottie.innerHTML = `<<lottie-player src="https://assets8.lottiefiles.com/packages/lf20_x0zXoH.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      else if (data.weather[0].description === "snow")
        lottie.innerHTML = `<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_QCNwCF.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      else if (data.weather[0].description === "mist")
        lottie.innerHTML = `<lottie-player src="https://assets5.lottiefiles.com/packages/lf20_RjBGHq.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      else {
        lottie.innerHTML = `<lottie-player src="https://assets3.lottiefiles.com/packages/lf20_rONq3c.json"  background="transparent"  speed="1"  style="width: 300px; height: 300px;"  loop  autoplay></lottie-player>`;
      }

      // ---------- Time zone converter ----------------

      let convertTime = () => {
        let localDate = new Date();
        let utc = localDate.getTime() + localDate.getTimezoneOffset() * 60000;
        let showLocalTime = new Date(utc + data.timezone * 1000);
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

      // ---------- Wind speed -------------

      if (data.wind.speed < 4.5) {
        wind.innerHTML = "Easy breasy";
      }
      if (data.wind.speed < 32) {
        wind.innerHTML = "Windy";
      }
      if (data.wind.speed > 32) {
        wind.innerHTML = "Stormy";
      }

      // ---------- Weather description, pressure and humidity -------------

      let description =
        data.weather[0].description.charAt(0).toUpperCase() +
        data.weather[0].description.slice(1);

      cloudiness.innerHTML = description;
      pressure.innerHTML = `${data.main.pressure} hPa`;
      humidity.innerHTML = `${data.main.humidity}%`;

      // ---------- convert sunrise/sunset into hour including time zone -------------

      let getSunrise = () => {
        let sunriseTime = data.sys.sunrise;
        let sunriseDate = new Date(sunriseTime * 1000 + 1000 * data.timezone);
        let sunriseHour =
          sunriseDate.getUTCHours() < 10
            ? "0" + sunriseDate.getUTCHours()
            : sunriseDate.getUTCHours();
        let sunriseMin =
          sunriseDate.getMinutes() < 10
            ? "0" + sunriseDate.getMinutes()
            : sunriseDate.getMinutes();
        return `${sunriseHour}:${sunriseMin}`;
      };

      let getSunset = () => {
        let sunsetTime = data.sys.sunset;
        let sunsetDate = new Date(sunsetTime * 1000 + 1000 * data.timezone);
        let sunsetHour =
          sunsetDate.getUTCHours() < 10
            ? "0" + sunsetDate.getUTCHours()
            : sunsetDate.getUTCHours();
        let sunsetMin =
          sunsetDate.getMinutes() < 10
            ? "0" + sunsetDate.getMinutes()
            : sunsetDate.getMinutes();
        return `${sunsetHour}:${sunsetMin}`;
      };

      sunrise.innerHTML = getSunrise();
      sunset.innerHTML = getSunset();
      geoCoords.innerHTML = data.coord.lat + ", " + data.coord.lon;
    });
});
