import { useNavigation } from "@react-navigation/native";
import { Camera, User as UserIcon } from "lucide-react-native";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const MessagesScreen = () => {
  const _navigation = useNavigation();

  const data = [...Array(100).keys()].map((i) => {
    return {
      id: i,
      title: `TITLE - ${i}`,
    };
  });

  return (
    <View>
      {/* <ScrollView>
        <View style={{ height: 2500}}><Text>GG</Text></View>
      </ScrollView> */}
      {/* <View><Text>DDD</Text></View> */}

      <FlatList
        ListHeaderComponent={Header}
        data={data}
        renderItem={({ item }) => <Item {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* <Text>MessagesScreen</Text>
      <Button
        title="TO MESSAGE"
        onPress={() => navigation.navigate("Message")}
      />

      <Button
        title="TO SOURCES"
        onPress={() => navigation.navigate("Sources")}
      />

      <Button
        title="ADD NEW"
        onPress={() => navigation.navigate("NewMessage")}
      /> */}
    </View>
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

const Header = () => {
  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      style={{ flex: 1, backgroundColor: "red" }}
    >
      <Camera color="green" size={48} />
      <UserIcon color="green" size={48} />
      {/* <Lucide name="user" /> */}
      <Text>HEADER</Text>
    </SafeAreaView>
  );
};
