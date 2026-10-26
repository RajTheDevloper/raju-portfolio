
import api from "../api";

/**
 * Fetch revision history for a specific content item.
 *
 * Example:
 * getProjectRevisions(2)
 * GET /api/admin/revisions?contentType=PROJECT&contentId=2
 */
export const getProjectRevisions = async (projectId) => {
    const response = await api.get("/admin/revisions", {
        params: {
            contentType: "PROJECT",
            contentId: projectId,
        },
    });

    return response.data;
};
