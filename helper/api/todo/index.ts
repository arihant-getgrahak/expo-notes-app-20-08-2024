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
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtMDNleWt0cDAwMDBmc2huMmw1anF1NzAiLCJuYW1lIjoiQXJpaGFudCBKYWluIiwiaWF0IjoxNTE2MjM5MDIyfQ.u5qFRe61vOnirhm-NSpIfk3fZLzOIEjJB19ECW5oC58`,
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
    const response = await axios.delete(`${url}/delete/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.authCookie}`,
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
