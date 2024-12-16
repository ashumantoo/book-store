export const BASE_API_URL = "http://localhost:4000/api"; //TODO: set this inside the .env file
export const API_URLS = {
  register: `${BASE_API_URL}/user/signup`,
  login: `${BASE_API_URL}/user/signin`,
  logout: `${BASE_API_URL}/user/logout`,
  forgetPassword: `${BASE_API_URL}/user/forget-password`,
  restPassword: `${BASE_API_URL}/user/reset-password`,
  getBooks: `${BASE_API_URL}/book`,
  getBook: `${BASE_API_URL}/book`,
}