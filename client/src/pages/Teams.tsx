import { fetchTeams } from "@/redux/actions";
import { selectAllTeams } from "@/redux/selectors";
import { AppDispatch } from "@/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTeams())
    }, [dispatch])

    const allTeams = useSelector(selectAllTeams)

    return (
        <div>
            {allTeams.map(team => (
                <div key={team.name}>{team.name}</div>
            ))}
        </div>
    );
};

export default Home;