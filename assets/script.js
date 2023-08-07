var searchForm = document.querySelector('.searchform');
// var searchValue = document.querySelector('.search-bar');

function handleSearch(event) {
    event.preventDefault();
    var searchValue=document.querySelector('.search-bar').value;
    if (!searchValue) {
        console.error ('Please type your city & state in the search bar in the proper format!');
        return;
    }
    var queryString = './search-results.html?q=' + searchValue;

    location.assign(queryString);

}
searchForm.addEventListener('submit', handleSearch);
