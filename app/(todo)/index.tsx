import { View, Text, StyleSheet, Button, Pressable, Alert } from "react-native";
import { Headertitle } from "@/components/headerTitle";
import { Link } from "expo-router";
import Pencil from "react-native-vector-icons/AntDesign";
import DeleteOutlined from "react-native-vector-icons/AntDesign";
import { ModalView } from "@/components/modal";
import { useEffect, useState } from "react";
import { getAllTodo, deleteTodo } from "@/helper/api/todo";
import { getUserDetails } from "@/helper/tokenHelper";
import { AddModalView } from "@/components/addTodo";

type Todo = {
  id: string;
  title: string;
  content: string;
};
type User = {
  id: string;
  name: string;
  email: string;
};

export default function Todo() {
  const [modalVisible, setModalVisible] = useState(false);
  const [addTodoModalVisible, setAddTodoModalVisible] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<string | null>(null);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleEdit = (id: string) => {
    setSelectedTodo(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedTodo(null);
  };

  const handleAddTodo = () => {
    setAddTodoModalVisible(!addTodoModalVisible);
  };

  const handleDelete = async (id: string) => {
    Alert.alert("Delete Confirmation", "Do you want to delete this note?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: async () => {
          try {
            const res = await deleteTodo(id);
            if (res?.status !== 200) {
              Alert.alert("Error", "Failed to delete the todo.");
              return;
            }
            Alert.alert("Success", "Todo deleted successfully.");
            setUpdate(!update);
          } catch (error) {
            Alert.alert("Error", "An unexpected error occurred.");
          }
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchUserDetailsAndTodos = async () => {
      try {
        const userDetails = await getUserDetails();
        setUser(userDetails);

        if (userDetails?.id) {
          setLoading(true);
          const res = await getAllTodo(userDetails.id);
          if (res?.status !== 200) {
            alert(res?.data.error);
            setLoading(false);
            return;
          }
          setTodos(res?.data.todos || []);
          setLoading(false);
        }
      } catch (error) {
        Alert.alert("Error", "An unexpected error occurred.");
        setLoading(false);
      }
    };

    fetchUserDetailsAndTodos();
  }, [update]);

  return (
    <View style={styles.main}>
      <Headertitle Htitle="Todo" />
      <Text style={styles.headingText}>Todos</Text>
      <View style={styles.alltodo}>
        <View style={styles.heading}>
          <Text style={styles.todoText}>Todo</Text>
          <Button title="Add Todo" onPress={handleAddTodo} />
        </View>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          todos.map((data) => (
            <View key={data.id} style={styles.todomain}>
              <View style={styles.todo}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.desc}>{data.content}</Text>
                <Link href={`./todo/${data.id}`} asChild>
                  <Text style={styles.read}>Read More</Text>
                </Link>
              </View>
              <View style={styles.todoBtn}>
                <Pressable onPress={() => handleEdit(data.id)}>
                  <Pencil name="edit" size={20} />
                </Pressable>
                <Pressable onPress={() => handleDelete(data.id)}>
                  <DeleteOutlined name="delete" size={20} />
                </Pressable>
              </View>
            </View>
          ))
        )}
      </View>
      {selectedTodo !== null && (
        <ModalView
          selectedTodo={selectedTodo}
          modalVisible={modalVisible}
          closeModal={closeModal}
          setUpdate={setUpdate}
        />
      )}
      {addTodoModalVisible && (
        <AddModalView
          modalVisible={addTodoModalVisible}
          setUpdate={setUpdate}
          closeModal={() => setAddTodoModalVisible(false)}
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
