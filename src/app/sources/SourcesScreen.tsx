import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Button, StyleSheet, Text } from "react-native";
import Contacts from "react-native-contacts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth } from "../auth/Auth";
import { useMainStore } from "../main/MainStore";

export const SourcesScreen = observer(() => {
  const mainStore = useMainStore();
  const navigation = useNavigation();

  const handleLogout = async () => {
    mainStore.updateJwt(null);
  };

  const getContacts = async () => {
    const _contacts = await Contacts.getAllWithoutPhotos();
    // console.log(contacts);
  };

  return (
    <SafeAreaView style={[styles.root]}>
      <Button title="BACK" onPress={() => navigation.navigate("Main")} />

      {!mainStore.isAuth ? (
        <Auth />
      ) : (
        <>
          <Text>SOURCES</Text>
          <Button title="Logout" onPress={handleLogout} />
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
