import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import { Box } from "@mui/joy";

import { Outlet } from "react-router-dom";

// custom
import Header from "../components/header";

export default function Root() {
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
