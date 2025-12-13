import { useNavigation } from "@react-navigation/native";
import { CogIcon } from "lucide-react-native";
import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

import { useI18n } from "../../i18n/I18nStore";
import { useNewMessageStore } from "./NewMessageStore";
import { TopicsListItem } from "./TopicsListItem";

export const TopicsList = observer(() => {
  const nav = useNavigation();
  const store = useNewMessageStore();
  const { t } = useI18n();

  const handlePress = () => {
    nav.navigate("Topics");
  };

  return (
    <View style={styles.root}>
      <View style={styles.desc}>
        <Text style={styles.descText}>{t("new_message.topics.desc")}</Text>
      </View>

      <View style={styles.topics}>
        <Pressable style={styles.press} onPress={handlePress}>
          <CogIcon style={styles.icon} size={24} />

          <View style={styles.button}>
            <Text style={styles.buttonText}>
              {t("new_message.topics.edit")}
            </Text>
          </View>
        </Pressable>

        {store.topics.map((topic) => (
          <TopicsListItem key={topic.topic_id} topic={topic} />
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create((theme) => ({
  root: {},

  desc: {
    marginBottom: theme.margin.s,
    maxWidth: "80%",
  },

  descText: {
    color: theme.colors.text.primary,
    fontSize: theme.fonts.main,
  },

  topics: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: theme.margin.s * 2 - theme.padding.y,
  },

  press: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: theme.padding.y,
    marginBottom: theme.padding.y,
  },

  button: {
    paddingVertical: theme.padding.y,
    paddingHorizontal: theme.padding.x,
  },

  buttonText: {
    fontWeight: 500,
    color: theme.colors.text.primary,
    fontSize: theme.fonts.main,
  },

  icon: {
    margin: 0,
    color: theme.colors.text.primary,
  },
}));
