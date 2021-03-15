var showHistory = [];
var currentWetherContainerEl = $("#current-weather-container");
var fiveDayForcastContainerEl = $("#five-day-focast-container");

// Add current day to p
var currentDay = moment().format("MMM Do YYYY");
    $("#current-day").text(currentDay);

// Click on submit button
$("#weather").click(function (event) {
  // prevent page from refreshing
  event.preventDefault();

  // Click save for localStorage
  var cityName = $("#city").val().trim();
  showHistory.push(cityName);
  // console.log(showHistory)
  localStorage.setItem("cities", JSON.stringify(showHistory));
  cityWeather(cityName);
});

// get from local storage
if (localStorage.getItem("cities")) {
  JSON.parse(localStorage.getItem("cities")).map((city) =>
    showHistory.push(city)
  );
  cityWeather(showHistory[showHistory.length - 1]);
}

// Call API for current weather
function cityWeather(cityName) {
  for (let i = 0; i < showHistory.length; i++) {
    var historyLi = $("<li>");
    historyLi.text(showHistory[i]);
    $("#show-history").append(historyLi);
  }
  // console.log(cityName);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=4eac509137831fda29e6f441e0ef2afe`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      //   console.log(response);
      //   var icon = response.weather
      $("#icon").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      $("#city-name").text(cityName);
      var wind = response.wind.speed;
      $("#wind-speed").text(wind);
      var temp = response.main.temp;
      $("#temp").text(temp);
      var humid = response.main.humidity;
      $("#humid").text(humid);
    });
}
// Call API for 5 day forcast
function futureWeather(cityName) {
  consol.log(cityName);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=1a70f58ef96d2a0e1cdc65e35763d464`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      $("#five-days").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
    });
}

// function ReSearch() {
//     document.getElementById("show-history").click();
//   }

// var reSearch = $("#show-history");
// reSearch.addEventListener('click', cityWeather)


// 5 day api key: 1a70f58ef96d2a0e1cdc65e35763d464
// api 5 day forcast: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// api current weather: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//  current api key: 4eac509137831fda29e6f441e0ef2afe
