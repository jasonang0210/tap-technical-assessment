import TeamsPage from '@/pages/Teams';
import './App.css'
import { Provider } from 'react-redux';
import { store } from '@/store'
import { ThemeProvider, useMediaQuery } from '@mui/material';
import MatchesPage from '@/pages/Matches';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RankingsPage from '@/pages/Rankings';
import TeamPage from '@/pages/Team';
import { darkTheme, lightTheme } from '@/theme';
import { useMemo } from 'react';
import Layout from '@/Layout';
import { SnackbarProvider } from 'notistack';
import Notification from '@/components/Notification';
import HomePage from '@/pages/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/rankings',
        element: <RankingsPage />,
      },
      {
        path: "/teams",
        element: <TeamsPage />,
      },
      {
        path: "/team/:name",
        element: <TeamPage />,
      },
      {
        path: "/matches",
        element: <MatchesPage />,
      },
    ],
  }
]);

const App = () => {

  const darkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => (darkMode ? darkTheme : lightTheme), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <Notification />
          <RouterProvider router={router} />
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default App
