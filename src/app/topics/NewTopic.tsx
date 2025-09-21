import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useAPI } from "../../api/Api";
import { themeStyles } from "../../theme/Theme";

export const NewTopic = observer(() => {
  const api = useAPI();

  const [form, setForm] = useState({
    title: "",
  });

  const handleSubmit = async () => {
    const _data = await api.topics.create_topic(form);
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
