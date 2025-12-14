import { HashIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import type { TopicModel } from "./TopicsStore";

export const TopicsListItem = ({ topic }: { topic: TopicModel }) => {
  return (
    <View style={styles.root}>
      <HashIcon style={styles.icon} size={16} strokeWidth={3} />

      <View>
        <Text style={styles.titleText}>{topic.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    marginHorizontal: theme.padding.x,
    marginBottom: theme.margin.s,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    marginRight: theme.padding.y,
    color: theme.colors.text.primary,
  },

  titleText: {
    fontSize: theme.fonts.base * 1.125,
    fontWeight: 700,
    color: theme.colors.text.primary,
  },
}));
