import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './index.css';
import store from './app/store';
import App from './App';

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
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root'),
);
