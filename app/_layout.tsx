import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../lib/modules/auth/AuthProvider";
import { usePushNotifications } from "../lib/modules/notifications/usePushNotifications";

function AuthLayout() {
  const { session } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const userId = session?.user?.id;
  usePushNotifications(userId);

  useEffect(() => {
    if (!isMounted) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      router.replace("/(auth)/login");
    } else if (session && inAuthGroup) {
      router.replace("/");
    }
  }, [session, segments, isMounted]);

  if (!isMounted) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/login" options={{ headerShown: true, title: "Login" }} />
      <Stack.Screen name="(auth)/register" options={{ headerShown: true, title: "Registro" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}