import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserLogout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:4000";

                if (!token) {
                    console.warn("No token found, redirecting to login.");
                    navigate("/login");
                    return;
                }

                // Send logout request to backend
                const response = await axios.get(`${BASE_URL}/api/users/logout`, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true, // Ensure cookies and authentication headers are sent
                });

                // Log the response for debugging
                console.log("API response:", response);

                if (response.status === 200) {
                    localStorage.removeItem("token");  // Remove token after logout
                    navigate("/login");  // Redirect to login page
                } else {
                    console.warn("Logout failed, redirecting to signup.");
                    navigate("/signup");
                }
            } catch (error) {
                // Handle error and redirect even if the request fails
                console.error("Logout failed:", error.response?.data || error);
                localStorage.removeItem("token");  // Make sure token is cleared in case of error
                navigate("/login");  // Redirect to login page
            }
        };

        logoutUser();
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default UserLogout;
