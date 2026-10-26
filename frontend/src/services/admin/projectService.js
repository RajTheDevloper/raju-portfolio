import api from "../api";

export const getAdminProjects = async (params = {}) => {
    const response = await api.get("/admin/projects", {
        params
    });

    return response.data;
};

export const createAdminProject = async (projectData) => {
    const response = await api.post(
        "/admin/projects",
        projectData
    );

    return response.data;
};

export const updateAdminProject = async (id, projectData) => {
    const response = await api.put(
        `/admin/projects/${id}`,
        projectData
    );

    return response.data;
};

export const publishAdminProject = async (id) => {
    const response = await api.post(
        `/admin/projects/${id}/publish`
    );

    return response.data;
};

export const unpublishAdminProject = async (id) => {
    const response = await api.post(
        `/admin/projects/${id}/unpublish`
    );

    return response.data;
};

export const archiveAdminProject = async (id) => {
    const response = await api.post(
        `/admin/projects/${id}/archive`
    );

    return response.data;
};

export const getProjectDraftPreview = async (projectId) => {
    const response = await api.get(
        `/admin/projects/${projectId}/preview`
    );

    return response.data;
};