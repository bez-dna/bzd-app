import { View } from "react-native";
import { observer } from "mobx-react-lite";

import { useUserStore } from "./UserStore";
import { TopicListItem } from "./TopicsListItem";

export const TopicsList = observer(() => {
  const store = useUserStore();

  return (
    <View>
      {store.topics.map((topic) => (
        <TopicListItem key={topic.topic_id} topic={topic} />
      ))}
    </View>
  );
});
