import { fetchTeam } from "@/redux/teams/actions";
import { selectTeam, selectTeamIsLoading } from "@/redux/teams/selectors";
import { AppDispatch } from "@/store";
import { Box, Chip, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { isNil } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const mapping = {
    "Win": "success",
    "Loss": "error",
    "Draw": "primary"
}

const columns: GridColDef[] = [
    { field: 'opponentTeamName', headerName: 'Opponent', flex: 1 },
    { field: 'teamGoals', headerName: 'Goals Scored', flex: 1 },
    { field: 'opponentGoals', headerName: 'Goals Conceded', flex: 1 },
    { 
        field: 'outcome',
        headerName: 'Outcome',
        flex: 1,
        renderCell: (params) => (
            <Chip label={params.value} color={mapping[params.value]} />
        )
    }
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
        <Box display="flex" flexDirection="column">
            <Box alignSelf="center" sx={{ textTransform: 'uppercase', fontSize: 32 }}>Team Detail Page</Box>
            <Box display="grid" gridTemplateColumns="150px 3fr" gridTemplateRows="auto auto auto" gap={2} m={2}>
                <Box>Team Name:</Box>
                <Box>
                    <Chip label={team.name} color="primary" variant="outlined"/>
                </Box>
                <Box>Registration Date:</Box>
                <Box>
                    <Chip label={team.registrationDate} color="success" variant="outlined" />
                </Box>
                <Box>Group Number:</Box>
                <Box>
                    <Chip label={team.group} color="error" variant="outlined"/>
                </Box>
            </Box>
            <Box alignSelf="center">Matches Played</Box>
            <DataGrid
                rows={team.matches ?? []}
                columns={columns}
                getRowId={row => row.opponentTeamName}
                autoHeight
                disableColumnMenu
                disableColumnSorting
                hideFooterPagination
                isRowSelectable={() => false}
                sx={{
                    border: 0,
                    m: 2,
                    fontFamily: "Montserrat, sans-serif", 
                    fontSize: 14,                    
                    '& .MuiDataGrid-columnHeaders': {
                        fontWeight: 'bold',           
                    },
                }}
            />
        </Box>
    );
};

export default TeamPage;