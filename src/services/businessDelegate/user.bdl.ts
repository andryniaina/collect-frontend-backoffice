import axiosInstance from "./axiosInstance";

interface ErrorResponse{
    isError : true, response : any
}

type ApiResponse = any | ErrorResponse;

export const login = async (username: string, password: string): Promise<ApiResponse> => {
    let data = JSON.stringify({
        "email": username,
        "password": password
    });

    try {
        const response = await axiosInstance.post('/login', data)
        if (response?.data?.access_token) return response as any
        else return { isError: true, response }
    } catch (error) {
        throw error;
    }
}

export const getUsers = async () => {
    try {
        return await axiosInstance.get('/users')
    } catch (error) {
        throw error;
    }
}

export const addUser = async (payload: any) => {
    let data = JSON.stringify(payload);
    try {
        return await axiosInstance.post('/user', data)
    } catch (error) {
        throw error;
    }
}