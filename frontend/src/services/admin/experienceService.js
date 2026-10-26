import api from "../api";

// Get all experiences for admin management
export const getAdminExperiences = async () => {
    const response = await api.get("/admin/experiences");
    return response.data;
};

// Get a single experience by ID
export const getAdminExperienceById = async (id) => {
    const response = await api.get(`/admin/experiences/${id}`);
    return response.data;
};

// Create a new experience
export const createExperience = async (experienceData) => {
    const response = await api.post(
        "/admin/experiences",
        experienceData
    );
    return response.data;
};

// Update an existing experience
export const updateExperience = async (id, experienceData) => {
    const response = await api.put(
        `/admin/experiences/${id}`,
        experienceData
    );
    return response.data;
};

// Delete an experience
export const deleteExperience = async (id) => {
    const response = await api.delete(
        `/admin/experiences/${id}`
    );
    return response.data;
};

// Publish an experience
export const publishExperience = async (id) => {
    const response = await api.post(
        `/admin/experiences/${id}/publish`
    );
    return response.data;
};

// Archive an experience
export const archiveExperience = async (id) => {
    const response = await api.post(
        `/admin/experiences/${id}/archive`
    );
    return response.data;
};

// Unpublish an experience
export const unpublishExperience = async (id) => {
    const response = await api.post(
        `/admin/experiences/${id}/unpublish`
    );
    return response.data;
};
