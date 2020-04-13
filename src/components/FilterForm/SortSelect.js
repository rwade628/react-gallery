import React, { useEffect, useRef, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import useStyles from "./styles";

export default function FilterForm({ sort, setSort }) {
  const classes = useStyles();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setSort(event.target.value);
  };

  return (
    <div className={classes.listItem}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="sort-label">
          Sort By
        </InputLabel>
        <Select
          name="sort"
          value={sort}
          onChange={handleChange}
          labelWidth={labelWidth}
          SelectDisplayProps={{ "data-testid": "sort-select" }}
        >
          <MenuItem value={"newest"}>Newest</MenuItem>
          <MenuItem value={"oldest"}>Oldest</MenuItem>
          <MenuItem value={"longest"}>Longest</MenuItem>
          <MenuItem value={"shortest"}>Shortest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
