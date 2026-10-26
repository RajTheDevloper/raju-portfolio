
import { useCallback, useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Settings, RefreshCw } from "lucide-react";
import {
    getSiteSettings,
    updateSiteSettings,
} from "../../services/admin/siteSettingsService";
import SiteSettingsForm from "../../components/admin/settings/SiteSettingsForm";

const AdminSettingsPage = () => {
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadSettings = useCallback(async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const data = await getSiteSettings();
            setSettings(data);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load site settings. Check your connection and admin login."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSettings();
    }, [loadSettings]);

    const handleSave = async (formData) => {
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const updatedSettings = await updateSiteSettings(formData);
            setSettings(updatedSettings);
            setSuccess("Site settings saved successfully.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to save settings. Please check the entered values and try again."
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <RefreshCw size={20} className="settings-spin" />
                <span>Loading site settings...</span>
            </div>
        );
    }

    return (
        <div className="admin-page settings-page">
            <div className="admin-page-header">
                <div>
                    <div className="settings-title-row">
                        <Settings size={25} />
                        <h1>Site Settings</h1>
                    </div>
                    <p>Manage your portfolio's identity, social links, SEO, and site options.</p>
                </div>

                <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={loadSettings}
                    disabled={saving}
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            {error && (
                <div className="settings-alert settings-alert-error" role="alert">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="settings-alert settings-alert-success" role="status">
                    <CheckCircle2 size={18} />
                    <span>{success}</span>
                </div>
            )}

            {settings && (
                <SiteSettingsForm
                    settings={settings}
                    saving={saving}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};

export default AdminSettingsPage;
