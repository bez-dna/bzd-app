import { DarkTheme, DefaultTheme, type Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native-unistyles";

// Пока не очень придумал как подружить корректно unistyle и react-navigation темы, поэтому пока вложил
// одну в другую

const shared = {
  fonts: {
    base: 16,
    main: 14,
  },
  padding: {
    x: 10,
    y: 8,
  },
  margin: {
    s: 16,
    m: 32,
    l: 64,
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
      secondary: "rgb(80, 80, 80)",
    },
    background: {
      primary: "rgb(252, 252, 252)",
      secondary: "rgb(237, 237, 237)",
      input: "rgb(240, 240, 240)",
    },
    border: "rgb(210, 210, 210)",
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
      secondary: "rgb(160, 160, 180)",
    },
    background: {
      primary: "rgb(18, 18, 18)",
      secondary: "rgb(33, 33, 33)",
      input: "rgb(23, 23, 23)",
    },
    border: "rgb(48, 48, 48)",
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
      input: string;
    };
    border: string;
    button: {
      text: string;
      background: string;
    };
  };
  fonts: {
    base: number;
    main: number;
  };
  padding: {
    x: number;
    y: number;
  };
  margin: {
    s: number;
    m: number;
    l: number;
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
