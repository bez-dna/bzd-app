import { useNavigation } from "@react-navigation/native";
import { XIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

import { useMainStore } from "../main/MainStore";

export const Header = () => {
  return (
    <SafeAreaView style={styles.root} edges={["top", "right", "left"]}>
      <View style={styles.left}>
        <BacktoMessages />
      </View>

      <View style={styles.right}>
        <Logout />
      </View>
    </SafeAreaView>
  );
};

const BacktoMessages = () => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("Main");
  };

  return (
    <Pressable style={styles.item} onPress={handlePress}>
      <XIcon style={styles.icon} size={24} />
    </Pressable>
  );
};

const Logout = () => {
  const mainStore = useMainStore();

  const handlePress = () => {
    mainStore.updateJwt(null);
  };

  return (
    <Pressable style={styles.item} onPress={handlePress}>
      <Text style={styles.label}>Logout</Text>
      {/* <LogOutIcon size={24} /> */}
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

  right: {
    flexDirection: "row",
    marginRight: theme.padding.x,
  },

  item: {
    padding: theme.padding.y,
  },

  icon: {
    // TODO: без этого, просто с color не катит :/
    margin: 0,
    color: theme.colors.text.primary,
  },

  label: {
    color: theme.colors.text.primary,
    lineHeight: 24,
    fontSize: theme.fonts.base * 0.875,
    fontWeight: 700,
  },
}));
