import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import UserEdit from "./UserEdit";

function Users() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Users
          </Typography>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route index element={<UsersList />} />
        <Route path=":id" element={<UserEdit />} />
      </Routes>
    </Box>
  );
}

export default Users;
