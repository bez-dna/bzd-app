import { CircleXIcon } from "lucide-react-native";
import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { type ERROR, useMainStore } from "./MainStore";

// TBD: немного переписал, но мне не очень нравится

export const Warn = observer(({ type }: { type: ERROR }) => {
  const { t } = useI18n();
  const mainStore = useMainStore();

  const handlePress = () => {
    mainStore.clearError(type);
  };

  // кажется вызывается каждый раз, но useMemo не сработал, возможно из-за мапки
  const error = (() => {
    if (mainStore.errors.get(type) === true) {
      return true;
    } else {
      return false;
    }
  })();

  if (!error) return;

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
