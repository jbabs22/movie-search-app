const apiKey = "4c63d362";

// Event Listener for Submit
const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the default behavior (page refresh)
  const movieName = document.getElementById("movieName").value;
  await searchMovies(movieName);
});

// Search Movie Name to find 1 to many results
async function searchMovies(movieName) {
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;
  const response = await axios.get(apiUrl);
  const results = response.data.Search;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  // Error Handler for Error Message/No results found
  if (!results || response.data.Error) {
    const errorMessage = document.createElement("p");
    errorMessage.classList.add("error-message");
    errorMessage.textContent = "No results found. Please try a new search.";
    resultsContainer.appendChild(errorMessage);
    return;
  }

  // searchMovies results - Anchor tags for each movie with Title & Poster
  for (const movie of results) {
    const movieLink = document.createElement("a");
    movieLink.href = "#";
    movieLink.textContent = movie.Title;

    const moviePoster = document.createElement("img");
    moviePoster.src = movie.Poster;
    moviePoster.alt = `${movie.Title} Poster`;
    moviePoster.classList.add("movie-poster");

    const movieItem = document.createElement("div");
    movieItem.classList.add("movie-item");
    movieItem.appendChild(moviePoster);
    movieItem.appendChild(movieLink);
    resultsContainer.appendChild(movieItem);

    // event listener for clicking movie
    movieItem.addEventListener("click", (event) => {
      event.preventDefault();
      showMovieDetails(movie.imdbID);
    });
  }
}
// function that opens a new tab with JSON
// Takes a movie ID as argument, constructs the API URL using the movie id, and opens the URL in a new browser
function showMovieDetails(movieId) {
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&i=${movieId}`;
  window.open(apiUrl, "_blank");
}
