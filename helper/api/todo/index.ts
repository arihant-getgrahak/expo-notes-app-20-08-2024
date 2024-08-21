import axios, { AxiosError } from "axios";

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
    const response = await axios.put(`${url}/update`, data, {
      headers: {
        // "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMDNudDF2OTAwMDBqNTNvYTJmbWF4NHEiLCJlbWFpbCI6ImFyQGdhLmNvbSIsImlhdCI6MTcyNDIzMzQwNSwiZXhwIjoxNzI2ODI1NDA1fQ.IDK_vLD-KLv6y9JkKDw3qsL5Sfo2kYcv63rpNLSSkr0",
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
    const response = await axios.delete(`${url}/delete/${data}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMDNudDF2OTAwMDBqNTNvYTJmbWF4NHEiLCJlbWFpbCI6ImFyQGdhLmNvbSIsImlhdCI6MTcyNDIzMzQwNSwiZXhwIjoxNzI2ODI1NDA1fQ.IDK_vLD-KLv6y9JkKDw3qsL5Sfo2kYcv63rpNLSSkr0",
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
