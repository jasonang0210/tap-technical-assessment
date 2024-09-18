import { BaseAPI, handleRequest } from "@/api/base";
import { teamSerializer } from "@/api/serializer";
import { TeamAPIData } from "@/types";

export const TeamsAPIRoutes = {
    fetch: '/teams',
    post: '/teams',
    patch: '/teams'
}

function TeamsAPI() {
    const client = BaseAPI();

    return {
        fetchAll: () => handleRequest(
            client.get(TeamsAPIRoutes.fetch),
            (apiData: TeamAPIData[]) => apiData.map(apiObj => teamSerializer.serialize(apiObj))
        ),
        fetchSingle: (name: string) => handleRequest(
            client.get(`${TeamsAPIRoutes.fetch}/${name}`),
            teamSerializer.serialize
        ),
        postMultiple: (data: string) => handleRequest(
            client.post(TeamsAPIRoutes.post, {data: data})
        ),
        patch: (name: string, data: string) => handleRequest(
            client.patch(`${TeamsAPIRoutes.patch}/${name}`, {data: data})
        )
    }
}

export const teamsAPI = TeamsAPI()