import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { findAll } from "../dataProvider";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import TitleBar from "../common/TitleBar";

export default function UsersList() {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery("users", () => findAll(), {
    onSuccess: (data) => {
      data.forEach((user) => {
        queryClient.setQueryData(["user", user.id], user);
      });
    },
  });
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
    <>
      <TitleBar title="Users" />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Website</TableCell>
              <TableCell></TableCell>
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
                  <TableCell align="right">
                    <IconButton
                      onClick={() => {
                        navigate(`/users/${user.id}`);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
