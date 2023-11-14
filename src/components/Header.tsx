import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import MenuIcon from '@mui/icons-material/Menu';

// custom
import Layout from './Layout';
import Navigation from './Navigation';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <>
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Header>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <IconButton
            variant="outlined"
            size="sm"
            onClick={() => setDrawerOpen(true)}
          // sx={{ display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" fontWeight="xl">
            Files
          </Typography>
        </Box>
        <Input
          size="sm"
          variant="outlined"
          placeholder="Search anything…"
          startDecorator={<SearchRoundedIcon color="primary" />}
          endDecorator={
            <IconButton variant="outlined" color="neutral">
              <Typography fontWeight="lg" fontSize="sm" textColor="text.icon">
                ⌘ + k
              </Typography>
            </IconButton>
          }
          sx={{
            flexBasis: '500px',
            display: {
              xs: 'none',
              sm: 'flex',
            },
            boxShadow: 'sm',
          }}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
          <IconButton
            size="sm"
            variant="outlined"
            color="neutral"
            sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
          >
            <SearchRoundedIcon />
          </IconButton>
          <ColorSchemeToggle />
        </Box>
      </Layout.Header>
    </>
  )
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
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}
