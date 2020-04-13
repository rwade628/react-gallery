import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";

export default function TagSelect({
  anchorRef,
  handleChange,
  handleClose,
  list,
  open,
  selectedList
}) {
  return (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      style={{ zIndex: 9999, width: "100%" }}
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom" ? "center top" : "center bottom"
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList id="split-button-menu" data-testid="tag-dropdown">
                {list.map((item, index) => (
                  <MenuItem
                    key={item.name}
                    value={item.name}
                    onClick={event => handleChange(event, index)}
                  >
                    <Checkbox checked={selectedList.indexOf(item.name) > -1} />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
