export interface Response<O = Record<string, unknown>> {
    status: string;
    data?: O;
    error?: string
}

// CLIENT SCHEMA

export type MatchOutcomeData = {
    teamGoals: number;
    opponentGoals: number;
    outcome: string;
}


export type TeamData = {
    name: string;
    registrationDate: string;
    group: string;
    matches?: MatchOutcomeData[];
}

export type TeamMatchData = {
    teamName: string;
    goals: number;
}

export type MatchData = {
    id: number;
    teamMatches: TeamMatchData[];
}

export type RankingData = TeamData & {
    totalPoints: number;
    totalGoals: number;
    totalAltPoints: number;
}

// API SCHEMA

export type MatchOutcomeAPIData = {
    team_goals: number;
    opponent_goals: number;
    outcome: string;
}

export type TeamAPIData = {
    name: string;
    registration_date: string;
    group: string;
    matches?: MatchOutcomeAPIData[];
}

export type TeamMatchAPIData = {
    team_name: string;
    goals: number;
}

export type MatchAPIData = {
    id: number;
    team_matches: TeamMatchAPIData[];
}

export type RankingAPIData = TeamAPIData & {
    total_points: number;
    total_goals: number;
    total_alt_points: number;
}