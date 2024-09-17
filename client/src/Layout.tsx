import { Link, Outlet } from "react-router-dom"

const Layout = () => {

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
        <Outlet />
    </>
  )
}

export default Layout
