import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";
import CardActionArea from "@mui/material/CardActionArea";

const MovieCast = ({ movie }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast.slice(0, 6);

  return (
    <>
      <Typography variant="h5" sx={{ my: 2 }}>
        Top Cast
      </Typography>

      {cast.length > 0 ? (
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid
              key={actor.credit_id}
              size={{ xs: 6, sm: 4, md: 3, lg: 2 }}
            >
              <Card sx={{ height: "100%" }}>
                <CardActionArea
                  component={Link}
                  to={`/actors/${actor.id}`}
                  sx={{ height: "100%" }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                        : "https://placehold.co/200x300?text=No+Photo"
                    }
                    alt={actor.name}
                  />

                  <CardContent>
                    <Typography variant="subtitle1">
                      {actor.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {actor.character}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No cast information available.</Typography>
      )}
    </>
  );
};

export default MovieCast;
