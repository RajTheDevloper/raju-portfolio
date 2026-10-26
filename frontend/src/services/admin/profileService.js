import api from "../api";

export const getAdminProfile = async () => {
    const response = await api.get("/admin/profile");

    return response.data;
};

export const updateAdminProfile = async (profileData) => {
    const response = await api.put(
        "/admin/profile",
        profileData
    );

    return response.data;
};