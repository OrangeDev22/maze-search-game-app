import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  makeStyles,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { orange, grey } from "@material-ui/core/colors";
import Autocomplete from "@material-ui/lab/Autocomplete";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    color: "purple",
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
  },
  inputBase: {
    backgroundColor: grey[800],
  },

  cssLabel: {
    color: "green",
  },

  cssOutlinedInput: {
    "&$cssFocused $notchedOutline": {
      borderColor: `${theme.palette.primary.main} !important`,
    },
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: "1px",
    borderColor: "green !important",
  },
}));

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          <Autocomplete
            freeSolo
            className={classes.autoComplete}
            id="free-solo-2-demo"
            disableClearable
            size="small"
            loading={loading}
            options={options}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                style={{ padding: 0 }}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
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
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;