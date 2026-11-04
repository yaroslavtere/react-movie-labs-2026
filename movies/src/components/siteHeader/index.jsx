import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MovieIcon from "@mui/icons-material/Movie";
import { useNavigate, useLocation } from "react-router";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ColorModeContext } from "../appTheme";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const navigate = useNavigate();
  const location = useLocation();

  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Popular", path: "/movies/popular" },
    { label: "Top Rated", path: "/movies/top-rated" },
    { label: "Now Playing", path: "/movies/now-playing" },
    { label: "Must Watch", path: "/movies/must-watch" },
  ];

  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#172033",
          boxShadow: 3,
        }}
      >
        <Toolbar sx={{ gap: 2 }}>
          <Box
            onClick={() => navigate("/")}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <MovieIcon sx={{ color: "#A78BFA", fontSize: 30 }} />

            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "white",
              }}
            >
              TMDB Client
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: "white" }}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    selected={location.pathname === opt.path}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {menuOptions.map((opt) => {
                const isActive = location.pathname === opt.path;

                return (
                  <Button
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{
                      color: "white",
                      fontSize: "0.8rem",
                      fontWeight: isActive ? "bold" : "normal",
                      backgroundColor: isActive
                        ? "#7C3AED"
                        : "transparent",
                      borderRadius: 2,
                      px: 1.5,
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "#6D28D9",
                      },
                    }}
                  >
                    {opt.label}
                  </Button>
                );
              })}
            </Box>
          )}

          <Tooltip
            title={mode === "dark" ? "Light Mode" : "Dark Mode"}
          >
            <IconButton
              onClick={toggleColorMode}
              aria-label="Toggle dark mode"
              sx={{ color: "white" }}
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Offset />
    </>
  );
};

export default SiteHeader;
