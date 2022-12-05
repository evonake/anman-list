import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
} from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';
import { Provider } from 'react-redux';

import store from './redux/store';

import App from './App';

import './styles/index.css';

// purple
// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#987CCF',
//     },
//     secondary: {
//       main: '#EE99FF',
//     },
//     background: {
//       default: '#222639',
//       paper: '#0F1223',
//     },
//   },
// });
// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     primary: {
//       main: '#3E60C1',
//     },
//     secondary: {
//       main: '#293556',
//     },
//     background: {
//       default: '#293556',
//       paper: '#5983FC',
//     },
//   },
// });
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: [
      'Kanit',
      'sans-serif',
    ].join(','),
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    {/* themeing */}
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Allow css to override MUI */}
      <StyledEngineProvider injectFirst>
        {/* Redux */}
        <Provider store={store}>
          <App />
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
