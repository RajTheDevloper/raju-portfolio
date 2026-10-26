
import api from "./api";

export const getPublicTechnologies = async () => {
    const response = await api.get("/public/technologies");
    return response.data;
};
