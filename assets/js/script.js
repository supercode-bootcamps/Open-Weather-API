// api.openweathermap.org/data/2.5/weather?q=London,uk&appid=78c29c57fa1b0939a568dac3a843325c

fetch(
  "http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=78c29c57fa1b0939a568dac3a843325c",
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// const data = {};

// fetch(
//   "api.openweathermap.org/data/2.5/weather?q=London,uk&appid=78c29c57fa1b0939a568dac3a843325c"
// )
//   .then((response) => response.json())
//   .then((data) => console.log(data));
