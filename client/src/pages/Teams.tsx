import EditTeam from "@/components/EditTeam";
import { fetchTeams, postTeams } from "@/redux/teams/actions";
import { selectAllTeams, selectTeamIsLoading } from "@/redux/teams/selectors";
import { AppDispatch } from "@/store";
import { Box, Button, CircularProgress, Drawer, TextField } from "@mui/material";
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

    const isLoading = useSelector(selectTeamIsLoading);

    const [data, setData] = useState<string>("");

    const submitData = async () => {
        await dispatch(postTeams(data))
        dispatch(fetchTeams())
        setData("")
    }

    const [name, setName] = useState<string | null>(null)

    const columns: GridColDef[] = [
        { 
            field: 'name',
            headerName: 'Name',
            flex: 1,
            renderCell: (params) => (
                <Link to={`/team/${params.value}`}>
                    {params.value}
                </Link>
            )
        },
        { field: 'registrationDate', headerName: 'Date of Registration', flex: 1 },
        { field: 'group', headerName: 'Group Number', flex: 1 },
        { 
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <Button onClick={() => setName(params.row.name)}>
                    Edit
                </Button>
            )
        },
      ];

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center">
                <CircularProgress />
            </Box>
        )
    }

    return (
        <>
        <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column" flex={1}>
                <TextField
                label="Input your teams in the format <team> <registration date in DD/MM> <group number>. There should be 1 team per line. "
                multiline
                value={data}
                onChange={e => setData(e.target.value)}
                maxRows={12}
                />
                <Button variant="contained" onClick={submitData}>Add Team(s)</Button>
            </Box>
            <Box flex={1}>
                <DataGrid
                    rows={allTeams}
                    columns={columns}
                    getRowId={row => row.name}
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
        </Box>
        <Drawer open={!isNil(name)} onClose={() => setName(null)} anchor="bottom"         
            PaperProps={{
            sx: {
                height: '30vh',
                minHeight: '300px'
            },
            }}>
            {!isNil(name) && <EditTeam name={name} onClose={() => setName(null)}/>}
        </Drawer>
        </>
    );
};

export default TeamsPage;