import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";

import {
  RateModel,
  TopicModel,
  TopicUserModel,
  useUserStore,
} from "./UserStore";
import { StyleSheet } from "react-native-unistyles";
import { styles } from "./Timing";
import { useAPI } from "../../api/Api";
import { useI18n } from "../../i18n/I18nStore";

const RATE_OPTIONS: Array<RateModel> = ["RATE_Q", "RATE_QD", "RATE_QW"];

export const Rate = observer(
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
          {RATE_OPTIONS.map((rate) => (
            <Pressable
              key={rate}
              style={styles.press}
              onPress={() => handlePress({ ...topic_user, rate })}
            >
              <View style={styles.mark(topic_user.rate === rate)} />
              <Text style={styles.button(true)}>
                {t(`user.topics.rate.${rate}`)}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  },
);
