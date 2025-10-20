import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import type { Source } from "./SourcesStore";

export const SourcesListSource = ({ source }: { source: Source }) => {
  return (
    <View style={styles.source}>
      <View style={styles.image(source.color)}>
        <Text style={styles.abbr}>{source.abbr}</Text>
      </View>

      <View style={styles.qqq}>
        <View>
          <Text style={[styles.label]} numberOfLines={1}>
            {source.name}
          </Text>
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
