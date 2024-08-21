import { Modal, StyleSheet, View, Text, Button } from "react-native";
import { Data } from "@/lib/PostData";
import { Input } from "./Input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  content: string;
};

type ModalViewProps = {
  selectedTodo: Todo;
  modalVisible: boolean;
  closeModal: () => void;
  setTodos: Dispatch<SetStateAction<Todo | null>>;
};

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z
    .string()
    .min(6, { message: "Content must be at least 6 characters" }),
});

export const ModalView: React.FC<ModalViewProps> = ({
  selectedTodo,
  modalVisible,
  closeModal,
  setTodos,
}: ModalViewProps) => {
  const [data, setData] = useState<Todo | undefined>();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    const editTodo = Data.find((item) => item.id === selectedTodo.id);
    setData(editTodo);
    if (editTodo) {
      reset(editTodo);
    }
  }, [selectedTodo, reset]);

  const onSubmit = (formData: any) => {
    const updatedata = {
      id: selectedTodo.id,
      title: formData.title,
      content: formData.content,
    };
    Data.map((item) =>
      item.id === selectedTodo.id ? { ...item, ...updatedata } : item
    );
    const updateddData = Data.find((item) => item.id === selectedTodo.id);
    setTodos(updateddData!);
    alert("Form Submitted: " + JSON.stringify(formData));
    closeModal();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text>Title</Text>
            <Input
              name="title"
              control={control}
              inputMode="text"
              style={styles.input}
            />
            {errors.title && (
              <Text style={{ color: "red" }}>
                {errors.title.message?.toString()}
              </Text>
            )}
          </View>
          <View>
            <Text>Description</Text>
            <Input
              name="content"
              control={control}
              inputMode="text"
              style={styles.input}
            />
            {errors.content && (
              <Text style={{ color: "red" }}>
                {errors.content.message?.toString()}
              </Text>
            )}
          </View>
          <Button title="Edit" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  centeredView: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
    height: "40%",
    justifyContent: "center",
  },
});
