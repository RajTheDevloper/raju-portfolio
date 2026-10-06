import api from "./api";

export const getPublicEducation = async () => {
    const response = await api.get("/public/educations");
    return response.data;
};