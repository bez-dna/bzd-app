import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";
import {
  type TimingModel,
  type TopicUserModel,
  useUserStore,
} from "./UserStore";

const TIMING_OPTIONS: Array<TimingModel> = [
  "TIMING_INSTANT",
  "TIMING_WEEKDAYS",
  "TIMING_WEEKENDS",
];

export const Timing = observer(
  ({ topic_user }: { topic_user: TopicUserModel }) => {
    const store = useUserStore();
    const api = useAPI();
    const { t } = useI18n();

    const handlePress = async (topic_user: TopicUserModel) => {
      await api.topics.update_topic_user(topic_user);

      await store.update();
    };

    return (
      <View style={styles.root}>
        <View>
          {TIMING_OPTIONS.map((timing) => (
            <Pressable
              key={timing}
              style={styles.press}
              onPress={() => handlePress({ ...topic_user, timing })}
            >
              <View style={styles.mark(topic_user.timing === timing)} />
              <Text style={styles.button(true)}>
                {t(`user.topics.timing.${timing}`)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  },
);

//

export const styles = StyleSheet.create((theme) => ({
  root: {},

  press: {
    paddingVertical: theme.padding.y,
    flexDirection: "row",
  },

  mark: (active: boolean) => ({
    width: theme.fonts.main / 2,
    height: theme.fonts.main / 2,
    borderRadius: 999,
    backgroundColor: theme.colors.text.primary,
    marginRight: theme.padding.y,
    marginTop: theme.padding.y * 0.75,
    alignSelf: "flex-start",
    opacity: active ? 1 : 0,
  }),

  button: (_active: boolean) => ({
    fontSize: theme.fonts.main,
    // fontWeight: active ? 700 : 400,
    color: theme.colors.text.primary,
  }),
}));
