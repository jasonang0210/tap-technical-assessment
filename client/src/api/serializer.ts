import { TeamAPIData, TeamData } from "@/types";

function TeamSerializer() {
    return {
        serialize: (apiObj: TeamAPIData): TeamData => ({
            name: apiObj.name,
            registrationDate: apiObj.registration_date,
            group: apiObj.group
        })
    }
}

export const teamSerializer = TeamSerializer()
