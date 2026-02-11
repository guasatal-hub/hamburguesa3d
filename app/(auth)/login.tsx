import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router'; // Importamos el router para navegar
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Inicializamos el router

  async function handleLogin() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Error", "No pudimos entrar: " + error.message);
    } else {
      console.log("Sesión iniciada correctamente");
      // Tu _layout.tsx detectará la sesión y te llevará a la hamburguesa solo
    }
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenida! 🍔</Text>
      
      <TextInput 
        placeholder="Email" 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none"
        keyboardType="email-address"
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
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "ENTRANDO..." : "ENTRAR"}</Text>
      </TouchableOpacity>

      {/* --- ENLACE AL REGISTRO --- */}
      <TouchableOpacity 
        onPress={() => router.push('/(auth)/register')} 
        style={styles.linkContainer}
      >
        <Text style={styles.linkText}>
          ¿No tienes cuenta? <Text style={styles.linkBold}>Regístrate aquí</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 20, padding: 10, fontSize: 16 },
  button: { backgroundColor: '#FFA500', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  linkContainer: { marginTop: 25, alignItems: 'center' },
  linkText: { color: '#666', fontSize: 14 },
  linkBold: { color: '#FFA500', fontWeight: 'bold' }
});