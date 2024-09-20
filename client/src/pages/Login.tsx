import { login, signup } from "@/redux/auth/actions";
import { selectAuthStatus } from "@/redux/auth/selectors";
import { AppDispatch } from "@/store";
import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const dispatch: AppDispatch = useDispatch()

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const isLogin = useSelector(selectAuthStatus)

    const onClickLogin = async () => {
        await dispatch(login({username, password}))
    }

    const onClickSignup = async () => {
        await dispatch(signup({username, password}))
    }

    useEffect(() => {
        if (isLogin === true) {
            navigate("/")
        }
    }, [isLogin, navigate])

    return (
        <Box display="flex" flexDirection="column">
            <Box alignSelf="center" sx={{ textTransform: 'uppercase', fontSize: 32 }} mb={2}>Login Page</Box>
            <Box display="flex" flexDirection="column" flex={1}>
                <TextField
                label="Input your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                sx={{ mb:2 }}
                />
                <TextField
                label="Input your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                sx={{ mb:2 }}
                />
                <Box display="flex">
                    <Button variant="contained" onClick={onClickLogin} sx={{ m:2 }} fullWidth>Login</Button>
                    <Button variant="outlined" onClick={onClickSignup} sx={{ m:2 }} fullWidth>Or Sign Up</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;