import { fetchMatches, postMatches } from "@/redux/matches/actions";
import { selectAllMatches } from "@/redux/matches/selectors";
import { AppDispatch } from "@/store";
import { Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Match ID', width: 130},
    { 
        field: 'teamNameA', 
        headerName: 'Team A Name',
        width: 130,
        valueGetter: (_, row) => row.teamMatches[0].teamName
    },
    { 
        field: 'goalsA', 
        headerName: 'Team A Goals',
        width: 130,
        valueGetter: (_, row) => row.teamMatches[0].goals
    },
    { 
        field: 'teamNameB', 
        headerName: 'Team B Name',
        width: 130,
        valueGetter: (_, row) => row.teamMatches[1].teamName
    },
    { 
        field: 'goalsB', 
        headerName: 'Team B Goals',
        width: 130,
        valueGetter: (_, row) => row.teamMatches[1].goals
    },
  ];


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
            <DataGrid
                rows={allMatches}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </>
    );
};

export default MatchesPage;