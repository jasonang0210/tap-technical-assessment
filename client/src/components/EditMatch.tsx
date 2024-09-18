import { fetchMatches, patchMatches } from "@/redux/matches/actions";
import { selectMatch } from "@/redux/matches/selectors";
import { AppDispatch } from "@/store";
import { convertMatchToString } from "@/utils";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditMatch = ({id, onClose}) => {
    const dispatch: AppDispatch = useDispatch()

    const match = useSelector(selectMatch(id))

    const [data, setData] = useState<string>(convertMatchToString(match));

    const submitData = async () => {
        await dispatch(patchMatches({id, data}))
        await dispatch(fetchMatches())
        onClose()
    }


    return (
        <Box display="flex" flexDirection="column" p={2}>
                <Box pb={2}>
                    <TextField
                        label="Edit your team in the format <teamA name> <teamB name> <teamA goals> <teamB goals>. "
                        value={data}
                        onChange={e => setData(e.target.value)}
                        fullWidth
                        />
                </Box>
                <Box display="flex">
                    <Alert severity="warning">Altering the team name field isn't allowed as it can lead to unwanted changes.</Alert>
                    <Box ml="auto" width={150}>
                        <Button variant="contained" onClick={submitData} fullWidth>Patch</Button>
                    </Box>
                </Box>
            </Box>
    );
};

export default EditMatch;