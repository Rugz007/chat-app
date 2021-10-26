// theme.ts
// 1. import `extendTheme` function
import { extendTheme, ThemeConfig } from "@chakra-ui/react";
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};
// 3. extend the theme
const theme = extendTheme({ config, colors: {
  primary: '#5e81ac',
  secondary: '#b48ead',
  danger:'#bf616a',
  warning:'#d08770',
  success:'#a3be8c'
} });
export default theme;
