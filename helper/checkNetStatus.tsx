import { useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const checkIsConnected = () => {
  const [isConnected, setConnected] = useState<boolean | null>(false);

  NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    setConnected(state.isConnected);
  });

  return { isConnected };
};
