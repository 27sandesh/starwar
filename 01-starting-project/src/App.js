import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  async function fetchMovieHandler() {
    setisLoading(true);
    seterror(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Smoething went wrong");
      }
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date, // fixed typo here
        };
      });
      setmovies(transformedMovies);
    } catch (error) {
      seterror(error.message);
    }
    setisLoading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length == 0 && !error && <p>no Movie Found</p>}
        {isLoading && <p>...LOADING</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
