import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { useMainStore } from "../main/MainStore";
import { Warn } from "../main/Warn";

export const Header = () => {
  return (
    <>
      <SafeAreaView style={styles.root} edges={["top", "right", "left"]}>
        <View style={styles.right}>
          <NewMessage />
          <Sources />
        </View>
      </SafeAreaView>

      <Warn />
    </>
  );
};

const NewMessage = observer(() => {
  const nav = useNavigation();
  const { t } = useI18n();
  const mainStore = useMainStore();

  const handlePress = () => {
    nav.navigate("NewMessage");
  };

  if (!mainStore.isAuth) return;

  return (
    <Pressable style={styles.item} onPress={handlePress}>
      <Text style={styles.label}>{t("messages.header.new_message")}</Text>
    </Pressable>
  );
});

const Sources = () => {
  const nav = useNavigation();
  const { t } = useI18n();

  const handlePress = () => {
    nav.navigate("UsersStack");
  };

  return (
    <Pressable style={[styles.item, styles.sources]} onPress={handlePress}>
      <Text style={styles.label}>{t("messages.header.users")}</Text>
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
    fontWeight: 700,
  },

  sources: {
    marginRight: 0,
  },
}));
