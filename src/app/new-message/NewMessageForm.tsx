import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import type { MessagesStackNavigationProp } from "../../App";
import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { Warn } from "../main/Warn";
import { Header } from "./Header";
import { useNewMessageStore } from "./NewMessageStore";
import { TopicsList } from "./TopicsList";

export const NewMessageForm = observer(() => {
  const api = useAPI();
  const { t } = useI18n();
  const store = useNewMessageStore();
  const nav = useNavigation<MessagesStackNavigationProp<"Message">>();

  const [pending, setPending] = useState(false);

  const handleSubmit = async () => {
    setPending(true);

    const data = await api.messages
      .create_message(store.form)
      .catch(() => null);

    setPending(false);

    if (data) {
      nav.popTo("Message", { messageId: data.message.message_id });
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await store.updateData();
      })();
    }, [store.updateData]),
  );

  return (
    <>
      <Header />

      <Warn />

      <View style={styles.root}>
        <TopicsList />

        <TextInput
          style={[styles.input]}
          value={store.text}
          multiline
          numberOfLines={20}
          placeholder="Post something..."
          onChangeText={(it) => store.setText(it)}
        />

        <Pressable
          style={styles.press}
          onPress={handleSubmit}
          disabled={pending}
        >
          <Text style={styles.button(pending)}>{t("new_message.button")}</Text>
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
