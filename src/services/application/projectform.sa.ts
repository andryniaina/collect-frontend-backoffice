import * as bld from "../businessDelegate/projectform.bdl";

export const postProjectForm = async (formData: any) => {
  try {
    const response = await bld.postProjectForm(formData);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectForm = async () => {
  try {
    const response = await bld.getProjectForm();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const updateProjectForm = async (id: string, updateDto: any) => {
  try {
    await bld.updateProjectForm(id, updateDto);
  } catch (error) {
    console.error(error);
  }
};

export const deleteProjectForm = async (id: string) => {
  try {
    await bld.deleteProjectForm(id);
  } catch (error) {
    console.error(error);
  }
};

export const findProjectForm = async (id: string) => {
  try {
    return await bld.findProjectForm(id);
  }catch(error){
    console.error(error);
  }
}