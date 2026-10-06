import api from "./api";

export const getPublicExperience = async () => {
    const response = await api.get("/public/experiences");
    return response.data;
};