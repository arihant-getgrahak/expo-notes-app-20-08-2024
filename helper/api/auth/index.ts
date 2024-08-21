import axios, { AxiosError } from "axios";

const url = "https://todo-backend-swart.vercel.app/api/user";

export const login = async (data: any) => {
  try {
    const response = await axios.post(`${url}/login`, data);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return error.response;
    }
  }
};

export const signup = async (data: any) => {
  try {
    const response = await axios.post(`${url}/signup`, data);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return error.response;
    }
  }
};
