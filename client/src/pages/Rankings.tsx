import DataTable from "@/components/DataTable";
import { fetchRankings } from "@/redux/rankings/actions";
import { selectAllRankings, selectRankingIsLoading } from "@/redux/rankings/selectors";
import { AppDispatch } from "@/store";
import { Box, CircularProgress } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns: GridColDef[] = [
    {
        field: 'index',
        headerName: '#',
        width: 50,
        renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1, // index starts from 1
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'totalPoints', headerName: 'Total Points', flex: 1 },
    { field: 'totalGoals', headerName: 'Total Goals', flex: 1 },
    { field: 'totalAltPoints', headerName: 'Total Alternate Points', flex: 1 },
    { field: 'registrationDate', headerName: 'Date of Registration', flex: 1 },
  ];


const RankingsPage = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRankings())
    }, [dispatch])

    const allRankings = useSelector(selectAllRankings)
    const isLoading = useSelector(selectRankingIsLoading);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box display="flex" flexDirection="column">
            <Box alignSelf="center" sx={{ textTransform: 'uppercase', fontSize: 32 }} mb={4}>Ranking Page</Box>
            <Box display="flex">
                {allRankings.map(ranking => (
                    <Box display="flex" flexDirection="column" alignItems="center" flex={1}>
                        <Box>Group: {ranking.group}</Box>
                        <Box width="100%">
                            <DataTable data={ranking.teams} columns={columns} accessor="name"/>
                        </Box>
                    </Box>
                )
                )}
            </Box>
        </Box>
    );
};

export default RankingsPage;