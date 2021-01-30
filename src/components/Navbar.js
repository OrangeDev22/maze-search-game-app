import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import TemporaryDrawer from "./TemporaryDrawer";
import { orange, grey } from "@material-ui/core/colors";
import { useHistory } from "react-router-dom";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "../axios";

const API_KEY = process.env.REACT_APP_GAME_RAWG_API_KEY;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginRight: "1em",
  },
  autoComplete: {
    flexGrow: 1,
    "& > * + *": {
      marginTop: theme.spacing(2),
    },

    color: "purple",
    "& .MuiFormControl-root": {
      margin: "auto",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: grey[800],
      borderRadius: "1em",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: orange[400],
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: orange[400],
    },
    "& .MuiAutocomplete-inputRoot": {
      backgroundColor: "var(--clr-primary-background)",
      borderRadius: "1em",
    },
  },
  inputBase: {
    backgroundColor: grey[800],
  },
}));

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const classes = useStyles();
  const [anchor, setAnchor] = useState(false);
  const history = useHistory();

  const autocompleteHandler = (value) => {
    value instanceof Object && history.push(`/games/${value.id}/${value.name}`);
  };

  const typingHandler = async (e) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
      // open && setOptions([]);
    }

    setTypingTimeout(
      setTimeout(() => {
        if (e.target.value) {
          setLoading(true);
          axios
            .get("/games", {
              params: {
                search: e.target.value,
                key: API_KEY,
              },
            })
            .then((result) => {
              setLoading(false);
              console.log(result.data.results.slice(0, 7));
              setOptions(result.data.results.slice(0, 7));
            });
        }
      }, 1000)
    );
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <div className={`Navbar ${classes.root}`}>
      <AppBar position="static">
        <Toolbar>
          <TemporaryDrawer isOpen={anchor} setAnchor={setAnchor} />
          <IconButton
            edge="start"
            onClick={() => setAnchor(true)}
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h6" className={classes.title}>
              MAZE
            </Typography>
          </Link>

          <Autocomplete
            freeSolo
            className={classes.autoComplete}
            id="free-solo-2-demo"
            // disableClearable
            size="small"
            onChange={(event, value) => autocompleteHandler(value)}
            // getOptionSelected={(option, value) => {
            //   return value.name ? option.name === value.name : "";
            // }}
            filterOptions={(options) => options}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            getOptionLabel={(option) => (option.name ? option.name : "")}
            loading={loading}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                onChange={(e) => typingHandler(e)}
                margin="normal"
                style={{ padding: 0 }}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  placeholder: "Search a game",
                  endAdornment: (
                    <React.Fragment>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
