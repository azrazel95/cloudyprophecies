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
    // var fiveDayTitle = [
    //     day0Title = $("#day0Title"),
    //     day1Title = $("#day1Title"),
    //     day2Title = $("#day2Title"),
    //     day3Title = $("#day3Title"),
    //     day4Title = $("#day4Title"),
    // ]
    // var fiveDayIcon = [
    //     day0Icon = $("#day0Icon"),
    //     day1Icon = $("#day1Icon"),
    //     day2Icon = $("#day2Icon"),
    //     day3Icon = $("#day3Icon"),
    //     day4Icon = $("#day4Icon"),
    // ]
    // var fiveDayTemps = [
    //     day0Temp = $("#day0Temperature"),
    //     day1Temp = $("#day1Temperature"),
    //     day2Temp = $("#day2Temperature"),
    //     day3Temp = $("#day3Temperature"),
    //     day4Temp = $("#day4Temperature"),
        
    // ]
    // var fiveDayHum = [
    //     day0Hum = $("#day0Humidity"),
    //     day1Hum = $("#day1Humidity"),
    //     day2Hum = $("#day2Humidity"),
    //     day3Hum = $("#day3Humidity"),
    //     day4Hum = $("#day4Humidity"),
       
    // ]
    // var fiveDayWind = [
    //     day0Wind = $("#day0WindSpeed"),
    //     day1Wind = $("#day1WindSpeed"),
    //     day2Wind = $("#day2WindSpeed"), 
    //     day3Wind = $("#day3WindSpeed"),
    //     day4Wind = $("#day4WindSpeed"),
    // ]
    // var fiveDayForecast = new array (fiveDayTitle, fiveDayIcon, fiveDayTemps, fiveDayHum, fiveDayWind);
    

    var day0 = new Array(
        day0Title = $("#day0Title"),
        day0Icon = $("#day0Icon"),
        day0Temp = $("#day0Temperature"),
        day0Hum = $("#day0Humidity"),
        day0Wind = $("#day0WindSpeed"),
    );
    var day1 = new Array(
        day1Title = $("#day1Title"),
        day1Icon = $("#day1Icon"),
        day1Temp = $("#day1Temperature"),
        day1Hum = $("#day1Humidity"),
        day1Wind = $("#day1WindSpeed"),
    );
    var day2 = new Array(
        day2Title = $("#day2Title"),
        day2Icon = $("#day2Icon"),
        day2Temp = $("#day2Temperature"),
        day2Hum = $("#day2Humidity"),
        day2Wind = $("#day2WindSpeed"), 
    );
    var day3 = new Array(
        day3Title = $("#day3Title"),
        day3Icon = $("#day3Icon"),
        day3Temp = $("#day3Temperature"),
        day3Hum = $("#day3Humidity"),
        day3Wind = $("#day3WindSpeed"),
    );
    var day4 = new Array(
        day4Title = $("#day4Title"),
        day4Icon = $("#day4Icon"),
        day4Temp = $("#day4Temperature"),
        day4Hum = $("#day4Humidity"),
        day4Wind = $("#day4WindSpeed"),
    );

    var fiveDayForecast = new Array(
        day0,
        day1,
        day2,
        day3,
        day4
    )
    
    fetch(fiveDay)
    .then(function (response){
        return response.json();
    })
    .then(function(forecastData){
        console.log(forecastData)
    })
    for(i=0; i<forecast.length; i++){
        
        // forecast[i].children[0].html(`${data.name}`)
    }
})
}
