import api from "../api";

export const getResumes = async () => {
    const response = await api.get("/admin/resume");
    return response.data;
};

export const createResume = async (resumeData) => {
    const response = await api.post("/admin/resume", resumeData);
    return response.data;
};

export const updateResume = async (id, resumeData) => {
    const response = await api.put(`/admin/resume/${id}`, resumeData);
    return response.data;
};

export const deleteResume = async (id) => {
    const response = await api.delete(`/admin/resume/${id}`);
    return response.data;
};