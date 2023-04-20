// API : https://www.omdbapi.com/?i=tt3896198&apikey=acf6e413&

function onSearchChange(event) {
    searchResult(event.target.value)
    renderMovies(event.target.value)
}

async function renderMovies(id) {
    const movieListEl = document.querySelector('.movies')

    movieListEl.classList += ' movies__loading'
    
    const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=acf6e413&s=${id}`)
    const moviesData = await movies.json()
    movieListEl.classList.remove('movies__loading')

    const movieList = moviesData.Search


    // can remove the slice if you want to see more than first 6 movies 
    movieListEl.innerHTML = movieList.map((movie) => movieHTML(movie)).slice(0,6).join("")
}


function movieHTML(movie) {
    return `
    <div class="movie">
        <figure class="movie__img--wrapper">
            <img src="${movie.Poster}" class="movie__img" alt="">
        </figure>
        <div class="movie__text-wrapper">
            <div class="movie__title">
                ${movie.Title}
            </div>
            <div class="movie__year">
                Release year: ${movie.Year}
            </div>
        </div>
    </div>`
}

function searchResult(search) {
    const searchResult = document.querySelector('.searchResult')
    return searchResult.innerHTML = `<h2 class="searchInfo">Search results for: "<span class="red">${search}</span>"</h2>`
}

function filterMovies(event) {
    console.log(event.target.value)
    renderMovies
}