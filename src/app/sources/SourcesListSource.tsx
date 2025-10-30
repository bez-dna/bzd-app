import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import type { Source } from "./SourcesStore";
import { useNavigation } from "@react-navigation/native";

export const SourcesListSource = ({ source }: { source: Source }) => {
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("Source", { source_id: source.source_id });
  };

  return (
    <Pressable style={styles.source} onPress={handlePress}>
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
