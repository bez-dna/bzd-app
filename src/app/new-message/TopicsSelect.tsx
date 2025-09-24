import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useNewMessageStore } from "./NewMessageStore";

export const TopicsSelect = observer(() => {
  const nav = useNavigation();
  const newMessageStore = useNewMessageStore();

  const handlePress = (topic_id: string) => {
    newMessageStore.toggleTopicId(topic_id);
  };

  return (
    <View style={[styles.topics]}>
      {newMessageStore.topics.map((topic) => (
        <Pressable
          style={[styles.topic]}
          key={topic.topic_id}
          onPress={() => handlePress(topic.topic_id)}
        >
          <Text style={styles.label}>
            {newMessageStore.topic_ids.includes(topic.topic_id) && "+ "}
            {topic.title}
          </Text>
        </Pressable>
      ))}

      <Pressable style={[styles.topic]} onPress={() => nav.navigate("Topics")}>
        <Text style={styles.label}>Add & edit</Text>
      </Pressable>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  topics: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.margin.s * 2 - theme.padding.y,
  },

  topic: {
    backgroundColor: theme.colors.background.secondary,
    padding: theme.padding.y,
    marginRight: theme.padding.y,
    marginBottom: theme.padding.y,
    borderRadius: theme.border.radius,
  },

  label: {
    color: theme.colors.text.primary,
  },
}));
