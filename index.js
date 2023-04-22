// API : https://www.omdbapi.com/?i=tt3896198&apikey=acf6e413&s=fast

const moviesWrapper = document.querySelector('.movies')
moviesWrapper.classList += ' movies__loading'

//  let default id to be 'fast'
let id = 'fast'



async function renderMovies(filter) {

    const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=acf6e413&s=${id}`)
    const moviesData = await movies.json()
    
    moviesWrapper.classList.remove('movies__loading')
    
    const moviesList = moviesData.Search.slice(0,6)


    if (filter === 'NEW_TO_OLD') {
        moviesList.sort((a,b) => b.Year - a.Year)
    }
    else if (filter === 'OLD_TO_NEW') {
        moviesList.sort((a,b) => a.Year - b.Year)
    }

    moviesWrapper.innerHTML = moviesList.map((movie) => movieHTML(movie)).join("")
}

// Fitler Movies

function filterMovies(event) {
    renderMovies(event.target.value)
}


// Convert object to HTML 

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

// ON SEARCH CHANGES 

function onSearchChange(event) {
    id = event.target.value
    searchResult(id)
    loadingBetweenSearch()
    setTimeout(() => {
        renderMovies()
    }, 1000);
}

function loadingBetweenSearch() {
    const movieEl = document.querySelectorAll('.movie')
    movieEl.forEach(element => element.remove())
    moviesWrapper.classList += ' movies__loading'
    moviesWrapper.innerHTML = '<i class="fas fa-spinner movies__loading--spinner"></i>'
}

function searchResult(search) {
    const searchResult = document.querySelector('.searchResult')
    return searchResult.innerHTML = `<h2 class="searchInfo">Search results for: "<span class="red">${search}</span>"</h2>`
}

//  INTIAL LOAD IN LOADING STATE 

setTimeout(() => {
    renderMovies()
},1000)
 
