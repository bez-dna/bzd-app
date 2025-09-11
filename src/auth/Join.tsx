import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAPI } from "../api/Api";
import { useAuthStore } from "./AuthStore";
import { themeStyles } from "../theme/Theme";

export const Join = observer(() => {
  const api = useAPI();
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
      <View style={[styles.cont]}>
        <TextInput
          style={[themeStyles.input, styles.input]}
          value={form.phone_number}
          placeholder="7 999 000 00-00"
          onChangeText={(phone_number) => setForm({ ...form, phone_number })}
        />

        <Pressable onPress={handleSubmit}>
          <Text style={[themeStyles.button, styles.button]}>Join</Text>
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
