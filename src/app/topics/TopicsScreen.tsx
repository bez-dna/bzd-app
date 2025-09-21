import { TopicsStore, TopicsStoreContext } from "./TopicsStore";
import { TopicsList } from "./TopicsList";

export const TopicsScreen = () => {
  return (
    <TopicsStoreContext.Provider value={new TopicsStore()}>
      <TopicsList />
    </TopicsStoreContext.Provider>
  );
};
