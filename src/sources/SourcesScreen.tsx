import { Button, StyleSheet, Text } from "react-native";
import Contacts from "react-native-contacts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth } from "../auth/Auth";
import { useMainStore } from "../main/MainStore";
import { observer } from "mobx-react-lite";

export const SourcesScreen = observer(() => {
  const mainStore = useMainStore();

  const getContacts = async () => {
    const contacts = await Contacts.getAllWithoutPhotos();
    console.log(contacts);
  };

  return (
    <SafeAreaView style={[styles.root]}>
      {!mainStore.isAuth ? (
        <Auth />
      ) : (
        <>
          <Text>SOURCES</Text>
          <Button title="GET CONTACTS" onPress={getContacts} />
        </>
      )}
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
