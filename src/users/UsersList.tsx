import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { findAll } from "../dataProvider";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const { isLoading, error, data } = useQuery("users", () => findAll());
  const navigate = useNavigate();

  if (isLoading)
    return (
      <Typography variant="body1" component="div">
        Loading...
      </Typography>
    );

  if (error)
    return (
      <Typography variant="body1" component="div" sx={{ color: "error.main" }}>
        An error has occurred: {error}
      </Typography>
    );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Website</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => {
                  navigate(`/users/${user.id}`);
                }}
                hover
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.website}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
