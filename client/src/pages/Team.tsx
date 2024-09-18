import { fetchTeam } from "@/redux/teams/actions";
import { selectTeam, selectTeamIsLoading } from "@/redux/teams/selectors";
import { AppDispatch } from "@/store";
import { CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { isNil } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const columns: GridColDef[] = [
    { field: 'opponentTeamName', headerName: 'Opponent', width: 130 },
    { field: 'teamGoals', headerName: 'Goals Scored', width: 130 },
    { field: 'opponentGoals', headerName: 'Goals Conceded', width: 130 },
    { field: 'outcome', headerName: 'Outcome', width: 130 }
  ];

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
            <DataGrid
                rows={team.matches ?? []}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                getRowId={row => row.opponentTeamName}
            />
        </>
    );
};

export default TeamPage;