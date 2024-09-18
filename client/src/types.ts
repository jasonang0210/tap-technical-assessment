export interface Response<O = Record<string, unknown>> {
    status: string;
    data?: O;
    error?: string
}

// CLIENT SCHEMA

export type MatchOutcomeData = {
    teamGoals: number;
    opponentTeamName: string;
    opponentGoals: number;
    outcome: string;
}


export type TeamData = {
    name: string;
    registrationDate: string;
    group: string;
    matches?: MatchOutcomeData[];
    totalPoints?: number;
    totalGoals?: number;
    totalAltPoints?: number;
}

export type TeamMatchData = {
    teamName: string;
    goals: number;
}

export type MatchData = {
    id: number;
    teamMatches: TeamMatchData[];
}

export type RankedGroupData = {
    group: string;
    teams: TeamData[]
}

// API SCHEMA

export type MatchOutcomeAPIData = {
    team_goals: number;
    opponent_team_name: string;
    opponent_goals: number;
    outcome: string;
}

export type TeamAPIData = {
    name: string;
    registration_date: string;
    group: string;
    matches?: MatchOutcomeAPIData[];
    total_points?: number;
    total_goals?: number;
    total_alt_points?: number;
}

export type TeamMatchAPIData = {
    team_name: string;
    goals: number;
}

export type MatchAPIData = {
    id: number;
    team_matches: TeamMatchAPIData[];
}

export type RankedGroupAPIData = {
    group: string;
    teams: TeamAPIData[]
}