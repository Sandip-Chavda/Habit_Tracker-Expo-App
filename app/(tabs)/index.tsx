import { useAuth } from "@/lib/auth-context";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx</Text>
      <Button mode="contained" onPress={signOut}>
        Logout
      </Button>
    </View>
  );
}
