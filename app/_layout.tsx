import { useEffect } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "../lib/modules/auth/AuthProvider";
import { usePushNotifications } from "../lib/modules/notifications/usePushNotifications";

// Este componente maneja la lógica de navegación y notificaciones
function AuthLayout() {
  const { session } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // 1. Lógica de Notificaciones Push
  // Obtenemos el ID del usuario de la sesión de Supabase
  const userId = session?.user?.id;
  // El hook solicita permisos y guarda el token en la DB automáticamente
  usePushNotifications(userId);

  // 2. Lógica de Redirección (Protección de Rutas)
  useEffect(() => {
    // Verificamos si el usuario está en el grupo de autenticación (login/register)
    const inAuthGroup = segments[0] === "(auth)";

    if (!session && !inAuthGroup) {
      // Si no hay sesión y el usuario intenta entrar a la app (index), 
      // lo mandamos al Login
      router.replace("/(auth)/login");
    } else if (session && inAuthGroup) {
      // Si ya inició sesión y está en las pantallas de Auth, 
      // lo mandamos a la pantalla principal (hamburguesa 3D)
      router.replace("/");
    }
  }, [session, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Pantalla principal de la hamburguesa */}
      <Stack.Screen name="index" />
      
      {/* Grupo de pantallas de autenticación */}
      <Stack.Screen 
        name="(auth)/login" 
        options={{ 
          headerShown: true, 
          title: "Iniciar Sesión",
          headerBackVisible: false 
        }} 
      />
      <Stack.Screen 
        name="(auth)/register" 
        options={{ 
          headerShown: true, 
          title: "Crear Cuenta" 
        }} 
      />
    </Stack>
  );
}

// El RootLayout envuelve todo en el AuthProvider para que la sesión esté disponible
export default function RootLayout() {
  return (
    <AuthProvider>
      <AuthLayout />
    </AuthProvider>
  );
}