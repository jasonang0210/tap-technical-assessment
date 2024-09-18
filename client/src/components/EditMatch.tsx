import { patchMatches } from "@/redux/matches/actions";
import { selectMatch } from "@/redux/matches/selectors";
import { AppDispatch } from "@/store";
import { convertMatchToString } from "@/utils";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const EditMatch = ({id}) => {
    const dispatch: AppDispatch = useDispatch()

    const match = useSelector(selectMatch(id))

    const [data, setData] = useState<string>(convertMatchToString(match));

    const submitData = () => {
        dispatch(patchMatches(id, data))
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

export default EditMatch;