import api from "./api";

export const submitContactMessage = async (contactData) => {
    const response = await api.post(
        "/public/contact",
        contactData
    );

    return response.data;
};