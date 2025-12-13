import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useCallback, useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import type { MessagesStackNavigationProp } from "../../App";
import { useI18n } from "../../i18n/I18nStore";
import { type ERROR, useMainStore } from "../main/MainStore";
import { Warn } from "../main/Warn";
import { Header } from "./Header";
import { useNewMessageStore } from "./NewMessageStore";
import { TopicsList } from "./TopicsList";

const WARN_TYPE: ERROR = "NEW_MESSAGE";

export const NewMessageForm = observer(() => {
  const { t } = useI18n();
  const store = useNewMessageStore();
  const mainStore = useMainStore();
  const nav = useNavigation<MessagesStackNavigationProp<"Message">>();

  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    try {
      setPending(true);
      mainStore.clearError(WARN_TYPE);

      const messageId = await store.saveData();
      nav.popTo("Message", { messageId });
    } catch (_) {
      mainStore.setError(WARN_TYPE);
    } finally {
      setPending(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await store.updateData();
      })();

      return () => {
        mainStore.clearError(WARN_TYPE);
      };
    }, [store.updateData, mainStore.clearError]),
  );

  const isReady = useMemo(() => {
    if (store.text.length < 3) return false;
    if (store.topic_ids.length < 1) return false;
    if (pending) return false;

    return true;
  }, [store.text, store.topic_ids, pending]);

  return (
    <>
      <Header />

      <Warn type={WARN_TYPE} />

      <View style={styles.root}>
        <TopicsList />

        <TextInput
          style={styles.input}
          value={store.text}
          multiline
          numberOfLines={20}
          placeholder={t("new_message.placeholder")}
          onChangeText={(it) => store.setText(it)}
        />

        <Pressable
          style={styles.press}
          onPress={handleSubmit}
          disabled={!isReady}
        >
          <Text style={styles.button(!isReady)}>{t("new_message.button")}</Text>
        </Pressable>
      </View>
    </>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    paddingBottom: theme.margin.l,
  },

  input: {
    backgroundColor: theme.colors.background.input,
    color: theme.colors.text.primary,
    padding: theme.padding.y * 2,
    borderRadius: theme.border.radius,
    marginBottom: theme.margin.s,
    fontSize: theme.fonts.main,
    minHeight: 200,
  },

  press: {},

  button: (disabled: boolean) => ({
    alignSelf: "flex-start",
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.background,
    fontWeight: 700,
    paddingHorizontal: theme.padding.x * 2,
    paddingVertical: theme.padding.y,
    borderRadius: 999,
    opacity: disabled ? 0.2 : 1,
  }),
}));
