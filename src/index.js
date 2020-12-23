import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#987CCF'
    },
    secondary: {
      main: '#EE99FF'
    },
    background: {
      default: '#222639',
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
