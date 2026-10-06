import api from "./api";

export const getPublicProjects = async () => {
    const response = await api.get("/public/projects");

    return response.data;
};

export const getPublicProjectBySlug = async (slug) => {
    const response = await api.get(
        `/public/projects/${slug}`
    );

    return response.data;
};

// This calls your existing backend endpoint:
// GET http://localhost:8081/api/public/projects