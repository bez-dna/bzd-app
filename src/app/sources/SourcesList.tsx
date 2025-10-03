import { FlatList, Text, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { StyleSheet } from "react-native-unistyles";

import { Header } from "./Header";
import { useAPI } from "../../api/Api";
import { Source, useSourcesStore } from "./SourcesStore";

export const SourcesList = observer(() => {
  const api = useAPI();
  const sourcesStore = useSourcesStore();

  useEffect(() => {
    (async () => {
      const sources = (await api.sources.get_sources()).sources;
      console.log(sources);
      sourcesStore.setSources(sources);
    })();
  }, [api.sources.get_sources, sourcesStore.setSources]);

  // const getContacts = async () => {
  //   const contacts = await Contacts.getAllWithoutPhotos();

  //   api.contacts.create_contacts({
  //     contacts: contacts.flatMap((contact) =>
  //       contact.phoneNumbers.map((phone_number) => ({
  //         name: `${contact.givenName} ${contact.familyName}`.trim(),
  //         phone_number: phone_number.number,
  //         device_contact_id: contact.recordID,
  //       })),
  //     ),
  //   });
  // };

  return (
    <FlatList
      ListHeaderComponent={Header}
      data={sourcesStore.sources}
      renderItem={({ item }) => <SourcesListItem source={item} />}
      keyExtractor={(it) => it.source_id}
    />
  );
});

const SourcesListItem = ({ source }: { source: Source }) => {
  return (
    <View style={[styles.source]}>
      <Text style={[styles.label]}>{source.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create((_theme) => ({
  source: {},
  label: {},
}));
