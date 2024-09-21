import { baseURL } from '@/constants';

import axios, { AxiosError, AxiosResponse } from "axios"
import { Response, UserDetails } from '@/types';
import { isNil } from 'lodash';
 
export function BaseAPI() {
    const token = localStorage.getItem('tap auth token')
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            ...(token && {'Authorization': "Bearer " + token})
        }
    })
    return client
}

export async function handleRequest<I, O>(
    request: Promise<AxiosResponse<I>>,
    serializer?: (apiData: I) => O
): Promise<Response<O>> {
    return request
    .then(({data, status}: AxiosResponse) => ({
        status: String(status),
        data: !isNil(serializer) ? serializer(data) : data
    }))
    .catch((error: AxiosError) => {
        const {response } = error;
        const data = response?.data as { message: string }
        const message = data?.message ?? "Unexpected Error. Please refresh the page and try again, or contact the repository owner to resolve the issue if it persists."
        return {
            status: String(response?.status ?? 500),
            error: message
        }
    })
}

export function GeneralAPI() {
    const client = BaseAPI();

    return {
        clearDatabase: () => handleRequest(
            client.post('/clear_database')
        ),
        signup: (data: UserDetails) => handleRequest(
            client.post('/signup', data)
        ),
        login: (data: UserDetails) => handleRequest(
            client.post('/login', data)
        ),
    }
}