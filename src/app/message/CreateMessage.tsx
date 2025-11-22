import { useState } from "react";
import { Button, Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAPI } from "../../api/Api";
import { nanoid } from "nanoid";
import { useMessageStore } from "./MessageStore";

export const CreateMessage = () => {
  const api = useAPI();
  const [form, setForm] = useState<{ text: string }>({
    text: "",
  });
  const store = useMessageStore();

  const handlePress = async () => {
    const data = await api.messages
      .create_message({
        text: form.text,
        code: nanoid(),
        message_id: store.message_id,
        topic_ids: null,
      })
      .catch(() => null);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        value={form.text}
        onChangeText={(text) => setForm({ ...form, text })}
      />

      <Button title="SAVE" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  input: {
    color: theme.colors.text.primary,
    backgroundColor: theme.colors.background.input,
  },
}));
