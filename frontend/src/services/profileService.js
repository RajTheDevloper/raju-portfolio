import api from "./api";

export const getPublicProfile = async () => {
    const response = await api.get("/public/profile");
    return response.data;
};