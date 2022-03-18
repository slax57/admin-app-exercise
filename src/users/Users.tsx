import Box from "@mui/material/Box";
import { Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import UserEdit from "./UserEdit";

function Users() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Routes>
        <Route index element={<UsersList />} />
        <Route path=":id" element={<UserEdit />} />
      </Routes>
    </Box>
  );
}

export default Users;
