import TeamsPage from '@/pages/Teams';
import MatchesPage from '@/pages/Matches';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RankingsPage from '@/pages/Rankings';
import TeamPage from '@/pages/Team';
import Layout from '@/Layout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import ProtectedRoute from '@/ProtectedRoute';
import { useSelector } from 'react-redux';
import { selectAuthCount } from '@/redux/auth/selectors';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <ProtectedRoute />, 
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
    ],
  }
]);

const RouterComponent = () => {

    const authCount = useSelector(selectAuthCount);

    return (
        <RouterProvider router={router} key={authCount}/>
    )
}

export default RouterComponent
