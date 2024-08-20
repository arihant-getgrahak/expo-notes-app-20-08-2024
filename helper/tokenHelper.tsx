import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) => {
  try {
    const isSave = await AsyncStorage.setItem("authCookie", token);
    console.log(isSave);
  } catch (e) {
    console.log(e);
  }

};

export const deleteToken = async () => {
  try {
    const isdelete = await AsyncStorage.removeItem("authCookie");
    console.log(isdelete);
  } catch (e) {
    console.log(e);
  }

};

export const isLogin = async () => {
  try {
    const isLogin = await AsyncStorage.getItem("authCookie");
    console.log(isLogin);
  } catch (e) {
    console.log(e);
  }
};
