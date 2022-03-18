import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export default function TitleBar(props: {
  title: string;
  navBackButton?: boolean;
}) {
  const navigate = useNavigate();
  const onNavBackClick = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <AppBar position="static">
      <Toolbar>
        {props.navBackButton && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onNavBackClick}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
