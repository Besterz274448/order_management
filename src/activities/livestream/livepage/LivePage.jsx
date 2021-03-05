import React from "react";
import Grid from "@material-ui/core/Grid";

import LiveChat from "./LiveChat";
import LiveManager from "./LiveManager";

export default function LivePage() {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={5} lg={5}>
          <LiveChat />
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <LiveManager />
        </Grid>
      </Grid>
    </div>
  );
}