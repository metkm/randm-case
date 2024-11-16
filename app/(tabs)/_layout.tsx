import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{
        tabBarLabel: "Home",
        tabBarIcon: () => <Ionicons name="home-sharp" size={24} />
      }} />
    </Tabs>
  );
}
