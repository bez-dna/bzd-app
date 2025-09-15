import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native-unistyles";

// Пока не очень придумал как подружить корректно unistyle и react-navigation темы, поэтому пока вложил
// одну в другую

const shared = {
  fonts: {
    primary: 16,
  },
  padding: {
    x: 10,
    y: 12,
  },
  margin: {
    s: 12,
  },
  border: {
    default: 1,
    active: 2,
    radius: 8,
  },
};

const lightTheme: Unitheme = {
  ...shared,
  navigation: {
    ...DefaultTheme,
  },
  colors: {
    text: {
      primary: "rgb(7, 7, 7)",
      secondary: "rgb(7, 7, 7)",
    },
    background: {
      primary: "rgb(252, 252, 252)",
      secondary: "rgb(238, 238, 238)",
    },
    border: "rgb(223, 223, 223)",
    button: {
      text: "rgb(252, 252, 252)",
      background: "rgb(7, 7, 7)",
    },
  },
};

lightTheme.navigation.colors.background = lightTheme.colors.background.primary;
lightTheme.navigation.colors.text = lightTheme.colors.text.primary;

const darkTheme: Unitheme = {
  ...shared,
  navigation: {
    ...DarkTheme,
  },
  colors: {
    text: {
      primary: "rgb(221, 221, 221)",
      secondary: "rgb(221, 221, 221)",
    },
    background: {
      primary: "rgb(27, 27, 27)",
      secondary: "rgb(27, 27 27)",
    },
    border: "rgb(27, 27 27)",
    button: {
      text: "rgb(7, 7, 7)",
      background: "rgb(252, 252, 252)",
    },
  },
};

darkTheme.navigation.colors.background = darkTheme.colors.background.primary;
darkTheme.navigation.colors.text = darkTheme.colors.text.primary;

type Unitheme = {
  navigation: Theme;
  colors: {
    text: {
      primary: string;
      secondary: string;
    };
    background: {
      primary: string;
      secondary: string;
    };
    border: string;
    button: {
      text: string;
      background: string;
    };
  };
  fonts: {
    primary: number;
  };
  padding: {
    x: number;
    y: number;
  };
  margin: {
    s: number;
  };
  border: {
    default: number;
    active: number;
    radius: number;
  };
};

const appThemes = {
  light: lightTheme,
  dark: darkTheme,
};

StyleSheet.configure({
  themes: appThemes,
  settings: {
    adaptiveThemes: true,
  },
});

type AppThemes = typeof appThemes;

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}
