import { Pressable, Text, View } from "react-native";
import Contacts from "react-native-contacts";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { useAPI } from "../../api/Api";
import { useSourcesStore } from "./SourcesStore";

// TBD: проверка прав не работает на iOS https://github.com/morenoh149/react-native-contacts/issues/765
// нужно подключить другую либу для пермиссий чтобы блок не показывался постоянно.

export const GetContacts = () => {
  const sourcesStore = useSourcesStore();
  const { t } = useI18n();
  const api = useAPI();

  const getContacts = async () => {
    const cc = await Contacts.getAllWithoutPhotos();

    await api.contacts.create_contacts({
      contacts: cc.flatMap((contact) =>
        contact.phoneNumbers.map((phone_number) => ({
          name: `${contact.givenName} ${contact.familyName}`.trim(),
          phone_number: phone_number.number,
          device_contact_id: contact.recordID,
        })),
      ),
    });

    const { sources, contacts } = await api.sources.get_sources();

    sourcesStore.setSources(sources);
    sourcesStore.setContacts(contacts);
  };

  return (
    <View style={styles.root}>
      <Text style={styles.desc}>{t("sources.contacts.get.desc")}</Text>
      <Pressable onPress={getContacts} style={styles.press}>
        <Text style={styles.button(false)}>
          {t("sources.contacts.get.button")}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingHorizontal: theme.padding.x,
    marginBottom: theme.margin.m,
  },

  desc: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base,
    marginBottom: theme.margin.s,
    maxWidth: "85%",
  },

  press: {
    alignSelf: "center",
  },

  button: (disabled: boolean) => ({
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.background,
    fontSize: theme.fonts.base * 0.875,
    fontWeight: 700,
    paddingHorizontal: theme.padding.x * 2,
    paddingVertical: theme.padding.y,
    borderRadius: 999,
    opacity: disabled ? 0.2 : 1,
  }),
}));
