import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useI18n } from "../../i18n/I18nStore";
import { useMainStore } from "../main/MainStore";

export const User = () => {
  const mainStore = useMainStore();
  const { t } = useI18n();

  if (mainStore.user === null) return null;

  return (
    <View style={styles.root}>
      <View style={styles.image(mainStore.user.color)}>
        <Text style={styles.abbr}>{mainStore.user.abbr}</Text>
      </View>

      <View style={styles.user}>
        <Text style={[styles.name]}>{mainStore.user.name}</Text>
        <Text style={[styles.desc]}>{t("sources.user.desc")}</Text>
      </View>

      <Logout />
    </View>
  );
};

const Logout = () => {
  const mainStore = useMainStore();
  const { t } = useI18n();

  const handlePress = () => {
    mainStore.updateJwt(null);
  };

  return (
    <Pressable style={styles.action} onPress={handlePress}>
      <Text style={styles.logout}>{t("sources.header.logout")}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    paddingHorizontal: theme.padding.x,
    marginBottom: theme.margin.m,
    alignItems: "center",
  },

  image: (backgroundColor: string) => ({
    width: 60,
    height: 60,
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

  user: {},

  name: {
    fontWeight: 700,
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base * 1.125,
  },

  desc: {
    fontSize: theme.fonts.base * 0.875,
    color: theme.colors.text.secondary,
  },

  action: {
    marginLeft: "auto",
    padding: theme.padding.y,
  },

  logout: {
    color: theme.colors.text.primary,
    lineHeight: 24,
    fontSize: theme.fonts.base * 0.875,
    fontWeight: 700,
  },
}));
