import { View, Text } from "react-native";
import App from "@/components/generateToPdf";
import { Data } from "@/lib/PostData";

export default function G() {
  return (
    <View>
      <App data={Data} />
      {/* <Text>G</Text> */}
    </View>
  );
}
