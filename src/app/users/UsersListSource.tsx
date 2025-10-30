import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useNavigation } from "@react-navigation/native";

import type { Source } from "./UsersStore";

export const UsersListSource = ({ source }: { source: Source }) => {
  const nav = useNavigation();
  const user = source.user;

  const handlePress = () => {
    nav.navigate("User", { user_id: source.user.user_id });
  };

  return (
    <Pressable style={styles.source} onPress={handlePress}>
      <View style={styles.image(user.color)}>
        <Text style={styles.abbr}>{user.abbr}</Text>
      </View>

      <View style={styles.qqq}>
        <View>
          <Text style={[styles.label]} numberOfLines={1}>
            {user.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  image: (backgroundColor: string) => ({
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor,
    marginRight: theme.padding.x,
    alignItems: "center",
    justifyContent: "center",
  }),

  abbr: {
    fontWeight: 700,
    color: theme.colors.text.secondary,
  },

  source: {
    flexDirection: "row",
    marginBottom: theme.margin.s,
    alignItems: "center",
  },

  label: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base,
    fontWeight: 700,
  },

  qqq: {
    flexBasis: 0,
    flexGrow: 1,
  },
}));
