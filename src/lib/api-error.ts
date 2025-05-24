import axios, { AxiosError } from 'axios';

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string,
        public originalError: AxiosError
    ) {
        super(message);
    }
}

export const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        throw new ApiError(
            error.response?.status || 500,
            error.response?.data?.message || error.message,
            error
        );
    }
    throw error;
};