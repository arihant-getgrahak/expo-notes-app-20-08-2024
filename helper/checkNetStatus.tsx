import { useEffect, useState, useCallback } from "react";
import NetInfo, {
  NetInfoState,
  NetInfoSubscription,
} from "@react-native-community/netinfo";

export const useCheckIsConnected = () => {
  const [isConnected, setConnected] = useState(true);

  const handleConnectionChange = useCallback((state: NetInfoState) => {
    setConnected(!!state.isConnected);
  }, []);

  useEffect(() => {
    const unsubscribe: NetInfoSubscription = NetInfo.addEventListener(
      handleConnectionChange
    );

    return () => {
      unsubscribe();
    };
  }, [handleConnectionChange]);

  return { isConnected };
};
