// api.openweathermap.org/data/2.5/weather?q=London,uk&appid=78c29c57fa1b0939a568dac3a843325c

fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=78c29c57fa1b0939a568dac3a843325c"
)
  .then((response) => response.json())
  .then((data) => console.log(data));
