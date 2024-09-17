import TeamsPage from '@/pages/Teams';
import './App.css'
import { Provider } from 'react-redux';
import { store } from '@/store'
import { ThemeProvider } from '@mui/material';
import theme from '@/theme';
import MatchesPage from '@/pages/Matches';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/teams",
    element: <TeamsPage />,
  },
  {
    path: "/matches",
    element: <MatchesPage />,
  },
]);

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  )
}

export default App
