import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoadingUser } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // useEffect(() => {
  //   const inAuthGroup = segments[0] === "auth";

  //   if (!user && !inAuthGroup && !isLoadingUser) {
  //     router.replace("/auth");
  //   } else if (user && inAuthGroup && !isLoadingUser) {
  //     router.replace("/");
  //   }
  // }, [user, segments]);

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (!isLoadingUser) {
      if (!user && !inAuthGroup) {
        router.replace("/auth");
      } else if (user && inAuthGroup) {
        router.replace("/");
      }
    }
  }, [user, segments, isLoadingUser]);

  if (isLoadingUser) {
    // Optionally, show a loading spinner here

    return <ActivityIndicator size={"large"} />;
  }

  return <>{children}</>;
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        {/* <PaperProvider> */}
        <SafeAreaProvider>
          <RouteGuard>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="dark" animated />
          </RouteGuard>
        </SafeAreaProvider>
        {/* </PaperProvider> */}
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
