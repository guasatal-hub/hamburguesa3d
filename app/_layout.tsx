import { usePushNotifications } from "@/lib/core/notifications/usePushNotifications";
import { AuthProvider, useAuth } from "@/lib/modules/auth/AuthProvider";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

function AuthLayout() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const userId = session?.user.id;
  usePushNotifications(userId);

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!session && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (session && inAuthGroup) {
      router.replace('/');
    }
  }, [session, loading, segments]);

  return <Stack />;
}


export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}
