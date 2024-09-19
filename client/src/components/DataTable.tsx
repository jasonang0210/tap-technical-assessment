
import { DataGrid, GridColDef } from "@mui/x-data-grid";


type Props<DataType> = {
    data: DataType[];
    columns: GridColDef[];
    accessor?: string;
}

function DataTable<DataType>({data, columns, accessor = "id"}: Props<DataType>) {

    return (
        <DataGrid
            rows={data}
            columns={columns}
            getRowId={row => row[accessor]}
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
    );
};

export default DataTable;