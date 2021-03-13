var showHistory = [];
var currentWetherContainerEl = $("#current-weather-container");
var fiveDayForcastContainerEl = $("#five-day-focast-container");

// Click on submit button
$("#weather").click(function(event) {
    // prevent page from refreshing
    event.preventDefault();
    event.stopPropagation();
    
    var cityName = $("#city").val().trim();
        showHistory.push(cityName);
    // console.log(showHistory)
    cityWeather(cityName);
    localStorage.setItem("cities", JSON.stringify(showHistory));
});

// Call API for current weather
var cityWeather = function(city) {
    // console.log(city);
    fetch("https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${4eac509137831fda29e6f441e0ef2afe}")
        .then(function(response) {
            return response.JSON();
        })
            .then(function(response) {
                var currentWeather = currentWetherContainerEl;
                // Set elements 'src' attribute to the NEEDINFO from API response                currentWeather.setAttribute('src', response.data.NEEDINFO);
                // Append the current weather element to the page
                currentWetherContainerEl.appendChild(currentWeather);
            });
};

// Call API for 5 day forcast
var futureWeather = function(city) {
    // consol.log(city);
    fetch("https://api.openweathermap.org/data/2.5/forecast?q={cityName}&appid=${1a70f58ef96d2a0e1cdc65e35763d464}")
    .then(function(response) {
        return response.JSON();
    })
        .then(function(response) {
            var fiveDay = fiveDayForcastContainerEl;
            // Set elements 'src' attribute to the NEEDINFO from API response
            fiveDay.setAttribute('src', response.data.NEEDINFO);
            // Append future weather element to the page
            fiveDayForcastContainerEl.appendChild(fiveDay);
        });
;}

    



// 5 day api key: 1a70f58ef96d2a0e1cdc65e35763d464
// api 5 day forcast: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// api current weather: api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
//  current api key: 4eac509137831fda29e6f441e0ef2afe
        