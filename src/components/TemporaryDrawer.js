import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import { FaFire, FaHome, FaStar, FaCrown } from "react-icons/fa";

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
  const history = useHistory();
  const classes = useStyles();

  const redirectHandler = (link) => {
    history.push(link);
  };

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
        <ListItem button key={"HOME"} onClick={() => redirectHandler("/")}>
          <ListItemIcon>
            <FaHome size={24} />
          </ListItemIcon>

          <ListItemText primary={"HOME"} />
        </ListItem>
      </List>
      <Divider />

      <List onClick={toggleDrawer}>
        {[
          { link: "/this-week", text: "This Week" },
          { link: "/last-month", text: "30 Days" },
          { link: "/last-year", text: `Popular ${year - 1}` },
        ].map((element, index) => (
          <ListItem
            button
            key={index}
            onClick={() => {
              redirectHandler(element.link);
            }}
          >
            <ListItemIcon>
              {index === 0 && <FaFire size={24} />}
              {index === 1 && <FaStar size={24} />}
              {index === 2 && <FaCrown size={24} />}
            </ListItemIcon>
            <ListItemText primary={element.text} />
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
