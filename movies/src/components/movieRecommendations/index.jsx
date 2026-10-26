import { useQuery } from "@tanstack/react-query";
import { getMovieRecommendations } from "../../api/tmdb-api";
import Spinner from "../spinner";
import MovieList from "../movieList";
import Typography from "@mui/material/Typography";
import AddToFavoritesIcon from "../cardIcons/addToFavorites";
import Grid from "@mui/material/Grid";
import MovieCard from "../movieCard";

const MovieRecommendations = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["recommendations", { id: movie.id }],
    queryFn: getMovieRecommendations,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const recommendations = data.results;

  return (
    <>
      <Typography variant="h5" component="h3" sx={{ my: 2 }}>
        Recommended Movies
      </Typography>

      {recommendations.length > 0 ? (
        <Grid container spacing={2}>
            {recommendations.slice(0, 6).map((movie) => (
                <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <MovieCard
                movie={movie}
                action={(movie) => <AddToFavoritesIcon movie={movie} />}
            />
        </Grid>
  ))}
</Grid>
        
      ) : (
        <Typography>No recommendations available.</Typography>
      )}
    </>
  );
};

export default MovieRecommendations;
