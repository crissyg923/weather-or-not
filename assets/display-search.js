var APIKey = "5bb4a513963831304c84229f4658d043";

function getAPI() {
    var requestURL="http://api.openweathermap.org/geo/1.0/direct?q=orange,nj,US&limit=5&appid=5bb4a513963831304c84229f4658d043"; 
    fetch(requestURL)
    .then(function (response) {
      return response.json();
        
    })
    .then(function (response) {
        console.log(response);
        
        
        })
     
}
getAPI();