import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { TopicsList } from "./TopicsList";
import type { SourceModel } from "./UsersStore";

export const UsersListSource = ({ source }: { source: SourceModel }) => {
  const user = source.user;

  return (
    <View style={styles.source}>
      <View style={styles.image(user.color)}>
        <Text style={styles.abbr}>{user.abbr}</Text>
      </View>

      <View style={styles.qqq}>
        <View style={styles.user}>
          <Text style={[styles.name]} numberOfLines={1}>
            {user.name}
          </Text>
        </View>

        <View>
          <TopicsList topics={source.topics} />
        </View>
      </View>
    </View>
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
    // alignItems: "center",
  },

  user: {
    // backgroundColor: "pink",
    lineHeight: 20,
    margin: 0,
  },

  name: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base,
    fontWeight: 700,
  },

  qqq: {
    flexBasis: 0,
    flexGrow: 1,
    paddingTop: 10,
  },
}));
