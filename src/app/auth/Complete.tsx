import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { useMainStore } from "../main/MainStore";
import { useAuthStore } from "./AuthStore";

export const Complete = observer(() => {
  const api = useAPI();
  const { t } = useI18n();
  const authStore = useAuthStore();
  const mainStore = useMainStore();

  const [form, setForm] = useState({
    code: "",
  });

  const handleSubmit = async () => {
    if (authStore.verificationId === null) return;

    const data = await api.auth.complete({
      ...form,
      verification_id: authStore.verificationId,
    });

    await mainStore.updateJwt(data.jwt);
  };

  return (
    <View style={[styles.root]}>
      <Text style={styles.desc}>{t("auth.complete.desc")}</Text>

      <TextInput
        style={styles.input}
        value={form.code}
        placeholder="0000"
        onChangeText={(code) => setForm({ ...form, code })}
      />

      <Pressable onPress={handleSubmit}>
        <Text style={styles.button}>{t("auth.complete.button")}</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    marginTop: theme.margin.l,
  },

  desc: {
    marginTop: theme.margin.s + theme.fonts.base * 2,
    fontSize: theme.fonts.base,
    marginBottom: theme.margin.m,
    maxWidth: "85%",
  },

  input: {
    fontSize: theme.fonts.base * 1.5,
    lineHeight: 0,
    fontWeight: 500,
    paddingVertical: theme.padding.y * 1.5,
    paddingHorizontal: theme.padding.y * 3,
    backgroundColor: theme.colors.background.input,
    borderRadius: theme.border.radius,
    marginBottom: theme.margin.s,
  },

  button: {
    alignSelf: "flex-start",
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.background,
    fontSize: theme.fonts.base * 0.875,
    fontWeight: 700,
    paddingHorizontal: theme.padding.x * 2,
    paddingVertical: theme.padding.y,
    borderRadius: 999,
  },
}));
