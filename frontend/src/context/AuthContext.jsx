import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext(null);

const TOKEN_KEY = "portfolio_admin_token";
const USER_KEY = "portfolio_admin_user";

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        () => localStorage.getItem(TOKEN_KEY)
    );

    const [user, setUser] = useState(
        () => {
            const storedUser =
                localStorage.getItem(USER_KEY);

            if (!storedUser) {
                return null;
            }

            try {
                return JSON.parse(storedUser);
            } catch {
                return null;
            }
        }
    );

    const isAuthenticated = Boolean(token);

    const login = (authData) => {

        const receivedToken =
            authData?.token ||
            authData?.accessToken;

        const receivedUser =
            authData?.user ||
            authData?.admin ||
            null;

        if (!receivedToken) {
            throw new Error(
                "Authentication token was not returned by the server."
            );
        }

        localStorage.setItem(
            TOKEN_KEY,
            receivedToken
        );

        if (receivedUser) {
            localStorage.setItem(
                USER_KEY,
                JSON.stringify(receivedUser)
            );
        }

        setToken(receivedToken);
        setUser(receivedUser);
    };

    const logout = () => {

        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);

        setToken(null);
        setUser(null);

        localStorage.removeItem("adminAuth");
    };

    useEffect(() => {

        if (!token) {
            return;
        }

        localStorage.setItem(
            TOKEN_KEY,
            token
        );

    }, [token]);

    const value = {
        token,
        user,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider."
        );
    }

    return useContext(AuthContext);
};