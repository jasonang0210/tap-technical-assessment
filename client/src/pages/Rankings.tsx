import { fetchRankings } from "@/redux/rankings/actions";
import { selectAllRankings, selectRankingIsLoading } from "@/redux/rankings/selectors";
import { AppDispatch } from "@/store";
import { Box, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns: GridColDef[] = [
    {
        field: 'index',
        headerName: '#',
        width: 50,
        renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1, // Index starts from 1
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'totalPoints', headerName: 'Total Points', flex: 1 },
    { field: 'totalGoals', headerName: 'Total Goals', flex: 1 },
    { field: 'totalAltPoints', headerName: 'Total Alternate Points', flex: 1 },
    { field: 'registrationDate', headerName: 'Date of Registration', flex: 1 },
  ];


const RankingsPage = () => {
    const dispatch: AppDispatch = useDispatch()

    const isLoading = useSelector(selectRankingIsLoading);

    useEffect(() => {
        dispatch(fetchRankings())
    }, [dispatch])

    const allRankings = useSelector(selectAllRankings)

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <Box display="flex">
            {allRankings.map(ranking => (
                <Box display="flex" flexDirection="column" alignItems="center" flex={1}>
                    <Box>Group: {ranking.group}</Box>
                    <Box width="100%">
                        <DataGrid
                            rows={ranking.teams}
                            columns={columns}
                            getRowId={row => row.name}
                            autoHeight
                            disableColumnMenu
                            disableColumnSorting
                            hideFooterPagination
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
                </Box>
            )
            )}
        </Box>
    );
};

export default RankingsPage;