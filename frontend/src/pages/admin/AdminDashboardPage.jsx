import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const AdminDashboardPage = () => {

    const navigate = useNavigate();

    const {
        logout
    } = useAuth();


    const handleLogout = () => {

        logout();

        navigate(
            "/admin/login",
            { replace: true }
        );
    };


    return (
        <main>

            <h1>Admin Dashboard</h1>

            <button
                type="button"
                onClick={handleLogout}
            >
                Logout
            </button>

        </main>
    );
};


export default AdminDashboardPage;