import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
    LockKeyhole,
    User,
    LogIn,
    AlertCircle
} from "lucide-react";

import { loginAdmin } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const AdminLoginPage = () => {

    const navigate = useNavigate();

    const {
        isAuthenticated,
        login
    } = useAuth();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (isAuthenticated) {
        return (
            <Navigate
                to="/admin"
                replace
            />
        );
    }

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setLoading(true);

        try {

            const authData =
                await loginAdmin(formData);

            login(authData);

            navigate(
                "/admin",
                { replace: true }
            );

        } catch (err) {

            const message =
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Invalid username or password.";

            setError(message);

        } finally {

            setLoading(false);

        }
    };

    return (
        <main className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-header">

                    <div className="admin-login-icon">
                        <LockKeyhole size={25} />
                    </div>

                    <span className="section-eyebrow">
                        Admin
                    </span>

                    <h1>
                        Welcome back
                    </h1>

                    <p>
                        Sign in to manage your portfolio.
                    </p>

                </div>


                <form
                    className="admin-login-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label htmlFor="username">
                            Username
                        </label>

                        <div className="input-wrapper">

                            <User size={17} />

                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"
                                autoComplete="username"
                                required
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label htmlFor="password">
                            Password
                        </label>

                        <div className="input-wrapper">

                            <LockKeyhole size={17} />

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                required
                            />

                        </div>

                    </div>


                    {error && (
                        <div className="admin-login-error">

                            <AlertCircle size={18} />

                            <span>
                                {error}
                            </span>

                        </div>
                    )}


                    <button
                        type="submit"
                        className="btn btn-primary admin-login-button"
                        disabled={loading}
                    >

                        {loading ? (
                            <>
                                <span className="contact-spinner" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                <LogIn size={17} />
                                Sign In
                            </>
                        )}

                    </button>

                </form>

            </div>

        </main>
    );
};

export default AdminLoginPage;