import { API_ENDPOINTS } from './endpoints';

interface IRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

interface IErrorResponse {
  message: string;
}

const checkResponse = async (res: Response): Promise<any> => {
  const data = await res.json();
  return res.ok ? data : Promise.reject(data as IErrorResponse);
};

export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    return Promise.reject({ message: "No refresh token available" });
  }

  const response = await fetch(API_ENDPOINTS.auth.refreshToken, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ token: refreshToken }),
  })

  const refreshData: IRefreshTokenResponse = await checkResponse(response);

  if (!refreshData.success) {
    return Promise.reject(refreshData);
  }

  localStorage.setItem("refreshToken", refreshData.refreshToken);
  localStorage.setItem("accessToken", refreshData.accessToken);

  return refreshData;
};

export const fetchWithRefresh = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(url, options);
    return await checkResponse(response);
  } catch (error) {
    const err = error as IErrorResponse;

    if (err.message === "jwt expired") {
      try {
        const refreshData = await refreshToken();

        options.headers = {
          ...options.headers,
          Authorization: refreshData.accessToken,
        };

        const response = await fetch(url, options);
        return await checkResponse(response);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
};

export const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetchWithRefresh<T>(url, options)
    .then(response => response)
    .catch(error => {
      console.error("Request error:", error);
      return Promise.reject(error);
    });
};
