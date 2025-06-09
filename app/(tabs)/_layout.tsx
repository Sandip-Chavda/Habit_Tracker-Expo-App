import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: "#f5f5f5",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "#6200ee",
        tabBarInactiveTintColor: "#666666",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return focused ? (
              <Ionicons name="calendar-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="calendar-outline" size={size} color={color} />
            );
          },
          title: "Today's Habits",
        }}
      />
      <Tabs.Screen
        name="streaks"
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return focused ? (
              <Ionicons name="stats-chart-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="stats-chart-outline" size={size} color={color} />
            );
          },
          title: "Streaks",
        }}
      />
      <Tabs.Screen
        name="add-habbit"
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return focused ? (
              <Ionicons name="add-circle-sharp" size={size} color={color} />
            ) : (
              <Ionicons name="add-circle-outline" size={size} color={color} />
            );
          },
          title: "Add New Habit",
          tabBarLabel: "Add Habit",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
