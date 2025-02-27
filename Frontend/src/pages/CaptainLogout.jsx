import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const CaptainLogout = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const logoutCaptain = async () => {
        try {
            const token = localStorage.getItem('token');
            const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:4000';
            if (!token) {
              console.warn('No token found, redirecting to login.');
              navigate('/captain-login');
              return;
            }
            
            const response = await axios.get(`${BASE_URL}/api/captains/logout`, {
              headers: { Authorization: `Bearer ${token}` },
              withCredentials: true,
            });
    
            console.log('API response:', response);
    
            if (response.status === 200) {
                localStorage.removeItem('token');
                navigate('/captain-login');
            }
            else {
                console.warn('Logout failed, redirecting to signup.');
                navigate('/captain-signup');
            }
        } catch (error) {
            console.error('Logout failed:', error.response?.data || error);
            localStorage.removeItem('token');
            navigate('/captain-login');
            
        }

      }
        logoutCaptain();
    }, [navigate])
    

  return <div>Logging out...</div>
}

export default CaptainLogout