import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import DiceIcon from "@material-ui/icons/Casino";
import SearchIcon from "@material-ui/icons/Search";
import FilterForm from "./FilterForm";
// import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: 0,
    marginLeft: "auto",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "auto",
      width: "60%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  buttonGroup: {
    display: "flex",
    marginLeft: "auto",
    marginRight: 0,
  },
}));

export default function TitleBar({
  titleText,
  setFilters,
  setPhotos,
  photos,
  allPhotos,
  gallerySelect,
}) {
  const [open, toggleOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const classes = useStyles();

  async function fetchTags() {
    const res = await fetch("v1/tags");
    res
      .json()
      .then((res) => {
        const tags = res.map((tag) => ({
          name: tag.name,
          src: tag.files[0].src,
          width: tag.files[0].width,
          height: tag.files[0].height,
        }));
        setTags(tags);
      })
      .catch((err) => console.log("error calling api:", err));
  }

  useEffect(() => {
    fetchTags();
  }, []);

  const toggleDrawer = (open) => (event) => {
    toggleOpen(open);
  };

  const selectRandom = () => {
    const index = Math.floor(Math.random() * photos.length);
    const photo = photos[index];
    gallerySelect(photo, index);
  };

  const handleSearch = (event) => {
    const searchList = [];
    if (photos.length > 0 && !photos[0].name) {
      console.log("photos not searchable");
      return;
    }

    for (let photo of allPhotos) {
      if (photo.name.includes(event.target.value)) {
        searchList.push(photo);
        continue;
      }
      for (let tag of photo.tags) {
        if (tag && tag.includes(event.target.value)) {
          searchList.push(photo);
          break;
        }
      }
    }

    setPhotos(searchList);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {titleText}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={handleSearch}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.buttonGroup}>
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
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        data-testid="drawer"
        open={open}
        onClose={toggleDrawer(false)}
      >
        <FilterForm
          tags={tags}
          setTags={setTags}
          setFilters={setFilters}
          toggleDrawer={toggleOpen}
        />
      </Drawer>
    </div>
  );
}
