import { Pressable, Text, TextInput, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { themeStyles } from "../../theme/Theme";
import { useAPI } from "../../api/Api";

export const NewTopic = observer(() => {
  const api = useAPI();

  const [form, setForm] = useState({
    title: "",
  });

  const handleSubmit = async () => {
    console.log(form);
    const data = await api.topics.create_topic(form);
    console.log(data);
    // authStore.setVerificationId(data.verification.verification_id);
  };

  return (
    <View>
      <TextInput
        style={[themeStyles.input]}
        value={form.title}
        placeholder="Название топика"
        onChangeText={(title) => setForm({ ...form, title })}
      />

      <Pressable onPress={handleSubmit}>
        <Text style={[themeStyles.button]}>Save</Text>
      </Pressable>
    </View>
  );
});
