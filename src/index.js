import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './app/store';
import { GREEN } from './constants/color';
import { createTheme, ThemeProvider } from '@material-ui/core';
const theme = createTheme({
  typography: {
    fontFamily: " -apple-system,'Public Sans', sans-serif;",
    fontSize: 14,
  },
  palette: {
    primary: {
      main: `${GREEN}`,
    },
  },
});
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
