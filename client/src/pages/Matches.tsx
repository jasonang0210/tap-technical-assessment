import DataTable from "@/components/DataTable";
import EditMatch from "@/components/EditMatch";
import { fetchMatches, postMatches } from "@/redux/matches/actions";
import { selectAllMatches, selectMatchIsLoading } from "@/redux/matches/selectors";
import { AppDispatch } from "@/store";
import { Box, Button, CircularProgress, Drawer, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { isNil } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


const MatchesPage = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMatches())
    }, [dispatch])

    const allMatches = useSelector(selectAllMatches)
    const isLoading = useSelector(selectMatchIsLoading);

    // data denotes the text input data, to be filled in by the user to add matches
    const [data, setData] = useState<string>("");

    // id denotes the match id that is currently being edited. null denotes none of the matches are being edited currently
    const [id, setId] = useState<number | null>(null)

    const submitData = async () => {
        // once submit, wait for submission, then fetch the updated teams
        await dispatch(postMatches(data))
        dispatch(fetchMatches())
        setData("")
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Match ID', width: 100},
        { 
            field: 'teamNameA', 
            headerName: 'Team A Name',
            flex: 1,
            valueGetter: (_, row) => row.teamMatches[0].teamName
        },
        { 
            field: 'goalsA', 
            headerName: 'Team A Goals',
            flex: 1,
            valueGetter: (_, row) => row.teamMatches[0].goals
        },
        { 
            field: 'teamNameB', 
            headerName: 'Team B Name',
            flex: 1,
            valueGetter: (_, row) => row.teamMatches[1].teamName
        },
        { 
            field: 'goalsB', 
            headerName: 'Team B Goals',
            flex: 1,
            valueGetter: (_, row) => row.teamMatches[1].goals
        },
        { 
            field: 'action',
            headerName: 'Action',
            flex: 1,
            renderCell: (params) => (
                <Button onClick={() => setId(params.row.id)}>
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
            <Box alignSelf="center" sx={{ textTransform: 'uppercase', fontSize: 32 }} mb={2}>Matches Page</Box>
            <Box display="flex" flexDirection="column" flex={1}>
                <TextField
                label="Input your matches in the format <teamA name> <teamB name> <teamA goals> <teamB goals>. There should be 1 match per line. "
                multiline
                value={data}
                onChange={e => setData(e.target.value)}
                maxRows={1000}
                />
                <Button variant="contained" onClick={submitData}>Add Match(es)</Button>
            </Box>
            <Box flex={1}>
                <DataTable data={allMatches} columns={columns} />
            </Box>
        </Box>
        <Drawer open={!isNil(id)} onClose={() => setId(null)} anchor="bottom"         
            PaperProps={{
            sx: {
                height: '30vh',
                minHeight: '300px'
            },
            }}>
            {!isNil(id) && <EditMatch id={id} onClose={() => setId(null)}/>}
        </Drawer>
        </>
    );
};

export default MatchesPage;