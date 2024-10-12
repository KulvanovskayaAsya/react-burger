export const checkResponse = (response: Response): Response => {
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }

  return response;
};
