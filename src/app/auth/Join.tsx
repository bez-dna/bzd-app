import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAPI } from "../../api/Api";
import { useAuthStore } from "./AuthStore";
import { useI18n } from "../../i18n/I18nStore";

export const Join = observer(() => {
  const api = useAPI();
  const { t } = useI18n();
  const authStore = useAuthStore();

  const [form, setForm] = useState({
    phone_number: "",
  });

  const handleSubmit = async () => {
    const data = await api.auth.join(form);
    authStore.setVerificationId(data.verification.verification_id);
  };

  return (
    <View style={[styles.root]}>
      <Text style={styles.title}>{t("auth.join.title")}</Text>

      <Text style={styles.desc}>{t("auth.join.desc")}</Text>

      {/* TODO: нужно добавить хелпер на маску ввода */}
      <TextInput
        style={styles.input}
        value={form.phone_number}
        placeholder="7 999 000-00-00"
        onChangeText={(phone_number) => setForm({ ...form, phone_number })}
      />

      <Pressable onPress={handleSubmit}>
        <Text style={styles.button}>{t("auth.join.button")}</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    marginTop: theme.margin.l,
  },

  title: {
    fontSize: theme.fonts.base * 2,
    lineHeight: theme.fonts.base * 2,
    height: theme.fonts.base * 2,
    marginBottom: theme.margin.s,
    fontWeight: 900,
  },

  desc: {
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
