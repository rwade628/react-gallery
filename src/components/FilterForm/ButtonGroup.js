import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

export default function Buttons({
  anchorRef,
  handleClick,
  handleToggle,
  name,
  open,
  selectedList
}) {
  return (
    <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
      <Button onClick={handleClick} data-testid="tag-dialog-button">
        {selectedList.length > 0 ? selectedList.join(", ") : `Select ${name}`}
      </Button>
      <Button
        size="small"
        aria-controls={open ? "split-button-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-label="select tags"
        aria-haspopup="menu"
        data-testid="tag-dropdown-button"
        onClick={handleToggle}
      >
        <ArrowDropDownIcon />
      </Button>
    </ButtonGroup>
  );
}
