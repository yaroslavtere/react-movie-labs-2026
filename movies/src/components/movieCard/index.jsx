import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router";

export default function MovieCard({ movie, action }) {
  const { favorites, playlist } = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id);
  const isMustWatch = playlist.includes(movie.id);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 8,
        },
      }}
    >
      <CardHeader
        sx={{ minHeight: 85 }}
        avatar={
          isFavorite || isMustWatch ? (
            <Box sx={{ display: "flex", gap: 1 }}>
              {isFavorite && (
                <Avatar sx={{ backgroundColor: "error.main" }}>
                  <FavoriteIcon />
                </Avatar>
              )}

              {isMustWatch && (
                <Avatar sx={{ backgroundColor: "primary.main" }}>
                  <PlaylistAddCheckIcon />
                </Avatar>
              )}
            </Box>
          ) : null
        }
        title={
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.title}
          </Typography>
        }
      />

      <CardMedia
        sx={{
          aspectRatio: "2 / 3",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : img
        }
        title={movie.title}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid size={6}>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <CalendarIcon fontSize="small" />
              {movie.release_date?.slice(0, 4) || "N/A"}
            </Typography>
          </Grid>

          <Grid size={6}>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <StarRateIcon
                fontSize="small"
                sx={{ color: "warning.main" }}
              />
              {movie.vote_average?.toFixed(1) ?? "N/A"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions
        sx={{
          justifyContent: "space-between",
          mt: "auto",
          p: 2,
        }}
      >
        {action?.(movie)}

        <Button
          component={Link}
          to={`/movies/${movie.id}`}
          variant="contained"
          size="small"
        >
          More Info
        </Button>
      </CardActions>
    </Card>
  );
}
