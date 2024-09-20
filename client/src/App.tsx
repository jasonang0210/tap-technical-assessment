import './App.css'
import { Provider } from 'react-redux';
import { store } from '@/store'
import { ThemeProvider, useMediaQuery } from '@mui/material';
import { darkTheme, lightTheme } from '@/theme';
import { useMemo } from 'react';
import { SnackbarProvider } from 'notistack';
import Notification from '@/components/Notification';
import RouterComponent from '@/Router';

const App = () => {

  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Notification />
            <RouterComponent />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default App
