var searchButton = $('.searchbutton');
var searchValue = $('.search-bar').val();

function handleSearch(event) {
    event.preventDefault();
    if (!searchvalue) {
        console.error ('Please type your city in the search bar!');
        return;
    }
    var queryString = './search-results.html?q=' + searchValue;
    location.assign(queryString);

}
searchButton.on('submit', handleSearch);
