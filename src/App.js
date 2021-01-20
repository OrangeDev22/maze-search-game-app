import React from "react";
import "./css/App.css";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
function App() {
  const theme = createMuiTheme({
    palette: {
      main: green[400],
    },
    type: "dark",
  });

  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
