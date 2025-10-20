import { observer } from "mobx-react-lite";
import { useCallback } from "react";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useFocusEffect } from "@react-navigation/native";

import { useAPI } from "../../api/Api";
import { Header } from "./Header";
import { useSourcesStore } from "./SourcesStore";
import { useI18n } from "../../i18n/I18nStore";
import { User } from "./User";
import { SourcesListContact } from "./SourcesListContact";
import { SourcesListSource } from "./SourcesListSource";
import { GetContacts } from "./GetContacts";

export const SourcesList = observer(() => {
  const api = useAPI();
  const { t } = useI18n();
  const sourcesStore = useSourcesStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { sources, contacts } = await api.sources.get_sources();
        sourcesStore.setSources(sources);
        sourcesStore.setContacts(contacts);

        // TBD: нужно убрать аналогичные вызовы в SourcesListContact и GetContacts
      })();

      return () => {
        sourcesStore.clearSources();
        sourcesStore.clearContacts();
      };
    }, [
      api.sources.get_sources,
      sourcesStore.clearSources,
      sourcesStore.setSources,
      sourcesStore.setContacts,
      sourcesStore.clearContacts,
    ]),
  );

  return (
    <ScrollView style={styles.root}>
      <Header />

      <User />

      {sourcesStore.sources.length > 0 && (
        <View style={styles.sources}>
          <Text style={styles.title}>{t("sources.sources.title")}</Text>

          {sourcesStore.sources.map((source) => (
            <SourcesListSource key={source.source_id} source={source} />
          ))}
        </View>
      )}

      {sourcesStore.contacts.length > 0 && (
        <View style={styles.contacts}>
          <Text style={styles.title}>{t("sources.contacts.title")}</Text>

          {sourcesStore.contacts.map((contact) => (
            <SourcesListContact key={contact.contact_id} contact={contact} />
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
