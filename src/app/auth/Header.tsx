import { useNavigation } from "@react-navigation/native";
import { XIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const Header = () => {
  return (
    <View style={styles.left}>
      <BacktoMessages />
    </View>
  );
};

const BacktoMessages = () => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("MessagesStack");
  };

  return (
    <Pressable style={styles.item} onPress={handlePress}>
      <XIcon style={styles.icon} size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    marginLeft: theme.padding.x,
  },

  item: {
    padding: theme.padding.y,
  },

  icon: {
    // TODO: без этого, просто с color не катит :/
    margin: 0,
    color: theme.colors.text.primary,
  },
}));
