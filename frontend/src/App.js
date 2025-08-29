import logo from './logo.svg';
import './App.css';
import Alerts from './Alerts';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: '"Zilla Slab", serif',
    },
    h2: {
      fontFamily: '"Zilla Slab", serif',
    },
    h3: {
      fontFamily: '"Zilla Slab", serif',
    },
    h4: {
      fontFamily: '"Zilla Slab", serif',
    },
    button: {
      fontFamily: '"Public Sans", sans-serif'
    },
    body1: {
      fontFamily: '"Public Sans", sans-serif'
    },
    body2: {
      fontFamily: '"Public Sans", sans-serif'
    },
  },
  palette: {
    primary: {
      main: "#0F2841",
    },
    secondary: {
      main: "#9B3CFF",
    },
    warning: {
      main: "#FF5F00",
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col p-24">
        <Typography variant='h3'>PRIA Personalized Alerts</Typography>
        <Alerts />
      </div>
    </ThemeProvider>
  );
}

export default App;
