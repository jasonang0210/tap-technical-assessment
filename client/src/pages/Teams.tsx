import EditTeam from "@/components/EditTeam";
import { fetchTeams, postTeams } from "@/redux/teams/actions";
import { selectAllTeams } from "@/redux/teams/selectors";
import { AppDispatch } from "@/store";
import { Button, Drawer, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { isNil } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

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

    const [name, setName] = useState<string | null>(null)

    const columns: GridColDef[] = [
        { 
            field: 'name',
            headerName: 'Name',
            width: 200,
            renderCell: (params) => (
                <Link to={`/team/${params.value}`}>
                    {params.value}
                </Link>
            )
        },
        { field: 'registrationDate', headerName: 'Date of Registration', width: 130 },
        { field: 'group', headerName: 'Group Number', width: 130 },
        { 
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <Button onClick={() => setName(params.row.name)}>
                    Edit
                </Button>
            )
        },
      ];

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
        <Drawer open={!isNil(name)} onClose={() => setName(null)}>
           {!isNil(name) && <EditTeam name={name} />}
        </Drawer>
        </>
    );
};

export default TeamsPage;