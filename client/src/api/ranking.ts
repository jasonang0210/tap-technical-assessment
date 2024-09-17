import { BaseAPI, handleRequest } from "@/api/base";
import { rankingSerializer } from "@/api/serializer";
import { RankingAPIData } from "@/types";

export const RankingsAPIRoutes = {
    fetch: '/rankings',
}

function RankingsAPI() {
    const client = BaseAPI();

    return {
        fetchAll: () => handleRequest(
            client.get(RankingsAPIRoutes.fetch),
            (apiData: RankingAPIData[]) => apiData.map(apiObj => rankingSerializer.serialize(apiObj))
        ),
    }
}

export const rankingsAPI = RankingsAPI()