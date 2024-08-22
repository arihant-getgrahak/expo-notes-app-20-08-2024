import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { Headertitle } from "@/components/headerTitle";
import { Link } from "expo-router";
import { isLogin } from "@/helper/tokenHelper";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function Index() {
  const [islogin, setIsLogin] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  useFocusEffect(() => {
    async function checkIsLogin() {
      try {
        const login = await isLogin();
        setIsLogin(login);
        if (login) {
          router.push("/(todo)");
        }
      } catch (error) {
        console.error("Error checking login status", error);
      }
    }

    checkIsLogin();

    if (islogin) {
      router.push("/(todo)");
    }
  });

  return (
    <View style={styles.view}>
      <Headertitle Htitle="Todo App" />
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: "https://img.freepik.com/free-vector/colorful-todo-list-illustration_1308-172724.jpg?size=626&ext=jpg",
        }}
        alt="Todo App"
      />
      <Text style={styles.text}>Todo App</Text>
      <View style={styles.view2}>
        <Link href="./auth/login" asChild>
          <Pressable style={styles.loginBtn}>
            <Text style={styles.text}>Login</Text>
          </Pressable>
        </Link>
        <Link href="./auth/register" asChild>
          <Pressable style={styles.button}>
            <Text style={[styles.text, { color: "white" }]}>Register</Text>
          </Pressable>
        </Link>
      </View>
      <View style={styles.footer}>
        <Link href="/(todo)" asChild>
          <Pressable>
            <Text>Access Todo Offline</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    position: "relative",
  },
  text: {
    fontSize: 20,
    textAlign: "center",
  },
  view2: { flexDirection: "row", gap: 10 },
  button: {
    backgroundColor: "#f4511e",
    padding: 10,
    borderRadius: 5,
    width: 100,
    borderWidth: 2,
  },
  loginBtn: {
    borderColor: "black",
    padding: 10,
    borderRadius: 5,
    borderWidth: 2,
    width: 100,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
});
