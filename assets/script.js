var searchForm = document.querySelector('.searchform');

// Function that handles searches from landing page and saves search to local storage
function handleSearch(event) {
    event.preventDefault();
    var searchHistory=[];
    var searchValue=document.querySelector('.search-bar').value;
    if (!searchValue) {
        console.error ('Please type your city & state in the search bar in the proper format!');
        return;
    }
    var queryString = './search-results.html?q=' + searchValue;
    if (!localStorage.getItem('searchHistory')) {
        searchHistory.push(searchValue);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
    else if(localStorage.getItem('searchHistory')) {
        searchHistory= JSON.parse(localStorage.getItem('searchHistory'));
        searchHistory.push(searchValue);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    location.assign(queryString);

}
searchForm.addEventListener('submit', handleSearch);
