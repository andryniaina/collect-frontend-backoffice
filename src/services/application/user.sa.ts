import * as bdl from "../businessDelegate/user.bdl";

export const loginSA = async (username: string, password: string) => {
  return await bdl.login(username, password);
};

export const getUsersSA = async () => {
  return await bdl.getUsers();
};

export const addUserSA = async (data: any) => {
  return await bdl.addUser(data);
};

export const createUserGroupSa = async (data: any) => {
  return await bdl.createUserGroup(data);
};

export const getGroupsSa = async () => {
  return await bdl.getGroups();
};

export const getGroupSa = async (id: string) => {
  return await bdl.getGroup(id);
};

export const deleteGroupSa = async (id: string) => {
  return await bdl.deleteGroup(id);
};

export const updateGroupSa = async (id: string, payload: any) => {
  return await bdl.updateGroup(id, payload);
};
