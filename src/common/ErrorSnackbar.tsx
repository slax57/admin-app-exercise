import { Snackbar, IconButton, Alert } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import CloseIcon from "@mui/icons-material/Close";

export default function ErrorSnackbar(props: { errorMsg?: string }) {
  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (props.errorMsg) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props.errorMsg]);

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error" action={action}>
        {props.errorMsg}
      </Alert>
    </Snackbar>
  );
}
