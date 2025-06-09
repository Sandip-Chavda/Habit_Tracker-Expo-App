import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "coral",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          tabBarIcon: ({ size, focused, color }) => (
            <AntDesign name="login" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
