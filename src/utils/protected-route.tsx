import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { selectUser, selectIsAuthChecked } from '../services/authSlice';
import { useEffect } from 'react';

interface IProtectedRouteProps {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children, onlyUnAuth = false }) => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <p>Загрузка...</p>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};

export const AuthGuard: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

export const GuestGuard: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/reset-password' && !localStorage.getItem('forgotPasswordVisited')) {
      navigate('/forgot-password');
    }
  }, [location.pathname, navigate]);

  return (
    <ProtectedRoute onlyUnAuth>{children}</ProtectedRoute>
  )
};
