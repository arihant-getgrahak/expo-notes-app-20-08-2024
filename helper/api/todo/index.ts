import axios, { AxiosError } from "axios";
import { isLogin } from "@/helper/tokenHelper";
const url = "https://todo-backend-swart.vercel.app/api/todo";

export const getAllTodo = async (id: string) => {
  // here id is the user id
  try {
    const response = await axios.get(`${url}/getall/${id}`);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return error.response;
    }
  }
};

export const getSpecificTodo = async (id: string) => {
  // here id is the todo id
  try {
    const response = await axios.get(`${url}/get/${id}`);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return error.response;
    }
  }
};

export const createTodo = async (data: any) => {
  try {
    const response = await axios.post(`${url}/add`, data);
    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return error.response;
    }
  }
};
export const updateTodo = async (data: any) => {
  try {
    const token = await isLogin();
    const response = await axios.put(`${url}/update`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return error.response;
    }
  }
};

export const deleteTodo = async (data: any) => {
  try {
    const token = await isLogin();
    const response = await axios.delete(`${url}/delete/${data}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response) {
      return error.response;
    }
  }
};
