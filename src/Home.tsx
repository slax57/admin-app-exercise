import { Box, ListItemButton, ListItemText, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box>
      <Typography variant="h2" component="div">
        Welcome to Beers Admin!
      </Typography>
      <ListItemButton component={() => <Link to="/users" />}>
        <ListItemText primary="Users" />
      </ListItemButton>
      <nav>
        <Link to="/users">Users</Link>
      </nav>
    </Box>
  );
}

export default Home;
