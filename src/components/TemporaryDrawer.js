import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import { GiConsoleController } from "react-icons/gi";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  FaFire,
  FaHome,
  FaStar,
  FaCrown,
  FaStore,
  FaBinoculars,
} from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
    backgroundColor: theme.palette.primary.main,
    height: "100vh",
  },
  fullList: {
    width: "auto",
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
}));

const date = new Date();
const year = date.getFullYear();

function TemporaryDrawer({ isOpen, setAnchor }) {
  const classes = useStyles();

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setAnchor(false);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
    >
      <List onClick={toggleDrawer}>
        <ListItem button key={"ICON"}>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
        </ListItem>

        <Divider />
        <ListItem button key={"HOME"}>
          <ListItemIcon>
            <FaHome size={24} />
          </ListItemIcon>

          <ListItemText primary={"HOME"} />
        </ListItem>
      </List>
      <Divider />

      <List onClick={toggleDrawer}>
        {["This Week", "30 Days", `Popular ${year - 1}`].map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              {index === 0 && <FaFire size={24} />}
              {index === 1 && <FaStar size={24} />}
              {index === 2 && <FaCrown size={24} />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>

      <Divider />
      <List onClick={toggleDrawer}>
        {["Platforms", "Stores", "Genres"].map((text, index) => (
          <ListItem button key={index}>
            <ListItemIcon>
              {index === 0 && <GiConsoleController size={24} />}
              {index === 1 && <FaStore size={24} />}
              {index === 2 && <FaBinoculars size={24} />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor={"left"}
        open={isOpen}
        onClose={() => setAnchor(false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
}

export default TemporaryDrawer;
