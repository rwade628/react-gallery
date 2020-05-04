import React, { useEffect, useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

import useStyles from "./styles";
import Buttons from "./ButtonGroup";
import DialogSelection from "./DialogSelection";
import Dropdown from "./Dropdown";

export default function TagSelect({ selectedTags, setSelectedTag }) {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  async function fetchTags() {
    const res = await fetch("v1/tags");
    res
      .json()
      .then(res => {
        const tags = res.map(tag => ({
          name: tag.name,
          src: tag.files[0].src,
          width: tag.files[0].width,
          height: tag.files[0].height
        }));
        setTags(tags);
      })
      .catch(err => console.log("error calling api:", err));
  }

  useEffect(() => {
    fetchTags();
  }, []);

  const handleChange = (event, index) => {
    const i = selectedTags.indexOf(tags[index].name);
    if (i > -1) {
      const newArr = selectedTags.filter(function(ele) {
        return ele !== tags[index].name;
      });
      setSelectedTag(newArr);
    } else {
      setSelectedTag([...selectedTags, tags[index].name]);
    }
  };

  const handleClick = () => {
    setDialogOpen(true);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.listItem}>
      <FormControl variant="outlined" className={classes.formControl}>
        <div className={classes.tagSelect}>
          <span>Tags</span>
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Buttons
                anchorRef={anchorRef}
                handleClick={handleClick}
                handleToggle={handleToggle}
                name={"Tag"}
                open={open}
                selectedList={selectedTags}
              />
              <Dropdown
                anchorRef={anchorRef}
                handleChange={handleChange}
                handleClose={handleClose}
                list={tags}
                open={open}
                selectedList={selectedTags}
              />
            </Grid>
          </Grid>
        </div>
      </FormControl>
      <DialogSelection
        open={dialogOpen}
        setOpen={setDialogOpen}
        list={tags}
        selectedList={selectedTags}
        setSelected={setSelectedTag}
      />
    </div>
  );
}
