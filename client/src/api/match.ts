import { BaseAPI, handleRequest } from "@/api/base";
import { matchSerializer } from "@/api/serializer";
import { MatchAPIData } from "@/types";

export const MatchesAPIRoutes = '/matches'

export function MatchesAPI() {
    const client = BaseAPI();

    return {
        fetchAll: () => handleRequest(
            client.get(MatchesAPIRoutes),
            (apiData: MatchAPIData[]) => apiData.map(apiObj => matchSerializer.serialize(apiObj))
        ),
        postMultiple: (data: string) => handleRequest(
            client.post(MatchesAPIRoutes, {data: data})
        ),
        patch: (id: number, data: string) => handleRequest(
            client.patch(`${MatchesAPIRoutes}/${id}`, {data: data})
        ),
    }
}