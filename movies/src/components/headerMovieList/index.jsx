import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";

const Header = (props) => {
  const title = props.title;
  const navigate = useNavigate();

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "background.paper",
        color: "text.primary",
        borderRadius: 3,
        mx: 2,
        mt: 2,
        mb: 2,
        px: { xs: 2, md: 4 },
        py: 1.5,
      }}
    >
      <IconButton
        aria-label="go back"
        onClick={() => navigate(-1)}
        sx={{
          color: "primary.main",
          backgroundColor: "action.hover",
          "&:hover": {
            backgroundColor: "action.selected",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      <Box sx={{ textAlign: "center", flexGrow: 1, px: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          {title}
        </Typography>
      </Box>

      <IconButton
        aria-label="go forward"
        onClick={() => navigate(1)}
        sx={{
          color: "primary.main",
          backgroundColor: "action.hover",
          "&:hover": {
            backgroundColor: "action.selected",
          },
        }}
      >
        <ArrowForwardIcon />
      </IconButton>
    </Paper>
  );
};

export default Header;
