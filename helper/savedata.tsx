import AsyncStorage from "@react-native-async-storage/async-storage";

export type Todo = {
  id: number;
  title: string;
  content: string;
};

export const saveData = async(data: Todo[]) => {
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

export const saveQueue = async (data: Todo[]) => {
  try {
    await AsyncStorage.setItem("queue", JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
};
