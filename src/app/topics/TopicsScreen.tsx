import { TopicsList } from "./TopicsList";
import { TopicsStore, TopicsStoreContext } from "./TopicsStore";

export const TopicsScreen = () => {
  return (
    <TopicsStoreContext.Provider value={new TopicsStore()}>
      <TopicsList />
    </TopicsStoreContext.Provider>
  );
};
