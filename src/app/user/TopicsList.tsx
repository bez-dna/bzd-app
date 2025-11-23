import { observer } from "mobx-react-lite";
import { View } from "react-native";

import { TopicListItem } from "./TopicsListItem";
import { useUserStore } from "./UserStore";

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
