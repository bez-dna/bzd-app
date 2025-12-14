import { useNavigation } from "@react-navigation/native";
import { XIcon } from "lucide-react-native";
import { Pressable, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { NewTopic } from "./NewTopic";
import { Warn } from "../main/Warn";

export const Header = () => {
  return (
    <>
      <View style={styles.root}>
        <View style={styles.left}>
          <BacktoNewMessage />
        </View>
      </View>

      <Warn type="NEW_TOPIC" />

      <NewTopic />
    </>
  );
};

const BacktoNewMessage = () => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.goBack();
  };

  return (
    <Pressable style={styles.press} onPress={handlePress}>
      <XIcon style={styles.button} size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: theme.padding.y,
  },

  left: {
    flexDirection: "row",
    marginLeft: theme.padding.x,
  },

  press: {
    padding: theme.padding.y,
  },

  button: {
    // TODO: без этого, просто с color не катит :/
    margin: 0,
    color: theme.colors.text.primary,
  },
}));
