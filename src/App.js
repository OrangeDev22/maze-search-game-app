import React, { useState } from "react";
import "./css/App.css";
import { GamesProvider } from "./contexts/GamesProvider";
import {
  ThemeProvider,
  createMuiTheme,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuIcon from "@material-ui/icons/Menu";
import { orange, grey } from "@material-ui/core/colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: grey[900],
      },
      secondary: {
        main: orange[400],
      },
      type: "dark",
    },
    overrides: {
      MuiInputBase: {
        color: "red",
      },
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Navbar />
        <GamesProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
            </Switch>
          </Router>
        </GamesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
