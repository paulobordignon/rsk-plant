import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import { basicTheme } from './theme';

function App() {
  return (
    <ThemeProvider theme={basicTheme}>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
