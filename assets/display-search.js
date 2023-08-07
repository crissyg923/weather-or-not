var cityName=document.getElementById('cityname');
var currentTemp=document.getElementById('temp');
var currentWind=document.getElementById('wind');
var currentHumidity=document.getElementById('humidity');
var weatherIcon=document.getElementById('weathericon');
var icon =document.getElementById('icon');


var APIKey = "5bb4a513963831304c84229f4658d043";
var getParameters = function (){
    var searchParameters=document.location.search.split('&');
    var query = searchParameters[0].split('=').pop();
    getAPI(query);
}

var printResults= function(data1) {
    console.log(data1);
    console.log(data1.city['name']);
    console.log(data1.list[0]);
    console.log(data1.list);
    
}

var printCurrentWeather= function(data2) {
    console.log(data2);
    console.log(data2.name);
    console.log(data2.main['temp']);
    cityName.innerHTML=data2.name;
    currentTemp.innerHTML="Current Temeperature: " + data2.main['temp'];
    currentWind.innerHTML="Current Wind: " + data2.wind['speed'] + " mph";
    currentHumidity.innerHTML="Current Humidity: " + data2.main['humidity'] + "%";
    console.log(data2.weather[0]['icon']);
    iconVariable = data2.weather[0]['icon'];
    iconLink = 'https://openweathermap.org/img/wn/' + iconVariable + '@2x.png';
    icon.setAttribute('src', iconLink);
    // weatherIcon.innerHTML= iconLink;
}

function getAPI(query) {
    var requestURL="http://api.openweathermap.org/geo/1.0/direct?q=" + query + ",US&limit=5&appid=5bb4a513963831304c84229f4658d043"; 
    fetch(requestURL)
    .then(function (response) {
      return response.json();
        
    })
    .then(function (data) {
        // console.log(data[0].lon);
        // console.log(data[0].lat);
        var latitude = data[0].lat;
        var longitude = data[0].lon;
        console.log(latitude);
        console.log(longitude);
        var currentConditionsUrl= "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
        var finalRequestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
        fetch(finalRequestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data1) {
                console.log(data1);
                printResults(data1);
            })
        fetch(currentConditionsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data2) {
                console.log(data2);
                printCurrentWeather(data2);
            })
        // Promise.all([currentConditionsUrl, finalRequestUrl])
        //     .then(([data1, data2]) => {
        //         console.log(data1, data2);
        //     }) 
        })
        
     
}
getParameters();