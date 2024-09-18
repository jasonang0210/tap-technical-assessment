import { fetchTeam } from "@/redux/teams/actions";
import { selectTeam, selectTeamIsLoading } from "@/redux/teams/selectors";
import { AppDispatch } from "@/store";
import { CircularProgress } from "@mui/material";
import { isNil } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const TeamPage = () => {
    const dispatch: AppDispatch = useDispatch()

    const { name } = useParams();

    useEffect(() => {
        dispatch(fetchTeam(name))
    }, [dispatch, name])

    const team = useSelector(selectTeam(name))
    const isLoading = useSelector(selectTeamIsLoading)

    if (isNil(team) || isLoading) {
        return <CircularProgress />
    }

    return (
        <>
            <div>Team Name: {team.name}</div>
            <div>Registration Date: {team.registrationDate}</div>
            <div>Group Number: {team.group}</div>
            {team.matches.map((match, index) => (
                <div key={index}>
                    <div>Team Goal: {match.teamGoals}</div>
                    <div>Opponent Team: {match.opponentTeamName}</div>
                    <div>Opponent Goal: {match.opponentGoals}</div>
                    <div>Outcome: {match.outcome}</div>
                </div>
            ))}
        </>
    );
};

export default TeamPage;