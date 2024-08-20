import { Text, View, Image, StyleSheet, Pressable, Button } from "react-native";
import { Headertitle } from "@/components/headerTitle";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={style.view}>
      <Headertitle Htitle="Todo App" />
      <Image
        style={{ width: 200, height: 200 }}
        resizeMode="cover"
        source={{
          uri: "https://img.freepik.com/free-vector/colorful-todo-list-illustration_1308-172724.jpg?size=626&ext=jpg",
        }}
        alt="Todo App"
      />

      <Text style={style.text}>Todo App</Text>
      <View style={style.view2}>
        <Link href="./auth/login" asChild>
          <Pressable style={style.loginBtn}>
            <Text style={style.text}>Login</Text>
          </Pressable>
        </Link>
        <Link href="./auth/register" asChild>
          <Pressable style={style.button}>
            <Text style={[style.text, { color: "white" }]}>Register</Text>
          </Pressable>
        </Link>
      </View>
      <View style={style.footer}>
        <Link href="/(todo)" asChild>
          <Pressable>
            <Text>Access Todo Offline</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    position: "relative",
  },
  text: {
    fontSize: 20,
    // color: "white",
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
  bottom: {
    color: "black",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    paddingBottom: 10,
  },
});
