import ClearDatabase from '@/components/ClearDatabase';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link, Outlet } from 'react-router-dom';


const Layout = () => {

  return (
    <Box>
        <AppBar position="static">
            <Toolbar>
                <Box mr={5}>
                    <Link to="/" replace>Home</Link>
                </Box>
                <Box mr={5}>
                    <Link to="/rankings" replace>Ranking</Link>
                </Box>
                <Box mr={5}>
                    <Link to="/teams" replace>Teams</Link>
                </Box>
                <Box mr={5}>
                    <Link to="/matches" replace>Matches</Link>
                </Box>
                <Box ml="auto">
                    <ClearDatabase />
                </Box>
            </Toolbar>
        </AppBar>
        <Box p={5}>
            <Outlet />
        </Box>
    </Box>
  );
}
export default Layout;
