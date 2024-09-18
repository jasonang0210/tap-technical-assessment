import { BaseAPI, handleRequest } from "@/api/base"
import { Button } from "@mui/material"
import { Link, Outlet } from "react-router-dom"

const Layout = () => {

    const client = BaseAPI()

    return (
        <>
                <div>
                    <Link to="/" replace>Ranking</Link> 
                </div>
                <div>
                    <Link to="/teams" replace>Teams</Link>
                </div>
                <div>
                    <Link to="/matches" replace>Matches</Link>
                </div>
                <Button onClick={() => handleRequest(client.post('/delete_all'))}>Delete All</Button>
            <Outlet />
        </>
    )
}

export default Layout
