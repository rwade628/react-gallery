import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import useStyles from "./styles";

export default function FilterForm({ type, setType }) {
  const classes = useStyles();

  const handleChange = event => {
    setType(event.target.value);
  };

  return (
    <div className={classes.listItem}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Type</FormLabel>
        <RadioGroup
          aria-label="type"
          name="type"
          value={type}
          onChange={handleChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="photo" control={<Radio />} label="Photos" />
          <FormControlLabel
            value="movie"
            control={<Radio />}
            label="Movies"
            data-testid="radio-element"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
