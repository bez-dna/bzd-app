import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { useMainStore } from "../main/MainStore";
import { useAuthStore } from "./AuthStore";
import { Header } from "./Header";

export const Complete = observer(() => {
  const api = useAPI();
  const { t } = useI18n();
  const authStore = useAuthStore();
  const mainStore = useMainStore();

  const [form, setForm] = useState<{ code: string; name: string | null }>({
    code: "",
    name: null,
  });

  const handleSubmit = async () => {
    if (authStore.verificationId === null) return;

    const data = await api.auth.complete({
      ...form,
      verification_id: authStore.verificationId,
    });

    await mainStore.updateJwt(data.jwt);
  };

  const disabled = useMemo(() => {
    const nameLength = form.name !== null ? form.name.length < 2 : false;

    return form.code.length < 4 || nameLength;
  }, [form.code.length, form.name]);

  return (
    <KeyboardAvoidingView behavior="position">
      <ScrollView alwaysBounceVertical={false}>
        <Header />

        <View style={styles.root}>
          <Text style={styles.desc}>{t("auth.complete.code.desc")}</Text>

          <TextInput
            style={styles.input}
            value={form.code}
            placeholder="0000"
            keyboardType="number-pad"
            maxLength={4}
            onChangeText={(code) => setForm({ ...form, code })}
          />

          {authStore.isNew && (
            <>
              <Text style={styles.desc}>{t("auth.complete.name.desc")}</Text>

              <TextInput
                style={styles.input}
                value={form.name ?? ""}
                onChangeText={(name) => setForm({ ...form, name })}
              />
            </>
          )}

          <Pressable onPress={handleSubmit} disabled={disabled}>
            <Text style={styles.button(disabled)}>
              {t("auth.complete.button")}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    marginVertical: theme.margin.l,
  },

  desc: {
    color: theme.colors.text.primary,
    marginTop: theme.margin.m,
    fontSize: theme.fonts.base,
    marginBottom: theme.margin.s,
    maxWidth: "85%",
  },

  input: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base * 1.5,
    height: 60,
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
