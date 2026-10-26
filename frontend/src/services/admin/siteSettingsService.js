
import api from "../api";

export const getSiteSettings = async () => {
    const response = await api.get("/admin/settings");
    return response.data;
};

export const updateSiteSettings = async (settings) => {
    const response = await api.put("/admin/settings", settings);
    return response.data;
};
