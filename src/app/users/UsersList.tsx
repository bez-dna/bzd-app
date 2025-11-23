import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { GetContacts } from "./GetContacts";
import { Header } from "./Header";
import { User } from "./User";
import { UsersListItem } from "./UsersListItem";
import { useUsersStore } from "./UsersStore";

export const UsersList = observer(() => {
  const { t } = useI18n();
  const store = useUsersStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await store.update();
      })();

      return () => {
        store.terminate();
      };
    }, [store.update, store.terminate]),
  );

  return (
    <ScrollView style={styles.root}>
      <Header />

      <User />

      {store.users.length > 0 && (
        <>
          <Text style={styles.title}>{t("users.list.title")}</Text>

          <View style={styles.list}>
            {store.users.map((user) => (
              <UsersListItem key={user.user_id} user={user} />
            ))}
          </View>
        </>
      )}

      <GetContacts />
    </ScrollView>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {},

  title: {
    fontSize: theme.fonts.base * 1.5,
    lineHeight: theme.fonts.base * 1.5,
    height: theme.fonts.base * 1.5,
    marginBottom: theme.margin.s,
    fontWeight: 900,
    color: theme.colors.text.primary,
    marginHorizontal: theme.padding.x,
  },

  list: {
    marginBottom: theme.margin.m,
  },
}));
