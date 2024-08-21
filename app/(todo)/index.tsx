import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { Headertitle } from "@/components/headerTitle";
import { Link } from "expo-router";
import { Data } from "@/lib/PostData";
import Pencil from "react-native-vector-icons/AntDesign";
import DeleteOutlined from "react-native-vector-icons/AntDesign";
import { ModalView } from "@/components/modal";
import { useState } from "react";
type Todo = {
  id: number;
  title: string;
  content: string;
};

export default function Todo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleEdit = (data: Todo) => {
    setSelectedTodo(Data.find((item) => item.id === data.id)!);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  const handleDelete = (id: number) => {
    alert("Delete: " + id);
    // Add deletion logic here if necessary
  };

  return (
    <View style={styles.main}>
      <Headertitle Htitle="Todo" />
      <Text style={styles.headingText}>Todos</Text>
      <View style={styles.alltodo}>
        <View style={styles.heading}>
          <Text style={styles.todoText}>Todo</Text>
          <Button title="Add Todo" onPress={() => alert("Add Todo clicked")} />
        </View>
        {Data.map((data) => (
          <View key={data.id} style={styles.todomain}>
            <View style={styles.todo}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.desc}>{data.content}</Text>
              <Link href={`./todo/${data.id}`} asChild>
                <Text style={styles.read}>Read More</Text>
              </Link>
            </View>
            <View style={styles.todoBtn}>
              <Pressable onPress={() => handleEdit(data)}>
                <Pencil name="edit" size={20} />
              </Pressable>
              <Pressable onPress={() => handleDelete(data.id)}>
                <DeleteOutlined name="delete" size={20} />
              </Pressable>
            </View>
          </View>
        ))}
      </View>
      {selectedTodo !== null && (
        <ModalView
          modalVisible={modalVisible}
          selectedTodo={selectedTodo}
          setTodos={setSelectedTodo}
          closeModal={closeModal}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
});
