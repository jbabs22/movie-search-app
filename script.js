const getMovies = async () => {
  const movieLog = await axios.get(
    `http://www.omdbapi.com/?i=tt3896198&apikey=4c63d362`
  );
  console.log(movieLog);
};

getMovies();

const apiKey = "4c63d362";

const searchButton = document.getElementById("searchButton");
const input = document.getElementById("textInput");
const movieElement = document.getElementById("movie");

// Functions & Event Listeners - Search Input to Find Current Weather Data
searchButton.addEventListener("click", async () => {
  let searchInput = input.value;

  axios
    .get(`http://www.omdbapi.com/?t=${searchInput}&apikey=${apiKey}`)
    .then((searchResponse) => {
      console.log(searchResponse);

      const movieData = {
        title: searchResponse.data.Title,
        plot: searchResponse.data.Plot,
        poster: searchResponse.data.Poster,
      };

      movieElement.innerHTML = `
            <p>Title: ${movieData.title}</p>
            <p>Plot: ${movieData.plot}</p>
            <p><img src = ${movieData.poster}></p>`;
    });
});
