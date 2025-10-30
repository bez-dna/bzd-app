import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { observer } from "mobx-react-lite";

import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import { useSourceStore } from "./SourceStore";
import { Warn } from "../main/Warn";
import { Header } from "./Header";

export const Source = observer(({ source_id }: { source_id: string }) => {
  const api = useAPI();
  const { t: _ } = useI18n();
  const sourceStore = useSourceStore();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { source, user } = await api.sources.get_source({
          source_id,
        });

        sourceStore.setSource(source, user);
      })();

      return () => {
        sourceStore.clearSource();
      };
    }, [
      api.sources.get_source,
      source_id,
      sourceStore.clearSource,
      sourceStore.setSource,
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
