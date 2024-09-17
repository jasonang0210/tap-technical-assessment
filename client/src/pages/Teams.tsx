import { fetchTeams, postTeams } from "@/redux/teams/actions";
import { selectAllTeams } from "@/redux/teams/selectors";
import { AppDispatch } from "@/store";
import { Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'registrationDate', headerName: 'Date of Registration', width: 130 },
    { field: 'group', headerName: 'Group Number', width: 130 },
  ];

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
        <DataGrid
            rows={allTeams}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0 }}
            getRowId={row => row.name}
        />
        </>
    );
};

export default TeamsPage;