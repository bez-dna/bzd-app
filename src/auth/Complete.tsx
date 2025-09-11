import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useAPI } from "../api/Api";
import { useMainStore } from "../main/MainStore";
import { useAuthStore } from "./AuthStore";
import { observer } from "mobx-react-lite";

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
          style={[styles.input]}
          value={form.code}
          onChangeText={(code) => setForm({ ...form, code })}
        />

        <Button onPress={handleSubmit} title="Login" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    flex: 1,
  },

  cont: {
    padding: 20,
  },

  input: {
    marginBottom: 10,
  },

  button: {
    alignSelf: "flex-start",
  },
});
