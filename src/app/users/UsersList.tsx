import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { GetContacts } from "./GetContacts";
import { Header } from "./Header";
import { UsersListContact } from "./UsersListContact";
import { UsersListSource } from "./UsersListSource";
import { useUsersStore } from "./UsersStore";
import { User } from "./User";

export const UsersList = observer(() => {
  const api = useAPI();
  const { t } = useI18n();
  const sourcesStore = useUsersStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { sources, contacts } = await api.users.get_users();
        sourcesStore.setData(sources, contacts);

        // TBD: нужно убрать аналогичные вызовы в SourcesListContact и GetContacts
      })();

      return () => {
        sourcesStore.clearData();
      };
    }, [api.users.get_users, sourcesStore.clearData, sourcesStore.setData]),
  );

  return (
    <ScrollView style={styles.root}>
      <Header />

      <User />

      {sourcesStore.sources.length > 0 && (
        <View style={styles.sources}>
          <Text style={styles.title}>{t("sources.sources.title")}</Text>

          {sourcesStore.sources.map((source) => (
            <UsersListSource key={source.source_id} source={source} />
          ))}
        </View>
      )}

      {sourcesStore.contacts.length > 0 && (
        <View style={styles.contacts}>
          <Text style={styles.title}>{t("sources.contacts.title")}</Text>

          {sourcesStore.contacts.map((contact) => (
            <UsersListContact key={contact.contact_id} contact={contact} />
          ))}
        </View>
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
  },

  sources: {
    paddingHorizontal: theme.padding.x,
    marginBottom: theme.margin.m,
  },

  contacts: {
    paddingHorizontal: theme.padding.x,
    marginBottom: theme.margin.m,
  },
}));
