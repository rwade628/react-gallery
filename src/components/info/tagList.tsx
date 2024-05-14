import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import Autocomplete, {
  createFilterOptions,
  FilterOptionsState,
} from "@mui/joy/Autocomplete";
import Chip from "@mui/joy/Chip";
import {
  AutocompleteOption,
  AutocompleteRenderGetTagProps,
  ListItemDecorator,
} from "@mui/joy";
import { Add, Close } from "@mui/icons-material";

const filter = createFilterOptions<string>();

export default function TagList({
  allTags,
  tags,
}: {
  allTags: string[];
  tags: string[];
}) {
  const [tagList, setTagList] = React.useState<string[]>(tags);

  const renderOption = (
    props: Omit<React.HTMLAttributes<HTMLLIElement>, "color">,
    option: any,
  ) => (
    <AutocompleteOption {...props}>
      {option.startsWith('Add "') && (
        <ListItemDecorator>
          <Add />
        </ListItemDecorator>
      )}
      {option}
    </AutocompleteOption>
  );

  const renderTags = (
    tags: string[],
    getTagProps: AutocompleteRenderGetTagProps,
  ) =>
    tags.map((item, index) => (
      <Chip
        variant="solid"
        endDecorator={<Close />}
        sx={{ minWidth: 0 }}
        {...getTagProps({ index })}
      >
        {item}
      </Chip>
    ));

  const handleFilter = (
    options: string[],
    params: FilterOptionsState<string>,
  ) => {
    const filtered = filter(options, params);

    const { inputValue } = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option);
    if (inputValue !== "" && !isExisting) {
      filtered.push(`Add "${inputValue}"`);
    }

    return filtered;
  };

  const handleChange = (
    _: React.SyntheticEvent,
    newValue: any,
    reason: string,
  ) => {
    console.log(newValue, reason);
    if (
      newValue.length > 0 &&
      newValue[newValue.length - 1].startsWith("Add")
    ) {
      // remove the Add and "" characters
      const newV = newValue[newValue.length - 1].split('"')[1];
      const temp = [...tagList, newV];
      setTagList(temp);
    } else {
      setTagList(newValue);
    }
  };

  return (
    <Sheet
      sx={{
        bgcolor: "background.level1",
        borderRadius: "sm",
        p: 1.5,
        my: 1.5,
        display: "flex",
        gap: 2,
        "& > div": { flex: 1 },
      }}
    >
      <Autocomplete
        id="tags-default"
        size="lg"
        placeholder="Tags"
        multiple
        freeSolo
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        options={allTags}
        getOptionLabel={(option) => option}
        value={tagList}
        renderOption={renderOption}
        renderTags={renderTags}
        onChange={handleChange}
        filterOptions={handleFilter}
      />
    </Sheet>
  );
}
