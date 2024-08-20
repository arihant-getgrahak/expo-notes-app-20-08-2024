import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { Headertitle } from "@/components/headerTitle";
import { Link } from "expo-router";
import { Data } from "@/lib/PostData";
import Pencil from "react-native-vector-icons/AntDesign";
import DeleteOutlined from "react-native-vector-icons/AntDesign";

export default function Todo() {
  return (
    <View style={style.main}>
      <Headertitle Htitle="Todo" />
      <Text style={style.headingText}>Todos</Text>
      <View style={style.alltodo}>
        <View style={style.heading}>
          <Text style={style.todoText}>Todo</Text>
          <Button title="Add Todo" />
        </View>
        {Data.map((data) => (
          <View key={data.id} style={style.todomain}>
            <View style={style.todo}>
              <Text style={style.title}>{data.title}</Text>
              <Text style={style.desc}>{data.content}</Text>
              <Link href={`./todo/${data.id}`} asChild style={style.read}>
                <Text style={style.read}>Read More</Text>
              </Link>
            </View>
            <View style={style.todoBtn}>
              <Pressable onPress={() => console.log("edit")}>
                <Pencil name="edit" size={20} />
              </Pressable>
              <Pressable onPress={() => console.log("delete")}>
                <DeleteOutlined name="delete" size={20} />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  headingText: {
    fontSize: 20,
    marginBottom: 10,
  },
  alltodo: {
    borderWidth: 1,
    width: 350,
    padding: 10,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todoText: {
    fontSize: 20,
  },
  todo: {
    marginTop: 10,
    width: 300,
    padding: 10,
    gap: 5,
  },
  todomain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 20,
  },
  desc: {
    fontSize: 15,
  },
  read: {
    fontSize: 15,
    color: "blue",
    marginTop: 10,
  },
  todoBtn: {
    flexDirection: "column",
    gap: 10,
    marginLeft: -15,
    // borderWidth: 1,
    // padding: 10,
  },
});
