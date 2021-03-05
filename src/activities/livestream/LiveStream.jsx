import React from "react";
import { Switch, Route } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import LivePage from "./livepage/LivePage";
import LiveTable from "./livetable/LiveTable";
import ProductLive from "./productlive/ProductLive";

const theme = createMuiTheme({
  typography: {
    fontFamily: [],
  },
});

export default function LiveStream() {
  return (
    <Switch>
      <Route path="/livestream/" exact component={LiveTable} />
      <Route path="/livestream/product" exact component={ProductLive} />
      <Route path="/livestream/cfpage" exact component={LivePage} />
    </Switch>
  );
}
