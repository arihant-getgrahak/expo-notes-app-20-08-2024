import { View, TextInput, StyleSheet, Text } from "react-native";
import { useController } from "react-hook-form";

type InputModeOptions =
  | "none"
  | "text"
  | "decimal"
  | "numeric"
  | "tel"
  | "search"
  | "email"
  | "url";
interface InputProps {
  name: string;
  control: any;
  inputMode?: InputModeOptions | undefined;
  [key: string]: any;
  secureTextEntry?: boolean;
}

export const Input: React.FC<InputProps> = ({ name, control, ...props }) => {
  const { field } = useController({
    control,
    rules: {
      required: true,
    },
    name,
  });

  return (
    <View>
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        {...props}
      />
    </View>
  );
};
