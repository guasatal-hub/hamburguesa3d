import { useAuth } from "@/lib/modules/auth/AuthProvider";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { signOut, session } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ marginBottom: 20 }}>Bienvenido, {session?.user.email}</Text>
      <Button title="Cerrar Sesión" onPress={signOut} />
    </View>
  );
}
