const apiKey = "4c63d362";

// Event Listener for Submit
const form = document.querySelector("form");
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevents the default behavior (page refresh)
  const movieName = document.getElementById("movieName").value;
  await searchMovies(movieName);
});

// Retrieve Movies Found by Searched Input
async function searchMovies(movieName) {
  const apiUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;
  const response = await axios.get(apiUrl);
  const results = response.data.Search;
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  // TO DO - add error if values are not found

  // search results - anchor tag created for each movie title & poster
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
