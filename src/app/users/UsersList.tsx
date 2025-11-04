import { useFocusEffect } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { GetContacts } from "./GetContacts";
import { Header } from "./Header";
import { User } from "./User";
import { UsersListContact } from "./UsersListContact";
import { UsersListSource } from "./UsersListSource";
import { useUsersStore } from "./UsersStore";

export const UsersList = observer(() => {
  const { t } = useI18n();
  const store = useUsersStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await store.updateData();
      })();

      return () => {
        store.clearData();
      };
    }, [store.updateData, store.clearData]),
  );

  return (
    <ScrollView style={styles.root}>
      <Header />

      <User />

      {store.sources.length > 0 && (
        <View style={styles.sources}>
          <Text style={styles.title}>{t("sources.sources.title")}</Text>

          {store.sources.map((source) => (
            <UsersListSource key={source.source_id} source={source} />
          ))}
        </View>
      )}

      {store.contacts.length > 0 && (
        <View style={styles.contacts}>
          <Text style={styles.title}>{t("sources.contacts.title")}</Text>

          {store.contacts.map((contact) => (
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
