import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import DiceIcon from "@material-ui/icons/Casino";
import FilterForm from "./FilterForm";
// import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function TitleBar({
  titleText,
  setFilters,
  photos,
  gallerySelect
}) {
  const [open, toggleOpen] = useState(false);
  const classes = useStyles();

  const toggleDrawer = open => event => {
    toggleOpen(open);
  };

  const selectRandom = () => {
    const index = Math.floor(Math.random() * photos.length);
    const photo = photos[index];
    gallerySelect(photo, index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {titleText}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="random"
            onClick={selectRandom}
          >
            <DiceIcon />
          </IconButton>
          <IconButton
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        data-testid="drawer"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <FilterForm setFilters={setFilters} toggleDrawer={toggleOpen} />
      </Drawer>
    </div>
  );
}
