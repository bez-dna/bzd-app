import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { useAPI } from "../api/Api";
import { useMainStore } from "../main/MainStore";
import { useAuthStore } from "./AuthStore";
import { observer } from "mobx-react-lite";
import { StyleSheet } from "react-native-unistyles";
import { themeStyles } from "../theme/Theme";

export const Complete = observer(() => {
  const api = useAPI();
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
      <View style={[styles.cont]}>
        <TextInput
          style={[themeStyles.input, styles.input]}
          value={form.code}
          placeholder="0000"
          onChangeText={(code) => setForm({ ...form, code })}
        />

        <Pressable onPress={handleSubmit}>
          <Text style={[themeStyles.button, styles.button]}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {
    justifyContent: "center",
    flex: 1,
  },

  cont: {
    padding: 20,
  },

  input: {
    marginBottom: theme.margin.s,
  },

  button: {
    alignSelf: "flex-start",
  },
}));
