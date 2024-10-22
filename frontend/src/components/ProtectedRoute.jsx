import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api from '../utils/api';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post('/auth/refresh-token', { refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.accessToken);
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.error(error);
      setIsAuthorized(false);
    }
  }

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    
    if (!token) {
      setIsAuthorized(false);
      return;
    }
    
    const decoded = jwtDecode(token);
    const decodedExp = decoded.exp * 1000;
    const now = Date.now();

    if (decodedExp < now) {
      await refreshToken();
    } else {
      setIsAuthorized(true);
    }
  }

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;