import { checkResponse } from '../utils/response-check'

export const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options)
    .then(checkResponse)
    .then(response => response.json());
};
