let allPages = 0;
let moviesContent = document.getElementById("moviesContent");
let pageNumber = 1;
let genreId = 0;
let imageURL = 'https://image.tmdb.org/t/p/w500';
let urlNewMySearch = "https://api.themoviedb.org/3/search/movie?api_key=7eec509bd6dc2765dba60712f696e805&language=en-US&query=";
let url="";
//ce4ac985483c6650076963dde9266903
let allGenresNames = [];

AddGenres();
ShowMovies(pageNumber);

async function ShowMovies(page, genre = 0, tempUrl="", numberSearch=0) {
    if (genre == 0) {
        if(numberSearch==0) {
            url = "https://api.themoviedb.org/3/movie/popular?api_key=7eec509bd6dc2765dba60712f696e805&language=en-US&page=" + page;
        }
        else{
            url=tempUrl+page;
        }
        let response = await fetch(url);
        let commits = await response.json();
        console.log("RESPONSE", commits);
        allPages = commits.total_pages;
        let movies = commits.results;

        for (let movie of movies) {
            let movieCard = document.createElement("div");
            movieCard.className = "card";
            movieCard.style = "width: 10rem;";
            let imageCard = document.createElement("img");
            imageCard.className = "card-img-top";
            imageCard.src = imageURL + movie.poster_path;
            movieCard.title = movie.title;
            let nameMovie = document.createElement("p");
            nameMovie.className = "card-text";
            nameMovie.textContent = movie.title;

            let modal = document.getElementById("myModal");
            let span = document.getElementsByClassName("close")[0];
            let nameMovieModal = document.getElementById("nameMovie");
            let votesMovie = document.getElementById("votesMovie");
            let overview = document.getElementById("overview");
            let releaseDate = document.getElementById("releaseDate");
            let largeImage = document.getElementById("imageLarge");
            let genresNames = document.getElementById("genresNames");

            movieCard.onclick = () => {
                nameMovieModal.textContent = movie.title;
                votesMovie.textContent = "Rate: " + movie.vote_average;
                overview.textContent = movie.overview;
                releaseDate.textContent = "Release Date: " + movie.release_date;
                let posterLarge = imageURL + movie.poster_path;
                largeImage.src = posterLarge;
                let genres = movie.genre_ids;
                let genresNamesArr = [];

                for (i = 0; i < genres.length; i++) {
                    for (let g of allGenresNames)
                        if (genres[i] == g.id)
                            genresNamesArr.push(g.name)
                }
                genresNames.textContent = genresNamesArr;
                modal.style.display = "block";
            }
            span.onclick = function () {
                modal.style.display = "none";
            }

            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            movieCard.appendChild(imageCard);
            movieCard.appendChild(nameMovie);
            moviesContent.appendChild(movieCard);
        }
        await createPages();
    }

    else {
    if(numberSearch===0) {
        url = 'https://api.themoviedb.org/3/discover/movie?api_key=7eec509bd6dc2765dba60712f696e805&language=en-US&sort_by=original_title.asc&include_adult=false&include_video=false&page=' + page + '&with_genres=' + genre;
    }
    else{
        url=tempUrl+page;
    }
        let response = await fetch(url);
        let commits = await response.json();
        console.log("RESPONSE", commits);
        allPages = commits.total_pages;
        let movies = commits.results;

        for (let movie of movies) {
            let movieCard = document.createElement("div");
            movieCard.className = "card";
            movieCard.style = "width: 10rem;";
            let imageCard = document.createElement("img");
            imageCard.className = "card-img-top";
            imageCard.src = imageURL + movie.poster_path;
            movieCard.title = movie.title;
            let nameMovie = document.createElement("p");
            nameMovie.className = "card-text";
            nameMovie.textContent = movie.title;

            let modal = document.getElementById("myModal");
            let span = document.getElementsByClassName("close")[0];
            let nameMovieModal = document.getElementById("nameMovie");
            let votesMovie = document.getElementById("votesMovie");
            let overview = document.getElementById("overview");
            let releaseDate = document.getElementById("releaseDate");
            let largeImage = document.getElementById("imageLarge");
            let genresNames = document.getElementById("genresNames");

            movieCard.onclick = () => {
                nameMovieModal.textContent = movie.title;
                votesMovie.textContent = "Rate: " + movie.vote_average;
                overview.textContent = movie.overview;
                releaseDate.textContent = "Release Date: " + movie.release_date;
                let posterLarge = imageURL + movie.poster_path;
                largeImage.src = posterLarge;
                let genres = movie.genre_ids;
                let genresNamesArr = [];
                for (i = 0; i < genres.length; i++) {
                    for (let g of allGenresNames)
                        if (genres[i] == g.id)
                            genresNamesArr.push(g.name)
                }
                genresNames.textContent = genresNamesArr;
                modal.style.display = "block";
            }
            span.onclick = function () {
                modal.style.display = "none";
            }
            window.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
            movieCard.appendChild(imageCard);
            movieCard.appendChild(nameMovie);
            moviesContent.appendChild(movieCard);
        }
        await createPages();
    }
}

function createPages() {

    let pages = allPages;

    for (i = 1; i <= pages; i++) {

        if (pages <= 5)
            AddButton(i);

        else {
            if (pageNumber < 4) {
                if (i == pages)
                    AddButton(i);
                else if (i == 5)
                    AddLabel(i);
                else if (i < 5)
                    AddButton(i);
            }

            else if (pageNumber > 2 && pageNumber < pages - 2) {
                if (i < 3)
                    AddButton(i);
                else if ((i == 3 && i != pageNumber - 1) || i == pages - 1)
                    AddLabel(i);
                else if (i > 3 && (i <= pageNumber + 1 && i >= pageNumber - 1) || (i == 3 && i == pageNumber - 1))
                    AddButton(i);
                else if (i == pages)
                    AddButton(i);
            }

            else if (pageNumber >= (pages - 2)) {
                if (i < 3)
                    AddButton(i);
                else if (i == 3)
                    AddLabel(i);
                else if (i <= pageNumber + 2 && i >= pageNumber - 1)
                    AddButton(i);
            }
        }
    }
}

function AddButton(number) {

    let btn = document.createElement('button');
    btn.value = number;
    btn.textContent = `${number}`
    btn.onclick = clickOnPage;
    document.getElementById("pages").appendChild(btn);
}

function AddLabel() {
    let label = document.createElement("label");
    label.textContent = " . . . ";
    document.getElementById("pages").appendChild(label);
}

function clickOnPage() {
    let pages = document.getElementById("pages");
    pages.innerHTML = "";
    moviesContent.innerHTML = "";
    pageNumber = +this.textContent; 
    if (searchInput.value) {        
        urlNewMySearch += searchInput.value + "&page="
        ShowMovies(pageNumber, 0, urlNewMySearch, 1);
    }
    else{
        ShowMovies(pageNumber);  
    }
}

async function AddGenres() {

    let url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=7eec509bd6dc2765dba60712f696e805&language=en-US';
    let response = await fetch(url);
    let commits = await response.json();
    console.log("RESPONSE", commits);
    let allGenres = commits.genres;
    allGenresNames = allGenres;
    let ul = document.createElement('ul');
    document.getElementById('genresList').appendChild(ul);

    for (let genre of allGenres) {
        let li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.onclick = ClickOnList;
        ul.appendChild(li);
        li.setAttribute('gId', genre.id);
        li.innerHTML = li.innerHTML + genre.name;
    }
}

async function ClickOnList() {
    let genre = this.getAttribute('gId');
    genreId = genre;
    let pages = document.getElementById("pages");
    pages.innerHTML = "";
    moviesContent.innerHTML = "";
    pageNumber = 1;
    await ShowMovies(pageNumber, genre);
}


////////////////////////////////
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
        let pages = document.getElementById("pages");
        pages.innerHTML = "";
        moviesContent.innerHTML = "";
        pageNumber = +this.textContent; 
        ShowMovies(1, 0, urlMySearch, 1);
    }
    else
        searchInput.setAttribute("placeholder", "enter data");
}