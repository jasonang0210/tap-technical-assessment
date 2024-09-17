import { BaseAPI, handleRequest } from "@/api/base";
import { matchSerializer } from "@/api/serializer";
import { MatchAPIData } from "@/types";

export const MatchesAPIRoutes = {
    fetch: '/matches',
    post: '/record',
}

function MatchesAPI() {
    const client = BaseAPI();

    return {
        fetchAll: () => handleRequest(
            client.get(MatchesAPIRoutes.fetch),
            (apiData: MatchAPIData[]) => apiData.map(apiObj => matchSerializer.serialize(apiObj))
        ),
        postMultiple: (data: string) => handleRequest(
            client.post(MatchesAPIRoutes.post, {data: data})
        )
    }
}

export const matchesAPI = MatchesAPI()