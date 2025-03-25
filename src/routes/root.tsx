import React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { Box } from "@mui/joy";

import { Outlet } from "react-router-dom";

// custom
import Header from "../components/header";
import { useSettingsStore } from "../state/settings";
import { useTagStore } from "../state/tags";

export default function Root() {
  const updateColumnCount = useSettingsStore(
    (state) => state.updateColumnCount,
  );

  const getAllTags = useTagStore((state) => state.getAllTags);

  React.useEffect(() => {
    const width = window.innerWidth;
    if (width < 750) {
      updateColumnCount(1);
    } else if (width < 1250) {
      updateColumnCount(3);
    }

    // initial tag load
    getAllTags();
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gridTemplateRows: "64px 1fr",
          minHeight: "100vh",
        }}
      >
        <Header />
        <Box component="main" className="Main" sx={{ p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
