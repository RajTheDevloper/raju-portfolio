
import api from "../api";

export const getAdminMedia = async () => {
    const response = await api.get("/admin/media");
    return response.data;
};

export const uploadAdminMedia = async (file, mediaType) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("mediaType", mediaType);

    const response = await api.post("/admin/media", formData);

    return response.data;
};

export const getAdminMediaById = async (id) => {
    const response = await api.get(`/admin/media/${id}`);
    return response.data;
};
