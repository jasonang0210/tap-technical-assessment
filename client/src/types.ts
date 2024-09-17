export interface Response<O = Record<string, unknown>> {
    status: string;
    data?: O;
    error?: string
}

export type TeamData = {
    name: string;
    registrationDate: string;
    group: string;
}

export type TeamAPIData = {
    name: string;
    registration_date: string;
    group: string;
}

export type TeamMatchData = {
    teamName: string;
    goals: number;
}

export type MatchData = {
    id: number;
    teamMatches: TeamMatchData[];
}

export type TeamMatchAPIData = {
    team_name: string;
    goals: number;
}

export type MatchAPIData = {
    id: number;
    team_matches: TeamMatchAPIData[];
}