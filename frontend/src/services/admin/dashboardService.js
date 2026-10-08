import api from "../api";

export const getAdminDashboard = async () => {
    const response = await api.get("/admin/dashboard");

    return response.data;
};


part 