let searchBlock = document.getElementById("searchBlock");

searchBlock.onsubmit = function () {
    event.preventDefault();
    searchMyFilm();   
}

let searchInput = document.getElementById("searchInput");

function searchMyFilm() {   
    let urlMySearch = "https://api.themoviedb.org/3/search/movie?api_key=ce4ac985483c6650076963dde9266903&language=en-US&query=";
    if (searchInput.value) {
        urlMySearch += searchInput.value + "&page="
        ShowMovies(1, 0, urlMySearch, 1);
    }
    else
        searchInput.setAttribute("placeholder", "enter data");
}