import { SafeAreaView } from "react-native-safe-area-context";

import { CreateMessage } from "./CreateMessage";

export const Header = () => {
  return (
    <SafeAreaView edges={["bottom"]}>
      <CreateMessage />
    </SafeAreaView>
  );
};
