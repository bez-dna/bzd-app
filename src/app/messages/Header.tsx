import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useI18n } from "../../i18n/I18nStore";

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
  const { t } = useI18n();

  const handlePress = () => {
    nav.navigate("NewMessage");
  };

  return (
    <Pressable style={styles.item} onPress={handlePress}>
      <Text style={styles.label}>{t("messages.header.new_message")}</Text>
    </Pressable>
  );
};

const Sources = () => {
  const nav = useNavigation();
  const { t } = useI18n();

  const handlePress = () => {
    nav.navigate("Sources");
  };

  return (
    <Pressable style={[styles.item, styles.sources]} onPress={handlePress}>
      <Text style={styles.label}>{t("messages.header.sources")}</Text>
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
