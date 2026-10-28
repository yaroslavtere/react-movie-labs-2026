import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromPlaylistIcon from "../components/cardIcons/removeFromPlaylist";

const MustWatchPage = () => {
  const { playlist: movieIds } = useContext(MoviesContext);

  const playlistMovieQueries = useQueries({
    queries: movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    }),
  });

  const isPending = playlistMovieQueries.some((m) => m.isPending);

  if (isPending) {
    return <Spinner />;
  }

  const isError = playlistMovieQueries.find((m) => m.isError);

  if (isError) {
    return <h1>{isError.error.message}</h1>;
  }

  const movies = playlistMovieQueries.map((q) => {
    return {
      ...q.data,
      genre_ids: q.data.genres.map((g) => g.id),
    };
  });

  return (
    <PageTemplate
      title="Must Watch Movies"
      movies={movies}
      action={(movie) => (
        <RemoveFromPlaylistIcon movie={movie} />
      )}
    />
  );
};

export default MustWatchPage;
