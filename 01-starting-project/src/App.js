import React, { useEffect, useState, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setmovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState(null);

  const fetchMovieHandler = useCallback(async () => {
    setisLoading(true);
    seterror(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Smoething went wrong Retrying...");
      }
      const data = await response.json();

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
  }, []);
  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

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
