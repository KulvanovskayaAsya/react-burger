import { API_ENDPOINTS } from './endpoints';

interface IRefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

interface IErrorResponse {
  message: string;
}

interface IResponse<T> {
  success: boolean;
  data: T;
}

function isErrorResponse(data: any): data is IErrorResponse {
  return 'message' in data;
}

const checkResponse = async <T>(res: Response): Promise<IResponse<T> | IErrorResponse> => {
  const data = await res.json();
  return res.ok ? { success: true, data } : { message: data.message || "Unknown error" };
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
  });

  const refreshData = await checkResponse<IRefreshTokenResponse>(response);

  if (isErrorResponse(refreshData)) {
    return Promise.reject(refreshData);
  }

  localStorage.setItem("refreshToken", refreshData.data.refreshToken);
  localStorage.setItem("accessToken", refreshData.data.accessToken);

  return refreshData.data;
};

export const fetchWithRefresh = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  try {
    const response = await fetch(url, options);
    const data = await checkResponse<T>(response);

    if (isErrorResponse(data)) {
      return Promise.reject(data);
    }

    return data.data;
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
        const data = await checkResponse<T>(response);

        if (isErrorResponse(data)) {
          return Promise.reject(data);
        }

        return data.data;
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
