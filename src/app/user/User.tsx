import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { observer } from "mobx-react-lite";

import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { useUserStore } from "./UserStore";
import { Warn } from "../main/Warn";
import { Header } from "./Header";

export const Source = observer(({ user_id }: { user_id: string }) => {
  const api = useAPI();
  const { t: _ } = useI18n();
  const sourceStore = useUserStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { user, ...source } = await api.users.get_user({
          user_id,
        });

        sourceStore.setData(source, user);
      })();

      return () => {
        sourceStore.clearData();
      };
    }, [
      api.users.get_user,
      user_id,
      sourceStore.clearData,
      sourceStore.setData,
    ]),
  );

  return (
    <View>
      <Header />

      <Warn />

      <Text style={styles.text}>SOURCE {sourceStore.user?.name}</Text>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {},

  text: {
    paddingHorizontal: theme.padding.x,
    color: theme.colors.text.primary,
  },
}));
