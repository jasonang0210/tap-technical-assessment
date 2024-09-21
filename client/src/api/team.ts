import { BaseAPI, handleRequest } from "@/api/base";
import { rankingSerializer, teamSerializer } from "@/api/serializer";
import { RankedGroupAPIData, TeamAPIData } from "@/types";

export const TeamsAPIRoutes = 'teams'

export function TeamsAPI() {
    const client = BaseAPI();

    return {
        fetchAll: () => handleRequest(
            client.get(TeamsAPIRoutes),
            (apiData: TeamAPIData[]) => apiData.map(apiObj => teamSerializer.serialize(apiObj))
        ),
        fetchRanked: () => handleRequest(
            client.get(`${TeamsAPIRoutes}?ranked=true`),
            (apiData: RankedGroupAPIData[]) => apiData.map(apiObj => rankingSerializer.serialize(apiObj))
        ),
        fetchSingle: (name: string) => handleRequest(
            client.get(`${TeamsAPIRoutes}/${name}`),
            teamSerializer.serialize
        ),
        postMultiple: (data: string) => handleRequest(
            client.post(TeamsAPIRoutes, {data: data})
        ),
        patch: (name: string, data: string) => handleRequest(
            client.patch(`${TeamsAPIRoutes}/${name}`, {data: data})
        ),
    }
}