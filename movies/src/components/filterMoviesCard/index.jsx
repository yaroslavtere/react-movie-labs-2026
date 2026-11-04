import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";

const formControl = {
  my: 1.5,
  width: "100%",
  backgroundColor: "background.paper",
};

export default function FilterMoviesCard(props) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography color="error">{error.message}</Typography>;
  }

  const genres = [
    { id: "0", name: "All" },
    ...data.genres,
  ];

  const handleTextChange = (e) => {
    props.onUserInput("name", e.target.value);
  };

  const handleGenreChange = (e) => {
    props.onUserInput("genre", e.target.value);
  };

  const handleSortChange = (e) => {
    props.onUserInput("sort", e.target.value);
  };

  return (
    <Card
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 2,
          }}
        >
          <SearchIcon color="primary" />

          <Typography variant="h6" fontWeight="bold">
            Filter Movies
          </Typography>
        </Box>

        <TextField
          sx={formControl}
          id="movie-search"
          label="Search Movies"
          type="search"
          variant="outlined"
          size="small"
          value={props.titleFilter}
          onChange={handleTextChange}
        />

        <FormControl sx={formControl} size="small">
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            value={props.genreFilter}
            label="Genre"
            onChange={handleGenreChange}
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={formControl} size="small">
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={props.sortBy}
            label="Sort By"
            onChange={handleSortChange}
          >
            <MenuItem value="default">Default</MenuItem>
            <MenuItem value="rating-desc">Rating: High to Low</MenuItem>
            <MenuItem value="rating-asc">Rating: Low to High</MenuItem>
            <MenuItem value="date-desc">Release Date: Newest</MenuItem>
            <MenuItem value="date-asc">Release Date: Oldest</MenuItem>
            <MenuItem value="title-asc">Title: A-Z</MenuItem>
            <MenuItem value="title-desc">Title: Z-A</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
