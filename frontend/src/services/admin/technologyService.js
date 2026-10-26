
import api from "../api";

export const getAdminTechnologies = async () => {
    const response = await api.get("/admin/technologies");
    return response.data;
};

export const getAdminTechnologyById = async (id) => {
    const response = await api.get(`/admin/technologies/${id}`);
    return response.data;
};

export const createAdminTechnology = async (technologyData) => {
    const response = await api.post(
        "/admin/technologies",
        technologyData
    );
    return response.data;
};

export const updateAdminTechnology = async (id, technologyData) => {
    const response = await api.put(
        `/admin/technologies/${id}`,
        technologyData
    );
    return response.data;
};

export const deleteAdminTechnology = async (id) => {
    const response = await api.delete(`/admin/technologies/${id}`);
    return response.data;
};
