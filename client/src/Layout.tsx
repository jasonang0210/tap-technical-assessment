import ClearDatabase from '@/components/ClearDatabase';
import Logout from '@/components/Logout';
import { Chip } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Link, Outlet } from 'react-router-dom';


const Layout = () => {

    const token = localStorage.getItem('tap auth token')
    const username = localStorage.getItem('tap auth username')

  return (
    <Box>
        <AppBar position="static" color="secondary">
            <Toolbar>
                <Box mr={5}>
                    <Link to="/" replace>Home</Link>
                </Box>
                <Box mr={5}>
                    <Link to="/teams" replace>Teams</Link>
                </Box>
                <Box mr={5}>
                    <Link to="/matches" replace>Matches</Link>
                </Box>
                <Box mr={5}>
                    <Link to="/rankings" replace>Ranking</Link>
                </Box>
                <Box ml="auto">
                    { token ?
                        <Box display="flex" alignItems="center">
                            <Box mr={2}><Chip label={username} color="primary" variant="outlined"/></Box>
                            <Box mr={2}><ClearDatabase /></Box>
                            <Box mr={2}> <Logout /></Box>
                        </Box>
                        :
                        <Link to="/login" replace>Login</Link>
                    }
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
