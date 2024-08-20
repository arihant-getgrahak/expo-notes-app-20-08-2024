import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, Pressable } from "react-native";

export const Headertitle = ({ Htitle }: { Htitle: string }) => {
  const [count, setCount] = useState(0);
  const router = useRouter();

  return (
    <Stack.Screen
      options={{
        title: Htitle,
        headerStyle: { backgroundColor: "#f4511e" },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
  );
};
