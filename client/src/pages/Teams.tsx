import { fetchTeams, postTeams } from "@/redux/actions";
import { selectAllTeams } from "@/redux/selectors";
import { AppDispatch } from "@/store";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TeamsPage = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTeams())
    }, [dispatch])

    const allTeams = useSelector(selectAllTeams)

    const [data, setData] = useState<string>("");

    const submitData = () => {
        dispatch(postTeams(data))
    }

    return (
        <>
        <div>
            <TextField
            label="Multiline"
            multiline
            onChange={e => setData(e.target.value)}
            maxRows={12}
            />
            <Button variant="contained" onClick={submitData}>Submit</Button>
        </div>
        <hr />
        <div>
            {allTeams.map(team => (
                <div key={team.name}>
                    <div>Team Name: {team.name}</div>
                    <div>Registration Date: {team.registrationDate}</div>
                    <div>Group Number: {team.group}</div>
                    <hr/>
                </div>
            ))}
        </div>
        </>
    );
};

export default TeamsPage;