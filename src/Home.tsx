import { Card, Grid, List, Stack, Typography } from "@mui/material";
import { ListItemLink } from "./common/ListItemLink";

function Home() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      margin={4}
      padding={4}
    >
      <Grid item xs={3}>
        <Card sx={{ height: 350, width: 350 }}>
          <Stack spacing={2} justifyContent="center" height="100%">
            <Typography variant="h3" component="div">
              Welcome to Beers Admin!
            </Typography>
            <List>
              <ListItemLink to="/users" primary="&gt; Users" />
            </List>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Home;
