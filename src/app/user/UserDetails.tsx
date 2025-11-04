import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { ScrollView, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { Warn } from "../main/Warn";
import { Header } from "./Header";
import { TopicsList } from "./TopicsList";
import { User } from "./User";
import { useUserStore } from "./UserStore";

export const UserDetails = observer(({ user_id }: { user_id: string }) => {
  const api = useAPI();
  const { t: _ } = useI18n();
  const store = useUserStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { user, topics, ...source } = await api.users.get_user({
          user_id,
        });

        store.setData(source, user, topics);
      })();

      return () => {
        store.clearData();
      };
    }, [api.users.get_user, user_id, store.clearData, store.setData]),
  );

  if (store.user === null) return;

  return (
    <ScrollView>
      <Header />

      <Warn />

      <View style={styles.user}>
        <User user={store.user} />
      </View>

      <View style={styles.topics}>
        <TopicsList topics={store.topics} />
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create((theme) => ({
  user: {
    marginBottom: theme.margin.m,
  },

  topics: {
    marginBottom: theme.margin.l,
  },
}));
