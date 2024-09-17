import { fetchMatches, postMatches } from "@/redux/actions";
import { selectAllMatches } from "@/redux/selectors";
import { AppDispatch } from "@/store";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MatchesPage = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMatches())
    }, [dispatch])

    const allMatches = useSelector(selectAllMatches)

    const [data, setData] = useState<string>("");

    const submitData = () => {
        dispatch(postMatches(data))
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
            {allMatches.map(match => (
                <div key={match.id}>
                    <div>Match ID: {match.id}</div>
                    <br />
                    {match.teamMatches.map(team => (
                        <div key={team.teamName}>
                            <div>Team Name: {team.teamName}</div>
                            <div>Goals Scored: {team.goals}</div>
                            <br />
                        </div>
                    ))}
                    <hr />
                </div>
            ))}
        </div>
        </>
    );
};

export default MatchesPage;