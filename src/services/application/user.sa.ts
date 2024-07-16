import * as bdl from "../businessDelegate/user.bdl"

export const loginSA = async (username: string, password: string) => {
    return await bdl.login(username, password)
}

export const getUsersSA = async () => {
    return await bdl.getUsers();
}

export const addUserSA = async (data: any) => {
    return await bdl.addUser(data);
}
