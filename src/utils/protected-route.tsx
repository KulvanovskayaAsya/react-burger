import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUser, selectIsAuthChecked } from '../services/authSlice';

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

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};

// Для авторизованных маршрутов
export const OnlyAuth: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

// Для маршрутов только для неавторизованных пользователей
export const OnlyUnAuth: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <ProtectedRoute onlyUnAuth>{children}</ProtectedRoute>
);
