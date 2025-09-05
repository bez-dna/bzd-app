import { Button, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import Contacts from 'react-native-contacts';

export const SourcesScreen = () => {
  const getContacts = async () => {
    const contacts = await Contacts.getAllWithoutPhotos()
    console.log(contacts)
  }

  return (
    <SafeAreaView>
      <Text>SOURCES</Text>
      <Button
        title="GET CONTACTS"
        onPress={getContacts}
      />
    </SafeAreaView>
  )
}
