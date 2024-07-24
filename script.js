document.addEventListener("DOMContentLoaded", function() {
  const movieList = document.getElementById('movie-list');
  const sortSelect = document.getElementById('sort');
  const filterYearInput = document.getElementById('filter-year');

  // Fetch movies from db.json
  async function fetchMovies() {
    const response = await fetch('https://server-app-std6.onrender.com/movies');
    const movies = await response.json();
    return movies;
  }

  // Rendering all movies from api
  function renderMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.className = 'movie';
      movieElement.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}">
        <div class="movie-info">
          <h2>${movie.title}</h2>
          <p>Release Year: ${movie.releaseYear}</p>
          <p>IMDb Rating: ${movie.imdbRating}</p>
        </div>
      `;
      movieList.appendChild(movieElement);
    });
  }

  // Sorting feature for movies
  function sortMovies(movies, order) {
    return movies.sort((a, b) => {
      if (order === 'asc') {
        return a.imdbRating - b.imdbRating;
      } else {
        return b.imdbRating - a.imdbRating;
      }
    });
  }

  // Filter movies by release year
  function filterMovies(movies, year) {
    return movies.filter(movie => movie.releaseYear > year);
  }

  // Fetch and render movies initially

    fetchMovies().then(movies => {
        renderMovies(movies);

        //sorting
        sortSelect.addEventListener('change', (event) => {
            const sortedMovies = sortMovies([...movies], event.target.value);
            renderMovies(sortedMovies);
        })

        //filter and show
        filterYearInput.addEventListener('input', (event) => {
            const filteredMovies = filterMovies([...movies],event.target.value);
            renderMovies(filteredMovies);
        })
    })
});
