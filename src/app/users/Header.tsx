import { useNavigation } from "@react-navigation/native";
import { XIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

export const Header = () => {
  return (
    <SafeAreaView style={styles.root} edges={["top", "right", "left"]}>
      <View style={styles.left}>
        <BacktoMessages />
      </View>
    </SafeAreaView>
  );
};

const BacktoMessages = () => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("MessagesStack");
  };

  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <XIcon style={styles.icon} size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.margin.l,
  },

  left: {
    flexDirection: "row",
    marginLeft: theme.padding.x,
  },

  button: {
    padding: theme.padding.y,
  },

  icon: {
    // TODO: без этого, просто с color не катит :/
    margin: 0,
    color: theme.colors.text.primary,
  },
}));
