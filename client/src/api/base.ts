import { baseURL } from '@/constants';

import axios, { AxiosError, AxiosResponse } from "axios"
import { Response } from '@/types';
import { isNil } from 'lodash';
 
export function BaseAPI() {
    const client = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json'
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
        data: !isNil(serializer) ? serializer(data) : undefined
    }))
    .catch((error: AxiosError) => {
        const {response, message} = error;
        return {
            status: String(response?.status ?? 500),
            error: message
        }
    })
}
