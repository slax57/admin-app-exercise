import { Typography } from "@mui/material";

export default function ErrorText(props: { text: string }) {
  return (
    <Typography variant="body1" component="div" sx={{ color: "error.main" }}>
      {props.text}
    </Typography>
  );
}
