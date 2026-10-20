import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favorites: movieIds } = useContext(MoviesContext);

  const favoriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = favoriteMovieQueries.some((m) => m.isPending);

  if (isPending) {
    return <Spinner />;
  }

  const isError = favoriteMovieQueries.find((m) => m.isError);

  if (isError) {
    return <h1>{isError.error.message}</h1>;
  }

  const movies = favoriteMovieQueries.map((q) => {
    return {
      ...q.data,
      genre_ids: q.data.genres.map((g) => g.id),
    };
  });

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromFavorites movie={movie} />
            <WriteReview movie={movie} />
          </>
        );
      }}
    />
  );
};

export default FavoriteMoviesPage;
