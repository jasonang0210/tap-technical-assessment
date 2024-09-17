import { MatchAPIData, MatchData, MatchOutcomeAPIData, MatchOutcomeData, RankingAPIData, RankingData, TeamAPIData, TeamData, TeamMatchAPIData, TeamMatchData } from "@/types";


function MatchOutcomeSerializer() {
    return {
        serialize: (apiObj: MatchOutcomeAPIData): MatchOutcomeData => ({
            teamGoals: apiObj.team_goals,
            opponentGoals: apiObj.opponent_goals,
            outcome: apiObj.outcome 
        })
    } 
}

const matchOutcomeSerializer = MatchOutcomeSerializer()

function TeamSerializer() {
    return {
        serialize: (apiObj: TeamAPIData): TeamData => ({
            name: apiObj.name,
            registrationDate: apiObj.registration_date,
            group: apiObj.group,
            matches: apiObj.matches ? apiObj.matches.map(matchOutcomeSerializer.serialize) : undefined
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

function RankingSerializer() {
    return {
        serialize: (apiObj: RankingAPIData): RankingData => ({
            ...teamSerializer.serialize(apiObj),
            totalPoints: apiObj.total_points,
            totalGoals: apiObj.total_goals,
            totalAltPoints: apiObj.total_alt_points,
        })
    }
}

export const rankingSerializer = RankingSerializer()
