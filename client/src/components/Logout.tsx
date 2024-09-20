
import { logout } from "@/redux/auth/actions";
import { AppDispatch } from "@/store";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const dispatch: AppDispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const handleConfirmation = async () => {
        await dispatch(logout())
        setOpen(false)
        navigate("/login")
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Logout
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle >
                    Are you sure you want to logout?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        By clicking Yes, you will be logging out. You will have to re-log back in to continue using the app.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>No</Button>
                    <Button onClick={handleConfirmation} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Logout;