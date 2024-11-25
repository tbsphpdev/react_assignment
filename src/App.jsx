import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import Home from './pages/Home';
import './App.css';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Home />
  </ThemeProvider>
);

export default App;
