import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) => {
  try {
    await AsyncStorage.setItem("authCookie", token);
  } catch (e) {
    console.log(e);
  }
};

export const saveUserDetails = async (data: any) => {
  try {
    await AsyncStorage.setItem("userDetails", JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
};

export const getUserDetails = async () => {
  try {
    const value = await AsyncStorage.getItem("userDetails");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteToken = async () => {
  try {
    await AsyncStorage.removeItem("authCookie");
  } catch (e) {
    console.log(e);
  }
};

export const isLogin = async () => {
  try {
    const authCookie = await AsyncStorage.getItem("authCookie");
    if (authCookie) {
      return authCookie;
    }
    return false;
  } catch (e) {
    console.error("Error checking login status: ", e);
    return false;
  }
};
