import * as bdl from "../businessDelegate/form.bdl";

export const postForm = async (formData: any) => {
  try {
    const response = await bdl.postForm(formData);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
