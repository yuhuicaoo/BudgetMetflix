// API : https://www.omdbapi.com/?i=tt3896198&apikey=acf6e413&s=fast

const moviesWrapper = document.querySelector('.movies')
moviesWrapper.classList += ' movies__loading'

let movies

async function renderMovies(id, filter) {
    const moviesWrapper = document.querySelector('.movies')

    if (!movies) {
        movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=acf6e413&s=fast`)
    }
    else {
        movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=acf6e413&s=${id}`)
    }

    const moviesData = await movies.json()
    
    moviesWrapper.classList.remove('movies__loading')
    
    const moviesList = moviesData.Search.slice(0,6)

    // Attempted to create a filter by release date , does not work for future movie searches.
    if (filter === 'NEW_TO_OLD') {
        moviesList.sort((a,b) => b.Year - a.Year)
    }
    else if (filter === 'OLD_TO_NEW') {
        moviesList.sort((a,b) => a.Year - b.Year)
    }
    
    moviesWrapper.innerHTML = moviesList.map((movie) => movieHTML(movie)).join("")
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

function onSearchChange(event) {
    searchResult(event.target.value)
    loadingBetweenSearch()
    setTimeout(() => {
        renderMovies(event.target.value)
    }, 1000);
}

function loadingBetweenSearch() {
    const divElement = document.querySelectorAll('.movie')
    divElement.forEach(element => element.remove())
    moviesWrapper.classList += ' movies__loading'
    moviesWrapper.innerHTML = '<i class="fas fa-spinner movies__loading--spinner"></i>'
}

function searchResult(search) {
    const searchResult = document.querySelector('.searchResult')
    return searchResult.innerHTML = `<h2 class="searchInfo">Search results for: "<span class="red">${search}</span>"</h2>`
}

function filterMovies(event) {
    main(event.target.value)
}

setTimeout(() => {
    renderMovies()
},1000)
    
