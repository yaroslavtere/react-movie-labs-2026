import PageTemplate from "../components/templateMovieListPage";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
import Spinner from "../components/spinner";
import { useQuery } from "@tanstack/react-query";
import { getPopularMovies } from "../api/tmdb-api";
import { useState } from "react";

const PopularMoviesPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["popular", page],
    queryFn: getPopularMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Popular Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
      page={page}
      totalPages={data.total_pages}
      onPageChange={setPage}
    />
  );
};

export default PopularMoviesPage;
