import { useNavigation } from "@react-navigation/native";
import { MessageCirclePlusIcon, UserIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export const Header = () => {
  return (
    <SafeAreaView edges={["right", "top", "left"]} style={styles.root}>
      <View style={styles.cont}>
        <NewMessage />
        <Sources />
      </View>
    </SafeAreaView>
  );
};

const NewMessage = () => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("NewMessage");
  };

  return (
    <Pressable style={styles.icon} onPress={handlePress}>
      <MessageCirclePlusIcon size={24} />
    </Pressable>
  );
};

const Sources = () => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("Sources");
  };

  return (
    <Pressable style={styles.icon} onPress={handlePress}>
      <UserIcon size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create((_theme) => ({
  root: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  cont: {
    flexDirection: "row",
  },

  icon: {
    padding: 8,
    marginRight: 8,
  },
}));
