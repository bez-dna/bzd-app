import { useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react-lite";
import { Button, StyleSheet, Text } from "react-native";
import Contacts from "react-native-contacts";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth } from "../auth/Auth";
import { useMainStore } from "../main/MainStore";
import { useAPI } from "../../api/Api";

export const SourcesScreen = observer(() => {
  const mainStore = useMainStore();
  const navigation = useNavigation();
  const api = useAPI();

  const handleLogout = async () => {
    mainStore.updateJwt(null);
  };

  const getContacts = async () => {
    const contacts = await Contacts.getAllWithoutPhotos();

    api.contacts.create_contacts({
      contacts: contacts.flatMap((contact) =>
        contact.phoneNumbers.map((phone_number) => ({
          name: `${contact.givenName} ${contact.familyName}`.trim(),
          phone_number: phone_number.number,
          device_contact_id: contact.recordID,
        })),
      ),
    });
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
