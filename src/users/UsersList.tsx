import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { findAll } from "../dataProvider";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import TitleBar from "../common/TitleBar";
import ErrorSnackbar from "../common/ErrorSnackbar";

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
  const goToEdit = (event: any, userId: number) => {
    event.stopPropagation();
    navigate(`/users/${userId}`);
  };

  return (
    <>
      <TitleBar title="Users" />

      {data ? (
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
              {data.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={(e) => {
                    goToEdit(e, user.id);
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
                      onClick={(e) => {
                        goToEdit(e, user.id);
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
      ) : (
        <Box padding={2}>
          {isLoading && (
            <Typography variant="body1" component="div">
              Loading...
            </Typography>
          )}
        </Box>
      )}

      <ErrorSnackbar errorMsg={error ? String(error) : undefined} />
    </>
  );
}
