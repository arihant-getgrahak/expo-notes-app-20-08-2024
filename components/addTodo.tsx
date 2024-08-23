import React, { useState } from "react";
import { Modal, StyleSheet, View, Text, Button } from "react-native";
import { Input } from "./Input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValue, FieldValues, useForm } from "react-hook-form";
import { createTodo } from "@/helper/api/todo";
import { getUserDetails } from "@/helper/tokenHelper";
import { checkIsConnected } from "@/helper/checkNetStatus";
import { saveQueue } from "@/helper/savedata";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

interface ModalViewProps {
  modalVisible: boolean;
  closeModal: () => void;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddModalView: React.FC<ModalViewProps> = ({
  modalVisible,
  closeModal,
  setUpdate,
}) => {
  const [loading, setLoading] = useState(false);
  const isConnected = checkIsConnected();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      const user = await getUserDetails();
      if (isConnected) {
        const sendData = {
          title: data.title,
          content: data.content,
          userId: user?.id,
        };

        const res = await createTodo(sendData);
        console.log(res?.data);

        if (res?.status !== 200) {
          alert("Error adding data");
          return;
        }

        setUpdate((prev) => !prev);
        reset();
        closeModal();
      } else {
        await saveQueue({
          type: "post",
          data: {
            title: data.title,
            content: data.content,
          },
          id: user?.id,
        });
        setUpdate((prev) => !prev);
        reset();
        closeModal();
      }
    } catch (error) {
      alert("An error occurred");
    } finally {
      setLoading(false);
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
                  <Text style={styles.errorText}>
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
                  <Text style={styles.errorText}>
                    {errors.content.message?.toString()}
                  </Text>
                )}
              </View>
              <Button title="Add" onPress={handleSubmit(onSubmit)} />
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
