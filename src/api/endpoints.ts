export const API_BASE_URL='https://norma.nomoreparties.space/api';

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/auth/register`,
    login: `${API_BASE_URL}/auth/login`,
    logout: `${API_BASE_URL}/auth/logout`,
    refreshToken: `${API_BASE_URL}/auth/token`,
    user: `${API_BASE_URL}/auth/user`,
  },
  password: {
    forgot: `${API_BASE_URL}/password-reset`,
    reset: `${API_BASE_URL}/password-reset/reset`,
  },
  ingredients: `${API_BASE_URL}/ingredients`,
  orders: `${API_BASE_URL}/orders`,
};
