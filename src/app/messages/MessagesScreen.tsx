import { useNavigation } from "@react-navigation/native";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./Header";

export const MessagesScreen = () => {
  const _navigation = useNavigation();

  const data = [...Array(100).keys()].map((i) => {
    return {
      id: i,
      title: `TITLE - ${i}`,
    };
  });

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={Header}
        data={data}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

type ItemProps = { id: number; title: string };

const Item = ({ title, id }: ItemProps) => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("Message", { messageId: id.toString() });
  };

  return (
    <View>
      <Pressable onPress={handlePress}>
        <Text style={{ color: "white" }}>{title}</Text>
      </Pressable>
    </View>
  );
};
