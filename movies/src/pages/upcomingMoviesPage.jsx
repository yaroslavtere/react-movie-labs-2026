
import React, { useState, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";

const UpcomingMoviesPage = () => {
  const [movies, setMovies] = useState([]);

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );

    setMovies(updatedMovies);

    const newFavorites = updatedMovies.filter((m) => m.favorite);
    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    const mergedFavorites = [
      ...savedFavorites.filter(
        (saved) => !newFavorites.some((m) => m.id === saved.id)
      ),
      ...newFavorites,
    ];

    localStorage.setItem("favorites", JSON.stringify(mergedFavorites));
  };

  useEffect(() => {
    getUpcomingMovies().then((movies) => {
      const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

      const updatedMovies = movies.map((m) => ({
        ...m,
        favorite: favorites.some((f) => f.id === m.id),
      }));

      setMovies(updatedMovies);
    });
  }, []);

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};

export default UpcomingMoviesPage;
