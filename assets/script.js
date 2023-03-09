var searchLoc = $("#searchLocation");
// console.log(searchLoc.val());
// let searchItem = searchLoc.val();
// console.log(searchItem)
var name = $("#name");
var date = $("#date");
var temp = $("#temp");
var wind = $("#windspeed");
var hum = $("#humidity");
var btn = $("#searchbtn");
var recentSearchList = $("#recentSearchList")
var currentWeatherTitle = $(`#currentWeatherTitle`);
var currentTemp = $(`#currentTemperature`);
var currentHum = $(`#currentHum`);
var currentWind = $(`#currentWind`);
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

var fiveDaycards = new Array(
    day0,
    day1,
    day2,
    day3,
    day4
)
var search = [];
function getLocalStorage(){
    
// ...
if (localStorage.getItem('search') !== null) {
    search = JSON.parse(localStorage.getItem('search'));
} else {
    localStorage.setItem("search", JSON.stringify(search));
}
}


function renderRecentSearch(){
    recentSearchList.empty()
    getLocalStorage()
    
    for (let i = 0; i<search.length; i++){
        
        
        var recentSearch = search[i];
        var li = document.createElement("li");
        li.textContent = recentSearch;
        li.setAttribute("class", "list-group-item"+" pt-1"+" pl-2"+" bg-danger"+" ml-2"+" data-location"+i);
        li.id = "search" + [i]
        recentSearchList.prepend(li)
        li.addEventListener("click",function(event){
            
                var searchLoc = li.textContent
                apiGetter();
            
        })
        
    }
}


btn.on("click", apiGetter)
function apiGetter(event){
    event.preventDefault();
    let city = searchLoc.val()

    function storeSearch(){
        if(!search.some(item=> item.toLowerCase() === city.toLowerCase())){
            search.push(city)
            searchLoc.val("")
            localStorage.setItem("search", JSON.stringify(search));
        }
    
    }
    var api = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=78e1806e46a60decb6a154f57a6b79ea&&units=imperial"
    fetch(api)
.then(function(response){
    return response.json();
})
.then(function(data){

    currentWeatherTitle.html(`${data.name} ${moment(data.dt, "X").format("(MM/DD/YYYY)")} <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`)
    currentTemp.html(`Temp: ${data.main.temp}F°`);
    currentHum.html(`Humidity: ${data.main.humidity}%`);
    currentWind.html(`Wind: ${data.wind.speed}mp/h`);
    var lon = data.coord.lon;
    var lat = data.coord.lat;
    var fiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=78e1806e46a60decb6a154f57a6b79ea&&units=imperial`;
    fetch(fiveDay)
    .then(function (response){
        return response.json();
    })
    .then(function(forecastData){
        var dailyList = new Array(
            first = $(forecastData.list[5]),
            second = $(forecastData.list[13]),
            third = $(forecastData.list[21]),
            fourth = $(forecastData.list[29]),
            fifth = $(forecastData.list[37]),
        )
        for(var i=0; i<fiveDaycards.length; i++){
            fiveDaycards[i][0].html(`${forecastData.city.name}${moment(dailyList[i][0].dt, "X").format("(MM/DD/YYYY)")}`);
            fiveDaycards[i][1].html(`<img src="http://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}@2x.png">`);
            fiveDaycards[i][2].html(`Temp: ${dailyList[i][0].main.temp}F°`)
            fiveDaycards[i][3].html(`Humidity: ${dailyList[i][0].main.humidity}%`)
            fiveDaycards[i][4].html(`Wind: ${dailyList[i][0].wind.speed}mp/h`)
        }
    })
    
})
storeSearch();
renderRecentSearch()
}
getLocalStorage();
renderRecentSearch();
