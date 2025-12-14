import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { type ERROR, useMainStore } from "../main/MainStore";
import { useTopicsStore } from "./TopicsStore";

const WARN_TYPE: ERROR = "NEW_TOPIC";

export const NewTopic = observer(() => {
  const store = useTopicsStore();
  const mainStore = useMainStore();
  const { t } = useI18n();

  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    try {
      setPending(true);
      mainStore.clearError(WARN_TYPE);

      await store.save();
      await store.update();
    } catch (_) {
      mainStore.setError(WARN_TYPE);
    } finally {
      setPending(false);
    }
  };

  const isReady = useMemo(() => {
    if (store.title.length < 3) return false;
    if (pending) return false;

    return true;
  }, [store.title, pending]);

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        value={store.title}
        placeholder={t("topics.new_topic.placeholder")}
        onChangeText={(it) => store.setTitle(it)}
      />

      <Pressable
        style={styles.press}
        onPress={handleSubmit}
        disabled={!isReady}
      >
        <Text style={styles.button(!isReady)}>
          {t("topics.new_topic.button")}
        </Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: theme.padding.x,
    marginBottom: theme.margin.s,
  },

  input: {
    flexGrow: 1,
    backgroundColor: theme.colors.background.input,
    color: theme.colors.text.primary,
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.padding.y,
    borderRadius: theme.border.radius,
    fontWeight: 500,
    fontSize: theme.fonts.main,
  },

  press: {
    marginLeft: theme.padding.x,
  },

  button: (disabled: boolean) => ({
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.background,
    fontWeight: 700,
    paddingHorizontal: theme.padding.x * 2,
    paddingVertical: theme.padding.y,
    borderRadius: 999,
    opacity: disabled ? 0.2 : 1,
  }),
}));
