const URL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const IMAGE_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=`;

const formField = document.getElementById("form");
const movieNameField = document.getElementById("moviename");
const mainField = document.getElementById("main");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODNhYjM3Y2E3ZDkyM2NmMjE1YzNkMDNjZDMxZDQ4ZSIsIm5iZiI6MTcyNjI0Mjk4OC42NTg3MzcsInN1YiI6IjY2ZTQ1ZTg2MjgwNDhkOTJkZWY5OGFmZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.sl-k_Ulvp_ykqTvwakJa363xwYmIBzKz00hHoEFRQ-U",
  },
};

async function getTopRatedMovies(url) {
  mainField.innerHTML = "";
  const result = await fetch(url, options);
  const jsonResult = await result.json();
  console.log(jsonResult.results);
  jsonResult.results.forEach((movie) => {
    const vote = movie.vote_average;
    2;
    const eleDiv = document.createElement("div");
    eleDiv.className = "movie";
    eleDiv.innerHTML = `<img src=${IMAGE_PATH + movie.poster_path} alt=${
      movie.title
    } />
        <div class="movieinfo">
          <h3>${movie.title}</h3>
          <span class=${
            vote > 7 ? "green" : vote > 4 ? "orange" : "red"
          }>${Math.floor(movie.vote_average)}</span>
        </div>
        <div class="overview">
          <p class="movie-details">
            ${movie.overview}
          </p>
        </div>`;

    mainField.appendChild(eleDiv);
  });
}
getTopRatedMovies(URL);
formField.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchText = movieNameField.value;
  if (searchText && searchText != "")
    getTopRatedMovies(SEARCH_URL + searchText);
  else {
    window.location.reload();
  }
  searchText.value = "";
});
