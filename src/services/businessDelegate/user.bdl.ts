import axios from "axios";
import axiosInstance from "./axiosInstance";

interface ErrorResponse {
  isError: true;
  response: any;
}

type ApiResponse = any | ErrorResponse;

export const login = async (
  username: string,
  password: string
): Promise<ApiResponse> => {
  let data = JSON.stringify({
    username: username,
    password: password,
  });

  try {
    const response = await axiosInstance.post("/auth/login", data);
    if (response?.data?.access_token) return response as any;
    else return { isError: true, response };
  } catch (error) {
    throw error;
  }
};

export const getUsers = async () => {
  try {
    return await axiosInstance.get("/users");
  } catch (error) {
    throw error;
  }
};

export const addUser = async (payload: any) => {
  let data = JSON.stringify(payload);
  try {
    return await axiosInstance.post("/auth/register", data);
  } catch (error) {
    throw error;
  }
};

export const createUserGroup = async (payload: any) => {
  try {
    return await axiosInstance.post("/users/group", payload);
  } catch (error) {
    throw error;
  }
};

export const getGroups = async () => {
  try {
    const { data } = await axiosInstance.get("/users/group");
    const groups = data.map((group:any)=>{
      group["members"] = group.users.map((user:any)=>user.name).join(",")
      if(group.users.length<=0) {
        group["members"]="Empty";
      }
      return group
    })
    console.log("groups",groups)
    return groups;
  } catch (error) {
    throw error;
  }
};

export const getGroup = async (id: string) => {
  try {
    const { data } = await axiosInstance.get("/users/group/" + id);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroup = async (id: string) => {
  try {
    return await axiosInstance.delete(`/users/group/${id}`);
  } catch (error) {
    throw error;
  }
};

export const updateGroup = async (id: string, payload: any) => {
  try {
    return await axiosInstance.put(`/users/group/${id}`, payload);
  } catch (error) {
    throw error;
  }
};
