import { useQuery, useQueryClient, useMutation } from "react-query";
import { findOne, update, User } from "../dataProvider";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorText from "../common/ErrorText";
import TitleBar from "../common/TitleBar";

export default function UserEdit() {
  const queryClient = useQueryClient();
  const params = useParams();
  const userId = params.id ? parseInt(params.id) : 0;
  const userQuery = useQuery(["user", userId], () => findOne(userId));
  const userMutation = useMutation(update, {
    onSuccess: (newUser) => {
      // Update user data
      queryClient.setQueryData(["user", newUser.id], newUser);
      // Update users list data
      queryClient.setQueryData<User[]>("users", (oldUsers) => {
        if (!oldUsers) return [];
        return oldUsers.map((oldUser) =>
          oldUser.id === newUser.id ? newUser : oldUser
        );
      });
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<User>();
  const navigate = useNavigate();

  const isLoading = userQuery.isLoading || userMutation.isLoading;
  const error = userQuery.error || userMutation.error;

  const onSubmit: SubmitHandler<User> = (user: User) => {
    // Need to include the id to the user obj since react-hook-form doesn't do it because the field is disabled
    userMutation.mutate({
      ...user,
      id: userId,
    });
    navigate(-1);
  };

  if (isLoading)
    return (
      <Typography variant="body1" component="div">
        Loading...
      </Typography>
    );

  if (error) return <ErrorText text={`An error has occurred: ${error}`} />;

  if (!userQuery.data) return <Box></Box>;

  const user: User = userQuery.data;

  return (
    <>
      <TitleBar title={`User #${user.id}`} navBackButton />
      <Box padding={2}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <TextField
              required
              disabled
              label="id"
              defaultValue={user.id}
              {...register("id")}
            />

            <TextField
              required
              label="name"
              defaultValue={user.name}
              {...register("name", { required: true })}
            />
            {formErrors.name && <ErrorText text="This field is required" />}

            <TextField
              required
              label="email"
              defaultValue={user.email}
              {...register("email", { required: true })}
            />
            {formErrors.email && <ErrorText text="This field is required" />}

            <TextField
              label="website"
              defaultValue={user.website}
              {...register("website")}
            />

            <Button variant="contained" type="submit">
              Save
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
}
