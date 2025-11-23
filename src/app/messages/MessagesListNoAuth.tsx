import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { Header } from "./Header";

export const MessagesListNotAuth = () => {
  const { t } = useI18n();
  const nav = useNavigation();

  const handlePress = () => {
    nav.navigate("UsersStack");
  };

  return (
    <>
      <Header />

      <View style={styles.root}>
        <Text style={styles.desc}>{t("messages.no_auth.desc")}</Text>

        <Pressable style={styles.press} onPress={handlePress}>
          <Text style={styles.button}>{t("messages.no_auth.button")}</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.margin.l,
  },

  desc: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base * 1.25,
    marginBottom: theme.margin.s,
    maxWidth: "85%",
    marginHorizontal: "auto",
    textAlign: "center",
  },

  press: {
    alignSelf: "center",
  },

  button: {
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.background,
    fontWeight: 700,
    paddingHorizontal: theme.padding.x * 2,
    paddingVertical: theme.padding.y,
    borderRadius: 999,
  },
}));
