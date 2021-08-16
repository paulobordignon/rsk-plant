import React from 'react';
import Routes from './routes';
import { ThemeProvider } from 'styled-components';
import { basicTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={basicTheme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
