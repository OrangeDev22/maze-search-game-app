import React from "react";
import "./css/App.css";
import { GamesProvider } from "./contexts/GamesProvider";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { orange, grey } from "@material-ui/core/colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";
import Navbar from "./components/Navbar";
import GameDetails from "./components/GameDetails";

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
        <GamesProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route path="/games/:rawId/:gameName">
                <GameDetails />
              </Route>
            </Switch>
          </Router>
        </GamesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
