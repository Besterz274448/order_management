import React from "react";
import { Button, ThemeProvider, createMuiTheme } from "@material-ui/core/";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#2AC4BA",
      main: "#25ACA3",
      dark: "#20968E",
      contrastText: "#fff",
    },
    secondary: {
      light: "#F7766C",
      main: "#F44336",
      dark: "#DD1A0C",
      contrastText: "#fff",
    },
  },
});
export default (props) => {
  const { children, color = "primary", variant, ...other } = props;
  return (
    <ThemeProvider theme={theme}>
      <Button color={color} variant={variant} {...other}>
        {children}
      </Button>
    </ThemeProvider>
  );
};
