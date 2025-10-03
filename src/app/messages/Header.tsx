import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export const Header = () => {
  return (
    <View style={styles.root}>
      <View style={styles.right}>
        <NewMessage />
        <Sources />
      </View>
    </View>
  );
};

const NewMessage = () => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("NewMessage");
  };

  return (
    <Pressable style={styles.item} onPress={handlePress}>
      <Text style={styles.label}>New message</Text>
      {/* <MessageCirclePlusIcon size={24} /> */}
    </Pressable>
  );
};

const Sources = () => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("Sources");
  };

  return (
    <Pressable style={[styles.item, styles.sources]} onPress={handlePress}>
      <Text style={styles.label}>Sources</Text>
      {/* <UserIcon size={24} /> */}
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  right: {
    flexDirection: "row",
    marginRight: theme.padding.x,
  },

  item: {
    padding: theme.padding.y,
    marginRight: theme.padding.x,
  },

  label: {
    lineHeight: 24,
    color: theme.colors.text.primary,
    // TODO: добоавить болдовости
  },

  sources: {
    marginRight: 0,
  },
}));
