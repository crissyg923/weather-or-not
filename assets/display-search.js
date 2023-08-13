// Global variables referencing HTML DOM Elements
var cityName=document.getElementById('cityname');
var currentTemp=document.getElementById('temp');
var currentWind=document.getElementById('wind');
var currentHumidity=document.getElementById('humidity');
var weatherIcon=document.getElementById('weathericon');
var icon =document.getElementById('icon');
var dayOne=document.getElementById('day1');
var dayTwo=document.getElementById('day2');
var cardHolderEl=document.querySelector('.cardholder');
// var citySearchBar = document.querySelector('#citysearchbar');
var newCitySearch = document.querySelector('#citysearchform');

var newSearchHistoryArray=[];

// Function to save search results to local storage
var getLocal = function() {
    
    var searchHistoryEl=document.getElementById('searchhistorylist');
    searchHistoryEl.textContent="";
    

    var searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    for (var i=0; i<searchHistory.length; i++) {
        var historyButton=document.createElement('a');
        historyButton.innerHTML=searchHistory[i] + "<br>";
        historyButton.setAttribute('href', 'file:///Users/cbricks/bootcamp/practice/weather-or-not/search-results.html?q=' + searchHistory[i]);
        searchHistoryEl.appendChild(historyButton);
    
    }
}

var getNewLocal=function (){
 var searchHistory2 = JSON.parse(localStorage.getItem('newSearchHistory'));
 var searchHistoryEl=document.getElementById('searchhistorylist');
 if(!searchHistory2){
    console.log('No Search History Found');
 }
 else {
    for (var i=0; i<searchHistory2.length; i++) {
        var historyButton=document.createElement('a');
        historyButton.innerHTML=searchHistory2[i] + "<br>";
        historyButton.setAttribute('href', 'file:///Users/cbricks/bootcamp/practice/weather-or-not/search-results.html?q=' + searchHistory2[i]);
        searchHistoryEl.appendChild(historyButton);
    
    }
}
   
}  
    



var saveLocal = function (citySearchBar) {
    // var searchHistoryEl=document.getElementById('searchhistorylist');
    
    newSearchHistoryArray.push(citySearchBar);

    localStorage.setItem('newSearchHistory', JSON.stringify(newSearchHistoryArray));

    // for (var i=0; i<newSearchHistoryArray.length; i++) {
    //     var historyButton=document.createElement('a');
    //     historyButton.innerHTML=newSearchHistoryArray[i] + "<br>";
    //     historyButton.setAttribute('href', 'file:///Users/cbricks/bootcamp/practice/weather-or-not/search-results.html?q=' + newSearchHistoryArray[i]);
    //     searchHistoryEl.appendChild(historyButton);
    
    // }
//     if(localStorage.getItem('newSearchHistory')) {
//         newSearchHistory= JSON.parse(localStorage.getItem('newSearchHistory'));
//         newSearchHistory.push(citySearchBar);
//         // localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
// }


// JSON.parse(localStorage.getItem(newSearchHistory));
}

// Variable to hold API Key
var APIKey = "5bb4a513963831304c84229f4658d043";

// Function to grab contents of search 
var getParameters = function (){
    // retrieveLocal();
    var searchParameters=document.location.search.split('&');
    var query = searchParameters[0].split('=').pop();
    getAPI(query);
    getLocal(query);
}
var getNewParameters= function(event) {
    event.preventDefault();
    console.log('inside get new parameters');
    var citySearchBar = document.querySelector('#citysearchbar').value;
    console.log(citySearchBar);
    getAPI(citySearchBar);
    saveLocal(citySearchBar);
}

// Function to print current weather conditions
var printCurrentWeather= function(data2) {
    
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
 

// Function to filter returned API array and render info on page into cards
var filterList = function(fiveDayArray) {
cardHolderEl.textContent="";
for (var i=0; i<fiveDayArray.length;i+=8) {
    console.log(fiveDayArray[i]);
    var fiveDayCards = document.createElement('div');
    var weatherIconEl = document.createElement('img');
    var temperatureEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl= document.createElement('p');
    var dateEl=document.createElement('p');
    var futureWeatherIcon = fiveDayArray[i].weather[0]['icon'];
    var futureWeatherIconLink = 'https://openweathermap.org/img/wn/' + futureWeatherIcon + '@2x.png';
    weatherIconEl.setAttribute('src', futureWeatherIconLink);
    var date= dayjs(fiveDayArray[i]['dt_txt'].split(" ")[0]).format('M/D/YY');
    
    dateEl.innerHTML= date;
    var temperature = fiveDayArray[i].main['temp'];
    var windConditions = fiveDayArray[i].wind['speed'];
    var humidityConditions= fiveDayArray[i].main['humidity'];
    temperatureEl.innerHTML = temperature + "°F";
    windEl.innerHTML = windConditions + " mph";
    humidityEl.innerHTML = humidityConditions + "%";
    fiveDayCards.classList.add('fivedaycard');
    fiveDayCards.appendChild(dateEl);
    fiveDayCards.appendChild(weatherIconEl)
    fiveDayCards.appendChild(temperatureEl);
    fiveDayCards.appendChild(windEl);
    fiveDayCards.appendChild(humidityEl);

    // var date= fiveDayArray[i]['dt_txt'].split(" ")[0];
    // console.log(date);
    // fiveDayCards.appendChild(date);

    cardHolderEl.appendChild(fiveDayCards);
   
}
}

// Function to print data to console

var printFiveDay= function(data1) {
console.log(data1);
console.log(data1.list[2]);
var fiveDayArray=(data1.list);
filterList(fiveDayArray);
}

// Function to request API as a result of user's search input
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

newCitySearch.addEventListener('submit', getNewParameters);
getParameters();
getNewLocal();