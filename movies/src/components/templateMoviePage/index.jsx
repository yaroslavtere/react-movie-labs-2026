import MovieHeader from "../headerMovie";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getMovieImages } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import Typography from "@mui/material/Typography";

const TemplateMoviePage = ({ movie, children }) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["images", { id: movie.id }],
    queryFn: getMovieImages,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  const images = data.posters.slice(0, 5);

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid
        container
        spacing={3}
        sx={{
          p: { xs: 2, md: 3 },
          maxWidth: "1600px",
          mx: "auto",
        }}
      >
        <Grid size={{ xs: 12, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 3,
              p: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Movie Posters
            </Typography>

            {images.length > 0 ? (
              <ImageList
                cols={1}
                gap={12}
                sx={{
                  m: 0,
                  maxHeight: { xs: 400, md: 800 },
                  overflowY: "auto",
                }}
              >
                {images.map((image) => (
                  <ImageListItem key={image.file_path}>
                    <Box
                      component="img"
                      src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                      alt={`${movie.title} poster`}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        borderRadius: 2,
                        display: "block",
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Typography color="text.secondary">
                No posters available.
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <Box sx={{ width: "100%", minWidth: 0 }}>
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
