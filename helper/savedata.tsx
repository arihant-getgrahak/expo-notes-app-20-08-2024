import AsyncStorage from "@react-native-async-storage/async-storage";

export type Todo = {
  id: number;
  title: string;
  content: string;
};

type TodoOffline = {
  type: "post" | "update" | "delete";
  data?: {
    title: string;
    content: string;
  };
  id: number;
};

export const saveData = async (data: Todo[]) => {
  try {
    await AsyncStorage.setItem("data", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("data");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteData = async () => {
  try {
    await AsyncStorage.removeItem("data");
  } catch (err) {
    console.log(err);
  }
};

export const saveQueue = async (data: TodoOffline) => {
  try {
    const value = await AsyncStorage.getItem("queue");
    if (value !== null) {
      const queue = JSON.parse(value);
      queue.push(data);
      await AsyncStorage.setItem("queue", JSON.stringify(queue));
    } else {
      const queue = [data];
      await AsyncStorage.setItem("queue", JSON.stringify(queue));
    }
  } catch (err) {
    console.log(err);
  }
};

export const getQueue = async () => {
  try {
    const value = await AsyncStorage.getItem("queue");
    if (value !== null) {
      return value;
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteQueue = async () => {
  try {
    await AsyncStorage.removeItem("queue");
  } catch (err) {
    console.log(err);
  }
};