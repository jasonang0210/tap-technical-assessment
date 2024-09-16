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