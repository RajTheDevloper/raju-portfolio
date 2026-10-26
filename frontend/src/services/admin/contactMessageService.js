import api from "../api";

export const getContactMessages = async (status) => {
    const response = await api.get("/admin/contact", {
        params: status && status !== "ALL" ? { status } : {},
    });

    return response.data;
};

export const getUnreadMessageCount = async () => {
    const response = await api.get("/admin/contact/unread-count");
    return response.data;
};

export const markContactMessageAsRead = async (id) => {
    const response = await api.post(`/admin/contact/${id}/read`);
    return response.data;
};

export const markContactMessageAsUnread = async (id) => {
    const response = await api.post(`/admin/contact/${id}/unread`);
    return response.data;
};

export const archiveContactMessage = async (id) => {
    const response = await api.post(`/admin/contact/${id}/archive`);
    return response.data;
};

export const deleteContactMessage = async (id) => {
    await api.delete(`/admin/contact/${id}`);
};