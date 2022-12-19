var searchLoc = $("#searchLocation");
var name = $("#name");
var date = $("#date");
var temp = $("#temp");
var wind = $("#windspeed");
var hum = $("#humidity");
var btn = $("#searchbtn");

var currentWeatherTitle = $(`#currentWeatherTitle`);
var currentTemp = $(`#currentTemperature`);
var currentHum = $(`#currentHum`);
var currentWind = $(`#currentWind`);



btn.on("click", apiGetter)
function apiGetter(event){
    event.preventDefault();
    var api = "https://api.openweathermap.org/data/2.5/weather?q=" + searchLoc.val() + "&appid=78e1806e46a60decb6a154f57a6b79ea&&units=imperial"
    console.log(api)
    fetch(api)
.then(function(response){
    
    return response.json();
})
.then(function(data){

    currentWeatherTitle.html(`${data.name} ${moment(data.dt, "X").format("(MM/DD/YYYY)")} <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`)
    currentTemp.html(`Temp: ${data.main.temp}F°`);
    currentHum.html(`Humidity: ${data.main.humidity}%`);
    currentWind.html(`Wind: ${data.wind.speed}mp/h`);
    console.log(data);
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=78e1806e46a60decb6a154f57a6b79ea&&units=imperial`;
    fetch(fiveDay)
    .then(function (response){
        return response.json();
    })
    .then(function(forecastData){
        console.log(forecastData)
    })
})
}
