import axios from "./axiosInstance";

export const postForm = async (formData: any) => {
  try {
    const response = await axios.post(`forms`, formData);
    return response.data
  } catch (error) {
    console.error(error);
  }
};

export const getForms = async () => {
  try {
    const response = await axios.get("forms");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error) ;
    return [];
  }
};

export const deleteForm = async(formId: string) => {
  try {
    await axios.delete(`forms/${formId}`) ;
  } catch(error) {
    console.error(error) ;
  }
}

export const updateForm = async(id: string, updateDto: any) => {
  try {
    await axios.put(`forms/${id}`,updateDto) ;
  } catch(error) {
    console.error(error) ;
  }
}

export const findForm = async(id:string) => {
  try {
    const response = await axios.get(`forms/${id}`) ;
    return response.data
  } catch(error) {
    console.error(error)
  }
}