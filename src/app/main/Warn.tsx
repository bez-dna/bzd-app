import { CircleXIcon } from "lucide-react-native";
import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { useMainStore } from "./MainStore";

// TBD: сейчас один компонент используется на всех страницах, т.е. если в одной ручке с трельнуло,
// рендерим везде, была мысль ошибку сделать enum или очищать стор ошибки на каждый транзишн скрана,
// но я оставил это будущему мне, пусть разбирается

export const Warn = observer(() => {
  const mainStore = useMainStore();
  const { t } = useI18n();

  const handlePress = () => {
    mainStore.clearError();
  };

  if (!mainStore.error) return;

  return (
    <View style={styles.root}>
      <View style={styles.main}>
        <Text style={styles.text}>{t("warn.text")}</Text>
      </View>

      <Pressable style={styles.press}>
        <CircleXIcon
          style={styles.button}
          size={24}
          strokeWidth={1.5}
          onPress={handlePress}
        />
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {
    backgroundColor: "rgba(250, 10, 10, 0.2)",
    flexDirection: "row",
    borderRadius: theme.border.radius,
    marginHorizontal: theme.padding.x,
    marginBottom: theme.margin.s,
  },

  main: {
    paddingHorizontal: theme.padding.x,
    alignSelf: "center",
  },

  text: {
    color: theme.colors.text.primary,
    fontWeight: 700,
  },

  press: {
    marginLeft: "auto",
    padding: theme.padding.y,
  },

  button: {
    margin: 0,
    color: theme.colors.text.primary,
  },
}));
