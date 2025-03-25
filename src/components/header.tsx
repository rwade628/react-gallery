import * as React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Drawer from "@mui/joy/Drawer";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import {
  Link as RouterLink,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";

// Icons import
import CasinoIcon from "@mui/icons-material/Casino";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import MenuIcon from "@mui/icons-material/Menu";

// custom
import Navigation from "./drawer";
import { GalleryProps } from "./gallery/props";
import { useSettingsStore } from "../state/settings";

export default function Header() {
  const updateSearch = useSettingsStore((store) => store.updateSearch);
  const navigate = useNavigate();
  const galleries = useRouteLoaderData("root") as GalleryProps[];

  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerOpen(inOpen);
    };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };

  const handleRandomClick = () => {
    if (galleries && galleries.length > 0) {
      const gallery = galleries[Math.floor(Math.random() * galleries.length)];
      let linkTo = "";
      switch (gallery.type) {
        case "photo":
          linkTo = `/${gallery.id}`;
          break;
        case "movie":
          linkTo = `/?modal=${gallery.id}`;
          break;
        default:
          // do nothing
          return;
      }
      navigate(linkTo);
    }
  };

  return (
    <Box
      component="header"
      className="Header"
      sx={[
        {
          p: 2,
          gap: 2,
          bgcolor: "background.surface",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gridColumn: "1 / -1",
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        },
      ]}
    >
      <Drawer
        anchor={"right"}
        open={drawerOpen}
        size={"sm"}
        onClose={toggleDrawer(false)}
      >
        <Navigation />
      </Drawer>
      <Link
        to="/"
        component={RouterLink}
        variant="plain"
        color="neutral"
        underline="none"
        level="h3"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Typography component="h1" fontWeight="xl">
            Gallery
          </Typography>
        </Box>
      </Link>
      <Input
        size="sm"
        variant="outlined"
        placeholder="Search anything…"
        onChange={handleSearch}
        startDecorator={<SearchRoundedIcon color="primary" />}
        endDecorator={
          <IconButton variant="outlined" color="neutral">
            <Typography fontWeight="lg" fontSize="sm" textColor="text.icon">
              ⌘ + k
            </Typography>
          </IconButton>
        }
        sx={{
          flexBasis: "500px",
          display: {
            xs: "none",
            sm: "flex",
          },
          boxShadow: "sm",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1.5 }}>
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: "inline-flex", sm: "none" },
            alignSelf: "center",
          }}
        >
          <SearchRoundedIcon />
        </IconButton>
        <ColorSchemeToggle />
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => setDrawerOpen(true)}
          startDecorator={<MenuIcon />}
          // show button with text when enough space
          sx={{ display: { md: "flex", xs: "none" } }}
        >
          Change filters
        </Button>
        <IconButton
          variant="outlined"
          size="sm"
          onClick={() => setDrawerOpen(true)}
          // show icon button without text when limited on space
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <IconButton variant="outlined" size="sm" onClick={handleRandomClick}>
          <CasinoIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="soft" color="neutral" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="soft"
      color="neutral"
      onClick={() => {
        if (mode === "light") {
          setMode("dark");
        } else {
          setMode("light");
        }
      }}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
