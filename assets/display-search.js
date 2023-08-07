var cityName=document.getElementById('cityname');
var currentTemp=document.getElementById('temp');
var currentWind=document.getElementById('wind');
var currentHumidity=document.getElementById('humidity');
var weatherIcon=document.getElementById('weathericon');
var icon =document.getElementById('icon');
var dayOne=document.getElementById('day1');
var dayTwo=document.getElementById('day2');



var APIKey = "5bb4a513963831304c84229f4658d043";
// Function to grab contents of search 
var getParameters = function (){
    var searchParameters=document.location.search.split('&');
    var query = searchParameters[0].split('=').pop();
    getAPI(query);
}


var printCurrentWeather= function(data2) {
    // console.log(data2);
    // console.log(data2.name);
    // console.log(data2.main['temp']);
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

var printNoww = function(fiveDayArray) {
   console.log(fiveDayArray[3]);
   console.log(fiveDayArray[11]);
   console.log(fiveDayArray[19]);
   console.log(fiveDayArray[27]);
   console.log(fiveDayArray[35]);
   var day1=fiveDayArray[3];
   var day2=fiveDayArray[11];
   var day3=fiveDayArray[19];
   var day4=fiveDayArray[27];
   var day5=fiveDayArray[35];
   var displayContainer=document.createElement("div");
   displayContainer.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
   var displayDayOne=document.createElement("div");
   displayDayOne.classList.add('card-body', 'customcard');
   displayContainer.append(displayDayOne);
   var dayOneDate= day1.dt_txt.split(" ")[0];
   console.log(dayOneDate);
   dayOneFormattedDate = dayjs(dayOneDate).format('M/D/YYYY');
   console.log(dayOneFormattedDate);
   var dateDisplay=document.createElement("p");
   dateDisplay.textContent=dayOneFormattedDate;
   dayOne.appendChild(displayContainer);
   displayContainer.appendChild(dateDisplay);
   
}

var printFiveDay= function(data1) {
console.log(data1);
console.log(data1.list[2]);
var fiveDayArray=(data1.list);
printNoww(fiveDayArray);
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
        var fiveDayRequestUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + APIKey + "&units=imperial";
        fetch(fiveDayRequestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data1) {
                console.log(data1);
                printFiveDay(data1);
            })
        fetch(currentConditionsUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data2) {
                console.log(data2);
                printCurrentWeather(data2);
            })
        
        })
        
     
}
getParameters();