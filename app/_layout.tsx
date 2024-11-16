import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";

import "../assets/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ClickOutsideProvider } from "react-native-click-outside";

const client = new QueryClient();

export default function RootLayout() {
  return (
    <ClickOutsideProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider value={DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </ClickOutsideProvider>
  );
}
