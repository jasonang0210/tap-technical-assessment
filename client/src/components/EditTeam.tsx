import { patchTeams } from "@/redux/teams/actions";
import { selectTeam } from "@/redux/teams/selectors";
import { AppDispatch } from "@/store";
import { convertTeamToString } from "@/utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditTeam = ({name}) => {
    const dispatch: AppDispatch = useDispatch()

    const team = useSelector(selectTeam(name))

    const [data, setData] = useState<string>(convertTeamToString(team));

    const submitData = () => {
        dispatch(patchTeams(name, data))
    }

    return (
        <div>
            <TextField
            value={data}
            onChange={e => setData(e.target.value)}
            />
            <Button variant="contained" onClick={submitData}>Patch</Button>
        </div>
    );
};

export default EditTeam;