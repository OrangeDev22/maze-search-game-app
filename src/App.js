import React from "react";
import "./css/App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./components/MainPage";

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: green[400],
      },
    },
    type: "dark",
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
