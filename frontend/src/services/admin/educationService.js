
import api from "../api";

export const getAdminEducations = async () => {
  const response = await api.get("/admin/educations");
  return response.data;
};

export const getAdminEducationById = async (id) => {
  const response = await api.get(`/admin/educations/${id}`);
  return response.data;
};

export const createEducation = async (educationData) => {
  const response = await api.post("/admin/educations", educationData);
  return response.data;
};

export const updateEducation = async (id, educationData) => {
  const response = await api.put(
    `/admin/educations/${id}`,
    educationData
  );
  return response.data;
};

export const deleteEducation = async (id) => {
  await api.delete(`/admin/educations/${id}`);
};

export const publishEducation = async (id) => {
  const response = await api.post(`/admin/educations/${id}/publish`);
  return response.data;
};

export const unpublishEducation = async (id) => {
  const response = await api.post(`/admin/educations/${id}/unpublish`);
  return response.data;
};

export const archiveEducation = async (id) => {
  const response = await api.post(`/admin/educations/${id}/archive`);
  return response.data;
};
