
import api from "../api";

export const getAdminSkills = async () => {
  const response = await api.get("/admin/skills");
  return response.data;
};

export const getAdminSkillById = async (id) => {
  const response = await api.get(`/admin/skills/${id}`);
  return response.data;
};

export const createSkill = async (skillData) => {
  const response = await api.post("/admin/skills", skillData);
  return response.data;
};

export const updateSkill = async (id, skillData) => {
  const response = await api.put(`/admin/skills/${id}`, skillData);
  return response.data;
};

export const deleteSkill = async (id) => {
  await api.delete(`/admin/skills/${id}`);
};

export const publishSkill = async (id) => {
  const response = await api.post(`/admin/skills/${id}/publish`);
  return response.data;
};

export const unpublishSkill = async (id) => {
  const response = await api.post(`/admin/skills/${id}/unpublish`);
  return response.data;
};

export const archiveSkill = async (id) => {
  const response = await api.post(`/admin/skills/${id}/archive`);
  return response.data;
};
