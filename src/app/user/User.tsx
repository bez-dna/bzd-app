import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import type { UserModel } from "./UserStore";

export const User = ({ user }: { user: UserModel }) => {
  return (
    <View style={styles.root}>
      <View style={styles.image(user.color)}>
        <Text style={styles.abbr}>{user.abbr}</Text>
      </View>

      <View style={styles.user}>
        <Text style={[styles.name]}>{user.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    // justifyContent: "center",
    alignItems: "center",
    // flexDirection: "row",
    // paddingHorizontal: theme.padding.x,
    // marginBottom: theme.margin.m,
    // alignItems: "center",
    // backgroundColor: "yellow",
  },

  image: (backgroundColor: string) => ({
    width: 60,
    height: 60,
    borderRadius: 999,
    backgroundColor,
    marginBottom: theme.margin.s,
    alignItems: "center",
    justifyContent: "center",
  }),

  user: {
    // backgroundColor: "pink",
  },

  abbr: {
    fontWeight: 700,
    color: theme.colors.text.secondary,
  },

  name: {
    fontWeight: 900,
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base * 2,
  },

  desc: {
    color: theme.colors.text.secondary,
  },
}));
