import { fetchTeams, patchTeams } from "@/redux/teams/actions";
import { selectTeam } from "@/redux/teams/selectors";
import { AppDispatch } from "@/store";
import { convertTeamToString } from "@/utils";
import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditTeam = ({name, onClose}) => {
    const dispatch: AppDispatch = useDispatch()

    const team = useSelector(selectTeam(name))

    const [data, setData] = useState<string>(convertTeamToString(team));

    const submitData = async () => {
        await dispatch(patchTeams({name, data}))
        await dispatch(fetchTeams())
        onClose()
    }

    return (
        <Box display="flex" flexDirection="column" p={2}>
            <Box pb={2}>
                <TextField
                    label="Edit your team in format <team> <registration date in DD/MM> <group number>"
                    value={data}
                    onChange={e => setData(e.target.value)}
                    fullWidth
                    />
            </Box>
            <Box display="flex">
                <Alert severity="info">Changing the group number might lead to imbalance in the groupings!</Alert>
                <Box ml="auto" width={150}>
                    <Button variant="contained" onClick={submitData} fullWidth>Patch</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditTeam;