import { MatchData, TeamData } from "@/types"

export const isSuccessful = (status: string) => {
    return status === "200"
}

export const convertTeamToString = (team: TeamData) => {
    return `${team.name} ${team.registrationDate} ${team.group}`
}

export const convertMatchToString = (match: MatchData) => {
    return `${match.teamMatches[0].teamName} ${match.teamMatches[1].teamName} ${match.teamMatches[0].goals} ${match.teamMatches[1].goals}`
}