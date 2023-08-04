var searchForm = document.querySelector('.searchform');
// var searchValue = document.querySelector('.search-bar');

function handleSearch(event) {
    event.preventDefault();
    var searchValue=document.querySelector('.search-bar').value;
    if (!searchValue) {
        console.error ('Please type your city in the search bar!');
        return;
    }
    var queryString = './search-results.html';

    location.assign(queryString);

}
searchForm.addEventListener('submit', handleSearch);
