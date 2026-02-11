import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSignUp() {
    if (!email || !password || !username) {
      Alert.alert("Error", "Por favor llena todos los campos");
      return;
    }

    setLoading(true);

    // 1. Crear el usuario en la sección de Autenticación
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      Alert.alert("Error de registro", signUpError.message);
      setLoading(false);
      return;
    }

    // 2. Si el usuario se creó, lo guardamos en nuestra tabla 'profiles'
    if (user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { 
            id: user.id, // Usamos el mismo ID que generó Auth
            username: username,
            email: email,
            expo_push_token: null // Se llenará cuando entre a la app
          }
        ]);

      if (profileError) {
        console.error("Error al crear perfil:", profileError.message);
      } else {
        Alert.alert("¡Éxito!", "Cuenta creada. Revisa tu correo si activaste la confirmación.");
        router.replace('/(auth)/login');
      }
    }
    
    setLoading(false);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crear Cuenta 🍔</Text>
      
      <TextInput 
        placeholder="Nombre de usuario" 
        value={username} 
        onChangeText={setUsername} 
        style={styles.input} 
      />
      
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none"
      />
      
      <TextInput 
        placeholder="Contraseña" 
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry 
        style={styles.input} 
      />

      <TouchableOpacity 
        style={[styles.button, loading && { opacity: 0.7 }]} 
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "CREANDO..." : "REGISTRARME"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()} style={styles.link}>
        <Text style={styles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10 },
  button: { backgroundColor: '#FFA500', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  link: { marginTop: 20, alignItems: 'center' },
  linkText: { color: '#666' }
});