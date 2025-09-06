import { Button, Text } from "react-native";
import Contacts from "react-native-contacts";
import { SafeAreaView } from "react-native-safe-area-context";

export const SourcesScreen = () => {
  const getContacts = async () => {
    const contacts = await Contacts.getAllWithoutPhotos();
    console.log(contacts);
  };

  return (
    <SafeAreaView>
      <Text>SOURCES</Text>
      <Button title="GET CONTACTS" onPress={getContacts} />
    </SafeAreaView>
  );
};
