import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import type { UserModel } from "./UsersStore";

export const UsersListItem = ({ user }: { user: UserModel }) => {
  const nav = useNavigation();

  const handlePress = async () => {
    nav.navigate("User", { userId: user.user_id });
  };

  return (
    <Pressable onPress={handlePress} style={styles.root}>
      <View style={styles.image(user.color)}>
        <Text style={styles.abbr}>{user.abbr}</Text>
      </View>

      <View style={styles.data}>
        <View>
          <Text style={styles.name} numberOfLines={1}>
            {user.name}
          </Text>
        </View>

        <View>
          <Text numberOfLines={1} style={styles.desc}>
            XXX
            {/* {user.phone}

            {contact.contact_name !== "" &&
              contact.contact_name !== user.name &&
              ` (${contact.contact_name})`} */}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    marginBottom: theme.margin.s,
    alignItems: "center",
    paddingHorizontal: theme.padding.x,
  },

  image: (backgroundColor: string) => ({
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor,
    marginRight: theme.padding.x,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "flex-start",
  }),

  abbr: {
    fontWeight: 700,
    color: theme.colors.text.secondary,
  },

  data: {
    flexShrink: 1,
    flexGrow: 1,
  },

  name: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base,
    fontWeight: 700,
  },

  desc: {
    color: theme.colors.text.primary,
  },
}));
