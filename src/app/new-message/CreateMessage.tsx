import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAPI } from "../../api/Api";
import { themeStyles } from "../../theme/Theme";
import { useNewMessageStore } from "./NewMessageStore";
import { TopicsSelect } from "./TopicsSelect";

export const CreateMessage = observer(() => {
  const api = useAPI();
  const newMessageStore = useNewMessageStore();

  const handleSubmit = async () => {
    const _data = await api.messages.create_message(newMessageStore.form);
  };

  useEffect(() => {
    (async () => {
      const data = await api.topics.get_topics();
      newMessageStore.setTopics(data.topics);
    })();
  }, [api.topics.get_topics, newMessageStore.setTopics]);

  return (
    <View style={[styles.root]}>
      <TopicsSelect />

      <TextInput
        style={[styles.input]}
        value={newMessageStore.text}
        multiline
        numberOfLines={20}
        placeholder="Post something..."
        onChangeText={(it) => newMessageStore.setText(it)}
      />

      <Pressable style={[styles.submit]} onPress={handleSubmit}>
        <Text style={[themeStyles.button]}>Save</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.padding.y * 4,
  },

  input: {
    backgroundColor: theme.colors.background.input,
    color: theme.colors.text.primary,
    fontSize: theme.fonts.primary,
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.padding.y,
    borderWidth: theme.border.default,
    borderColor: theme.colors.border,
    borderRadius: theme.border.radius,
    overflow: "hidden",
    marginBottom: theme.margin.m,
    minHeight: 200,
  },

  submit: {
    alignSelf: "center",
  },
}));
