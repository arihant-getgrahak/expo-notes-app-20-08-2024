import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Headertitle } from "@/components/headerTitle";
import { Data } from "@/lib/PostData";
export default function DetailsScreen() {
  const { id } = useLocalSearchParams();

  // const fetchId = Data.find((data) => data.id == Number(id)) as {
  //   id: number;
  //   title: string;
  //   content: string;
  // };

  return (
    <View>
      <Headertitle Htitle={"Details of Post " + id.toString()} />
      {/* <Text>Details of Post:  </Text> */}
      {/* <View>
        <Text>id: {fetchId.id} </Text>
        <Text>Title: {fetchId.title} </Text>
        <Text>Content: {fetchId.content} </Text>
      </View> */}
    </View>
  );
}
