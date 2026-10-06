import api from "./api";

export const getPublicResume = async () => {
    const response = await api.get("/public/resume");
    return response.data;
};