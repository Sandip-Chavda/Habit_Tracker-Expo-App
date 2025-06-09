import { DATABASE_ID, databases, HABBITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];

type Frequency = (typeof FREQUENCIES)[number];

const AddHabbitScreen = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error, setError] = useState<string>("");

  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await databases.createDocument(
        DATABASE_ID,
        HABBITS_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          frequency,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }
      );

      setTitle("");
      setDescription("");
      setFrequency("daily");

      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      } else {
        setError("There was an error creating habit");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        {error && (
          <Text style={{ color: theme.colors.error, marginBottom: 12 }}>
            {error}
          </Text>
        )}

        <TextInput
          label={"Title"}
          mode="outlined"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          label={"Description"}
          mode="outlined"
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />

        <View style={styles.frequencyContainer}>
          <SegmentedButtons
            buttons={FREQUENCIES.map((freq) => ({
              value: freq,
              label: freq.charAt(0).toUpperCase() + freq.slice(1),
            }))}
            value={frequency}
            onValueChange={(value) => setFrequency(value as Frequency)}
          />
        </View>

        <Button
          mode="contained"
          disabled={!title || !description}
          onPress={handleSubmit}
        >
          Add Habbit
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddHabbitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
  },
  frequencyContainer: {
    marginBottom: 24,
    marginTop: 8,
  },
});
