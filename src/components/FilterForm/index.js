import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

import useStyles from "./styles";
import SortSelect from "./SortSelect";
import TagSelect from "./TagSelect";
import TypeRadio from "./TypeRadio";

export default function FilterForm({
  tags,
  setTags,
  setFilters,
  toggleDrawer,
}) {
  const classes = useStyles();
  const [sort, setSort] = useState("newest");
  const [type, setType] = useState("all");
  const [selectedTags, setSelectedTag] = useState([]);

  const apply = (e) => {
    let tags = "";
    selectedTags.forEach((tag) => {
      tags += `&tag=${tag}`;
    });
    const filterString = `orderBy=${sort}&type=${type}${tags}`;
    setFilters(filterString);
    toggleDrawer(false); // close drawer on submit
  };

  return (
    <div className={classes.fullList} role="presentation">
      <TypeRadio type={type} setType={setType} />
      <SortSelect sort={sort} setSort={setSort} />
      <TagSelect
        tags={tags}
        setTags={setTags}
        selectedTags={selectedTags}
        setSelectedTag={setSelectedTag}
      />
      <Divider />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        aria-label="submit"
        size="large"
        onClick={apply}
      >
        Apply
      </Button>
    </div>
  );
}
