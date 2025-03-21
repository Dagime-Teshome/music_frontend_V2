export const lightTheme = {
  background: "#ffffff",
  surface: "#f5f5f5",
  surfaceHover: "#eeeeee",
  primaryText: "#121212",
  secondaryText: "#555555",
  tertiaryText: "#888888",
  border: "#e0e0e0",
  shadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  primary: "#333333",
  primaryHover: "#555555",
  secondary: "#dddddd",
  secondaryHover: "#cccccc",
  accent: "#444444",
  error: "#d32f2f",
  errorBg: "#ffebee",
  tag: "#f0f0f0",
  tagText: "#555555",
  modalOverlay: "rgba(0, 0, 0, 0.1)",
};

export const darkTheme = {
  background: "#121212",
  surface: "#1e1e1e",
  surfaceHover: "#2c2c2c",
  primaryText: "#ffffff",
  secondaryText: "#aaaaaa",
  tertiaryText: "#777777",
  border: "#333333",
  shadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  primary: "#dddddd",
  primaryHover: "#ffffff",
  secondary: "#444444",
  secondaryHover: "#555555",
  accent: "#bbbbbb",
  error: "#f44336",
  errorBg: "#331111",
  tag: "#333333",
  tagText: "#dddddd",
  modalOverlay: "rgba(0, 0, 0, 0.4)",
};

export type Theme = typeof lightTheme;
