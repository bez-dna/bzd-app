import { StyleSheet } from "react-native-unistyles";

export const themeStyles = StyleSheet.create((theme) => ({
  button: {
    color: theme.colors.button.text,
    backgroundColor: theme.colors.button.background,
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.padding.y,
  },

  input: {
    backgroundColor: theme.colors.background.secondary,
    color: theme.colors.text.primary,
    fontSize: theme.fonts.primary,
    paddingHorizontal: theme.padding.x,
    paddingVertical: theme.padding.y,
    borderWidth: theme.border.default,
    borderColor: theme.colors.border,
    borderRadius: theme.border.radius,
    fontWeight: 600,
    overflow: "hidden",
  },
}));
