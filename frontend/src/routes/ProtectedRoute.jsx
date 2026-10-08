import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{
                    from: location.pathname
                }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;