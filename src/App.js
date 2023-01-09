import React from "react";
import "./css/App.css";
import { GamesProvider } from "./contexts/GamesProvider";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { orange, grey } from "@material-ui/core/colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

  const customers = [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Jane Doe",
    },
    {
      id: 3,
      name: "Richard Roe",
    },
  ];

  const orders = [
    {
      id: 1,
      customerId: 1,
      product: "M1 MacBook Air",
      price: 999,
    },
    {
      id: 2,
      customerId: 2,
      product: "M1 MacBook Pro",
      price: 1299,
    },
    {
      id: 3,
      customerId: 1,
      product: "Dell XPS 9310",
      price: 1199,
    },
  ];

  function denormalize(primary, related, relatedName, referenceId) {
    return primary.map((object) => {
      const newRelatedList = related.filter(
        (item) => item[referenceId] === object.id
      );
      return { ...object, [relatedName]: newRelatedList };
    });
  }

  console.log("--test", denormalize(customers, orders, "orders", "customerId"));

  return (
    <div className="App">
      <ThemeProvider theme={theme} key="user">
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
