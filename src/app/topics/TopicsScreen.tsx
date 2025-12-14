import { useMainStore } from "../main/MainStore";
import { TopicsList } from "./TopicsList";
import { TopicsStore, TopicsStoreContext } from "./TopicsStore";

export const TopicsScreen = () => {
  const mainStore = useMainStore();

  return (
    <TopicsStoreContext.Provider value={new TopicsStore(mainStore)}>
      <TopicsList />
    </TopicsStoreContext.Provider>
  );
};
