import { View, Text, SafeAreaView, Button, StyleSheet } from "react-native";
import { Headertitle } from "@/components/headerTitle";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Input";
import { signup } from "@/helper/api/auth";
import { useRouter } from "expo-router";

export default function RegisterPage() {
  const router = useRouter();
  const schema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    name: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {

    const res = await signup(data);
    if (res?.status != 200) {
      alert(res?.data);
      return;
    }
    alert("User Register successfully");
    router.push("/auth/login");
  };
  return (
    <SafeAreaView style={style.sav}>
      <Headertitle Htitle="Register Page" />
      <Text style={style.heading}>Register Page</Text>
      <View style={style.formview}>
        <View>
          <Text>Email</Text>
          <Input
            control={control}
            inputMode="email"
            style={style.input}
            placeholder="m@example.com"
            name="email"
          />
          {errors.email && (
            <Text style={{ color: "red" }}>
              {errors.email.message?.toString()}
            </Text>
          )}
        </View>
        <View>
          <Text>Username</Text>
          <Input
            control={control}
            inputMode="text"
            style={style.input}
            placeholder="johnDoe"
            name="name"
          />
          {errors.name && (
            <Text style={{ color: "red" }}>
              {errors.name.message?.toString()}
            </Text>
          )}
        </View>
        <View>
          <Text>Password</Text>
          <Input
            control={control}
            name="password"
            secureTextEntry={true}
            style={style.input}
          />
          {errors.password && (
            <Text style={{ color: "red" }}>
              {errors.password.message?.toString()}
            </Text>
          )}
          <Button title="SignUp" onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const style = StyleSheet.create({
  sav: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  formview: {
    padding: 10,
    borderWidth: 1,
    width: 300,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
});
