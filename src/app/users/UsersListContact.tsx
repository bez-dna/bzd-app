import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { type Contact, useUsersStore } from "./UsersStore";

export const UsersListContact = ({ contact }: { contact: Contact }) => {
  const { t } = useI18n();
  const api = useAPI();
  const sourcesStore = useUsersStore();
  const user = contact.user;

  const [pending, setPending] = useState(false);

  const handlePress = async () => {
    setPending(true);

    const _data = await api.sources.create_source({ user_id: user.user_id });

    const { sources, contacts } = await api.users.get_users();

    sourcesStore.setData(sources, contacts);

    setPending(false);
  };

  return (
    <View style={styles.contact}>
      <View style={styles.image(user.color)}>
        <Text style={styles.abbr}>{user.abbr}</Text>
      </View>

      <View style={styles.data}>
        <View>
          <Text style={[styles.label]} numberOfLines={1}>
            {user.name}
          </Text>
        </View>

        <View>
          <Text style={[styles.phone_number]} numberOfLines={1}>
            {user.phone}

            {contact.contact_name !== "" &&
              contact.contact_name !== user.name &&
              ` (${contact.contact_name})`}
          </Text>
        </View>
      </View>

      <View style={styles.action}>
        <Pressable onPress={handlePress} disabled={pending}>
          <Text style={styles.button(pending)}>
            {t("sources.contacts.button")}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create((theme) => ({
  image: (backgroundColor: string) => ({
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor,
    marginRight: theme.padding.x,
    alignItems: "center",
    justifyContent: "center",
  }),

  abbr: {
    fontWeight: 700,
    color: theme.colors.text.secondary,
  },

  contact: {
    flexDirection: "row",
    marginBottom: theme.margin.s,
    alignItems: "center",
  },

  label: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.base,
    fontWeight: 700,
  },

  phone_number: {
    color: theme.colors.text.primary,
  },

  action: {
    marginLeft: theme.padding.x,
  },

  button: (disabled: boolean) => ({
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.background,
    fontWeight: 700,
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.padding.y / 2,
    borderRadius: 999,
    opacity: disabled ? 0.2 : 1,
  }),

  data: {
    flexBasis: 0,
    flexGrow: 1,
  },
}));
