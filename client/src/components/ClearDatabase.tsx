
import { clearDatabase } from "@/redux/notifications/actions";
import { AppDispatch } from "@/store";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ClearDatabase = () => {
    const dispatch: AppDispatch = useDispatch()

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);

    const handleConfirmation = async () => {
        await dispatch(clearDatabase())
        setOpen(false)
        navigate("/");
    }

    return (
        <>
            <Button onClick={() => setOpen(true)}>
                Clear Database
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle >
                    Are you sure you want to clear the database?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        By clicking Yes, you will be wiping the entire database and all data will be lost.
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

export default ClearDatabase;