import React from "react";
import "./css/App.css";
import { GamesProvider } from "./contexts/GamesProvider";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { orange, grey } from "@material-ui/core/colors";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import Navbar from "./components/Navbar";
import GameDetails from "./pages/GameDetails";
import TrendingDate from "./pages/TrendingDate";
import SearchGame from "./pages/SearchGame";
import { AppProvider } from "./contexts/AppProvider";

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
        <AppProvider>
          <GamesProvider>
            <Router>
              <Navbar />
              <main>
                <Switch>
                  <Route exact path="/">
                    <MainPage />
                  </Route>
                  <Route path="/games/:rawId/:gameName">
                    <GameDetails />
                  </Route>
                  <Route path="/games/search">
                    <SearchGame />
                  </Route>
                  <Route path="/:time">
                    <TrendingDate />
                  </Route>
                </Switch>
              </main>
            </Router>
          </GamesProvider>
        </AppProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
