import { getQueue, deleteQueue } from "./savedata";
import axios from "axios";
import { isLogin } from "./tokenHelper";
const url = "https://todo-backend-swart.vercel.app/api/todo";
type TodoOffline = {
  type: "post" | "update" | "delete";
  data?: {
    title: string;
    content: string;
  };
  id: number;
};

// here i want to loop through getQueue and send data to backend with axios on the basis of type

export const offLineDataSync = async () => {
  const queue = (await getQueue()) as unknown as TodoOffline[];
  for (const item of queue!) {
    const token = await isLogin();
    if (item.type === "post") {
      const res = await axios.post(`${url}/add`, item.data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    }

    if (item.type === "update") {
      const res = await axios.put(`${url}/update`, item.data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    }

    if (item.type === "delete") {
      const res = await axios.delete(`${url}/delete/${item.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return res;
    }

    // now remove processed data from queue
  }
  await deleteQueue();
};
