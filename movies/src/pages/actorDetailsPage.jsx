import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getActorDetails, getActorMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const {
    data: actor,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getActorDetails,
  });

  const {
    data: movieData,
    error: moviesError,
    isPending: moviesPending,
    isError: moviesIsError,
  } = useQuery({
    queryKey: ["actorMovies", { id }],
    queryFn: getActorMovies,
  });

  if (isPending || moviesPending) {
    return <Spinner />;
  }

  if (isError || moviesIsError) {
    return (
      <Typography color="error">
        {error?.message || moviesError?.message}
      </Typography>
    );
  }

  const movies = movieData.cast
    .filter((movie) => movie.poster_path)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 12);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 5 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          {actor.profile_path && (
            <Box
              component="img"
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              sx={{ width: "100%", borderRadius: 2 }}
            />
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h3" gutterBottom>
            {actor.name}
          </Typography>

          <Typography variant="h6">
            Biography
          </Typography>

          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {actor.biography || "No biography available."}
          </Typography>

          <Typography>
            <strong>Birthday:</strong> {actor.birthday || "Unknown"}
          </Typography>

          <Typography>
            <strong>Place of Birth:</strong> {actor.place_of_birth || "Unknown"}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="h4" sx={{ mt: 5, mb: 3 }}>
        Known For
      </Typography>

      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid
            key={movie.credit_id}
            size={{ xs: 6, sm: 4, md: 3 }}
          >
            <Card sx={{ height: "100%" }}>
              <Link
                to={`/movies/${movie.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />

                <CardContent>
                  <Typography variant="subtitle1">
                    {movie.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {movie.release_date?.slice(0, 4)}
                  </Typography>
                </CardContent>
              </Link>
            </Card>
          </Grid>
        ))}
      </Grid>

      {movies.length === 0 && (
        <Typography>No movies available.</Typography>
      )}
    </Container>
  );
};

export default ActorDetailsPage;
