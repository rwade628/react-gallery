import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";

// Icons import
import { FormControl, FormHelperText, FormLabel, Switch } from "@mui/joy";
import { useSettingsStore } from "../state/settings";

export default function Navigation() {
  const isHorizontal = useSettingsStore((state) => state.isHorizontal);
  const updateControls = useSettingsStore(
    (state) => state.updateControlsOrientation,
  );

  return (
    <List size="sm" sx={{ "--ListItem-radius": "8px", "--List-gap": "4px" }}>
      <ListItem nested sx={{ mt: 2 }}>
        <FormControl orientation="horizontal">
          <Box sx={{ flex: 1, mt: 1, mr: 1 }}>
            <FormLabel sx={{ typography: "title-sm" }}>
              Horizontal Video Player
            </FormLabel>
            <FormHelperText sx={{ typography: "body-sm" }}>
              Change the video player controls to a horizontal view
            </FormHelperText>
          </Box>
          <Switch
            checked={isHorizontal}
            onChange={(e) => updateControls(e.target.checked)}
          />
        </FormControl>
      </ListItem>
    </List>
  );
}
