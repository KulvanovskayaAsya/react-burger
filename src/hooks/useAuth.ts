import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../services';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  getUser,
  updateUser,
  selectUser,
  selectIsAuthChecked,
  forgotPassword as forgotPasswordAction,
  resetPassword as resetPasswordAction,
} from '../services/authSlice';
import { IUser } from '../types/api';

interface IUseAuthReturn {
  user: IUser | null;
  isAuthChecked: boolean;
  status: string;
  error: string | null;
  successMessage: string;
  register: (email: string, password: string, name: string) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  refreshAuthToken: () => void;
  fetchUser: () => void;
  updateUserProfile: (name: string, email: string, password: string) => void;
  forgotPassword: (email: string) => void;
  resetPassword: (password: string, code: string) => void;
}

export const useAuth = (): IUseAuthReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const { status, error, successMessage } = useSelector((state: RootState) => state.auth);

  const register = useCallback((email: string, password: string, name: string) => {
    dispatch(registerUser({ email, password, name }));
  }, [dispatch]);

  const login = useCallback((email: string, password: string) => {
    dispatch(loginUser({ email, password }))
      .then((action) => {
        if (action.meta.requestStatus === 'fulfilled') {
          const redirectTo = location.state?.from?.pathname || '/';
          navigate(redirectTo);
        }
      });
  }, [dispatch, navigate, location]);

  const logout = useCallback(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      dispatch(logoutUser(refreshToken)).then(() => {
        navigate('/login');
      });
    }
  }, [dispatch, navigate]);

  const refreshAuthToken = useCallback(() => {
    const token = localStorage.getItem('refreshToken');
    if (token) {
      dispatch(refreshToken(token));
    }
  }, [dispatch]);

  const fetchUser = useCallback(() => {
    dispatch(getUser());
  }, [dispatch]);

  const updateUserProfile = useCallback((name: string, email: string, password: string) => {
    dispatch(updateUser({ name, email, password }));
  }, [dispatch]);

  const forgotPassword = useCallback((email: string) => {
    dispatch(forgotPasswordAction(email)).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        localStorage.setItem('forgotPasswordVisited', 'true');
        navigate('/reset-password');
      }
    });
  }, [dispatch, navigate]);

  const resetPassword = useCallback((password: string, code: string) => {
    dispatch(resetPasswordAction({ password, code })).then((action) => {
      if (action.meta.requestStatus === 'fulfilled') {
        localStorage.removeItem('forgotPasswordVisited');
        navigate('/login');
      }
    });
  }, [dispatch, navigate]);

  return {
    user,
    isAuthChecked,
    status,
    error,
    successMessage,
    register,
    login,
    logout,
    refreshAuthToken,
    fetchUser,
    updateUserProfile,
    forgotPassword,
    resetPassword
  };
};
