import * as bdl from "../businessDelegate/form.bdl";

export const postForm = async (formData: any) => {
  try {
    const response = await bdl.postForm(formData);
    return response ;
  } catch (error) {
    console.error(error);
  }
};

export const getForms = async() => {
  try {
    const forms = await bdl.getForms() ;
    return forms ;
  } catch(error) {
    return [] ;
  }
}

export const deleteForm = async(formId: string) => {
  try {
    await bdl.deleteForm(formId) ;
  } catch(error) {
    console.error(error) ;
  }
}

export const updateForm = async(id: string, updateDto: any) => {
  try {
    await bdl.updateForm(id,updateDto)
  } catch(error) {
    console.error(error) ;
  }
}

export const findForm = async(id: string) => {
  try {
    return await bdl.findForm(id) ;
  } catch(error) {
    console.error(error)
  }
}