import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const theme = useTheme();
  const router = useRouter();
  const { signIn, signUp } = useAuth();

  const handleAuth = async () => {
    if (!email || !password) {
      setError("All fields required.");
      return;
    }

    if (password.length <= 8) {
      setError("Password must be 9 characters long & must not be simple.");
      return;
    }

    setError(null);

    if (isSignUp) {
      const error = await signUp(email, password);
      if (error) {
        setError(error);
        return;
      }
    } else {
      const error = await signIn(email, password);
      if (error) {
        setError(error);
        return;
      }
      router.replace("/");
    }
  };

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {isSignUp ? "Create Account" : "Welcome Back"}
        </Text>

        <TextInput
          label={"Email"}
          placeholder="abcd@gmail.com"
          autoCapitalize="none"
          keyboardType="email-address"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          label={"Password"}
          placeholder="********"
          secureTextEntry
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}

        <Button onPress={handleAuth} mode="contained" style={styles.button}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
        <Button
          style={styles.switchModeButton}
          mode="text"
          onPress={handleSwitchMode}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
  switchModeButton: {
    marginTop: 16,
  },
});
