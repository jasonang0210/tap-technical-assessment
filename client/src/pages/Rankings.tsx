import { fetchRankings } from "@/redux/rankings/actions";
import { selectAllRankings } from "@/redux/rankings/selectors";
import { AppDispatch } from "@/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'group', headerName: 'Group Number', width: 130 },
    { field: 'totalPoints', headerName: 'Total Points', width: 130 },
    { field: 'totalGoals', headerName: 'Total Goals', width: 130 },
    { field: 'totalAltPoints', headerName: 'Total Alternate Points', width: 130 },
    { field: 'registrationDate', headerName: 'Date of Registration', width: 130 },
  ];


const RankingsPage = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchRankings())
    }, [dispatch])

    const allRankings = useSelector(selectAllRankings)

    return (
        <>
            <DataGrid
                rows={allRankings}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
                getRowId={row => row.name}
            />
        </>
    );
};

export default RankingsPage;