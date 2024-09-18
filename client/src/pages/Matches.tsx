import EditMatch from "@/components/EditMatch";
import { fetchMatches, postMatches } from "@/redux/matches/actions";
import { selectAllMatches } from "@/redux/matches/selectors";
import { AppDispatch } from "@/store";
import { Button, Drawer, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { isNil } from "lodash";
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

    const [id, setId] = useState<number | null>(null)

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
        { 
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <Button onClick={() => setId(params.row.id)}>
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
            <DataGrid
                rows={allMatches}
                columns={columns}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
            />
            <Drawer open={!isNil(id)} onClose={() => setId(null)}>
                {!isNil(id) && <EditMatch id={id} />}
            </Drawer>
        </>
    );
};

export default MatchesPage;