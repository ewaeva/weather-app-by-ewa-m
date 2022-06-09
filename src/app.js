function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayList = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayList];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherDetails(response) {
  document.querySelector("#main-city").innerHTML = `📍 ${response.data.name}`;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function searchCity(city) {
  let apiKey = "b71a6f06d8ff88439fbb77a2643b6ff5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherDetails);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#main-city");
  let searchInput = document.querySelector("#search-input").value;
  city.innerHTML = `📍 ${searchInput}`;
  searchCity(searchInput);
}

function searchLocation(position) {
  let apiKey = "b71a6f06d8ff88439fbb77a2643b6ff5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherDetails);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let yourLocationButton = document.querySelector("#your-location-button");
yourLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Lisbon");
