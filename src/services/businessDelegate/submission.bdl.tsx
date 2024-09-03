import axios from "./axiosInstance";

export const getSubmissionsByFormId = async (formId: string) => {
  try {
    const response = await axios.get(`submissions/form/${formId}`);
    console.log("Response=> ",response.data) ;
    return response.data;
  } catch (error) {
    console.error(error);
  }
};