import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#987CCF',
    },
    secondary: {
      main: '#EE99FF',
    },
    background: {
      default: '#222639',
      paper: '#0F1223',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
