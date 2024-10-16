import axios from "./axiosInstance";


export const postProjectForm = async (formData: any) => {
  try {
    const response = await axios.post(`project`, formData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectForm = async () => {
  try {
    const response = await axios.get(`project`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProjectForm = async (id: string, updateDto: any) => {
  try {
    await axios.put(`project/${id}`, updateDto);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProjectForm = async (id: string) => {
  try {
    await axios.delete(`project/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export const findProjectForm = async (id: string) => {
  try {
    const response = await axios.get(`project/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

