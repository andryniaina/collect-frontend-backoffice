import axios from "./axiosInstance";

export const postForm = async (formData: any) => {
  try {
    const response = await axios.post(`forms`, formData);
    console.log(response);
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
