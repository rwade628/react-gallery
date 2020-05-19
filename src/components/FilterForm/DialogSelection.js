import React, { useCallback, useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Gallery from "react-photo-gallery";

import SelectedImage from "./SelectedImage";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function DialogSelection({
  list,
  open,
  setOpen,
  selectedList,
  setSelected
}) {
  const [clicked, setClicked] = useState(selectedList);

  useEffect(() => {
    setClicked(selectedList);
  }, [selectedList]);

  const handleChange = useCallback(
    (event, index) => {
      const i = clicked.indexOf(list[index].name);
      if (i > -1) {
        const newArr = clicked.filter(function(ele) {
          return ele !== list[index].name;
        });
        setClicked(newArr);
      } else {
        setClicked([...clicked, list[index].name]);
      }
    },
    [clicked, list]
  );

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <SelectedImage
        selected={selectedList.indexOf(photo.name) > -1 ? true : false}
        key={index}
        margin={"2px"}
        index={index}
        photo={photo}
        left={left}
        top={top}
        onClick={event => handleChange(event, index)}
      />
    ),
    [handleChange, selectedList]
  );

  const handleClose = () => {
    setClicked(selectedList);
    setOpen(false);
  };

  const handleSave = () => {
    setSelected(clicked);
    setOpen(false);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      fullWidth
      data-testid="tag-dialog"
    >
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Modal title
      </DialogTitle>
      <DialogContent dividers data-testid="dialog-body">
        <Gallery
          photos={list}
          renderImage={imageRenderer}
          data-testid="gallery"
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleSave}
          color="primary"
          data-testid="tag-save"
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
