import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

// custom
import Header from '../components/Header'
import Layout from '../components/Layout';


export default function Root() {
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Layout.Root
        sx={{
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
            md: 'minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)',
          },
        }}
      >
        <Header />
        <Layout.Main>
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}

