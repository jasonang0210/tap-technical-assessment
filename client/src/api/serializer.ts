import { MatchAPIData, MatchData, TeamAPIData, TeamData, TeamMatchAPIData, TeamMatchData } from "@/types";

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

function TeamMatchSerializer() {
    return {
        serialize: (apiObj: TeamMatchAPIData): TeamMatchData => ({
            teamName: apiObj.team_name,
            goals: apiObj.goals,
        })
    }
}

const teamMatchSerializer = TeamMatchSerializer()


function MatchSerializer() {
    return {
        serialize: (apiObj: MatchAPIData): MatchData => ({
            id: apiObj.id,
            teamMatches: apiObj.team_matches.map(teamMatchSerializer.serialize)
        })
    }
}

export const matchSerializer = MatchSerializer()
