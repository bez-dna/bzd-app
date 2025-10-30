import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { useAuthStore } from "./AuthStore";

export const Join = observer(() => {
  const api = useAPI();
  const { t } = useI18n();
  const authStore = useAuthStore();

  const [form, setForm] = useState({
    phone_number: "",
  });

  const handleSubmit = async () => {
    const data = await api.auth.join(form);
    authStore.setJoinStep(data.verification.verification_id, data.is_new);
  };

  const disabled = useMemo(() => {
    return form.phone_number.length < 11;
  }, [form.phone_number.length]);

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

      <Pressable onPress={handleSubmit} disabled={disabled}>
        <Text style={styles.button(disabled)}>{t("auth.join.button")}</Text>
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
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base * 2,
    lineHeight: theme.fonts.base * 2,
    height: theme.fonts.base * 2,
    marginBottom: theme.margin.s,
    fontWeight: 900,
  },

  desc: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base,
    marginBottom: theme.margin.m,
    maxWidth: "85%",
  },

  input: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base * 1.5,
    lineHeight: 0,
    fontWeight: 500,
    paddingVertical: theme.padding.y * 1.5,
    paddingHorizontal: theme.padding.y * 3,
    backgroundColor: theme.colors.background.input,
    borderRadius: theme.border.radius,
    marginBottom: theme.margin.s,
  },

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
