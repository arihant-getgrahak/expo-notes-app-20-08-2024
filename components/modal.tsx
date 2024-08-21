import React, { useEffect, useState } from "react";
import { Modal, StyleSheet, View, Text, Button } from "react-native";
import { Input } from "./Input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { updateTodo, getSpecificTodo } from "@/helper/api/todo";

type Todo = {
  id: string;
  title: string;
  content: string;
};

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

interface ModalViewProps {
  selectedTodo: string;
  modalVisible: boolean;
  closeModal: () => void;
}

export const ModalView: React.FC<ModalViewProps> = ({
  selectedTodo,
  modalVisible,
  closeModal,
}) => {
  const [data, setData] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSpecificTodo = async () => {
      setLoading(true);
      try {
        const res = await getSpecificTodo(selectedTodo);
        if (res?.status === 200) {
          setData(res.data.todo);
        } else {
          alert("Error fetching data");
        }
      } catch (error) {
        alert("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (selectedTodo) {
      fetchSpecificTodo();
    }
  }, [selectedTodo]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: data?.title || "",
      content: data?.content || "",
    },
  });

  useEffect(() => {
    reset({
      title: data?.title || "",
      content: data?.content || "",
    });
  }, [data, reset]);

  const onSubmit = async (formData: z.infer<typeof schema>) => {
    try {
      const sendData = {
        title: formData.title,
        content: formData.content,
        titleId: selectedTodo,
      };
      const res = await updateTodo(sendData);
      if (res?.status === 200) {
        setData(res.data.todo);
      } else {
        console.log(res)
        alert("Error updating data");
      }
      closeModal();
    } catch (error) {
      alert("An error occurred while updating the todo");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <>
              <View>
                <Text>Title</Text>

                <Input
                  name="title"
                  control={control}
                  inputMode="text"
                  style={styles.input}
                />

                {errors.title && (
                  <Text style={styles.errorText}>{errors.title.message}</Text>
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
                  <Text style={styles.errorText}>{errors.content.message}</Text>
                )}
              </View>
              <Button title="Edit" onPress={handleSubmit(onSubmit)} />
            </>
          )}
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
  errorText: {
    color: "red",
  },
});
