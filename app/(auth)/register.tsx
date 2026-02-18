import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../lib/modules/auth/AuthProvider';

export default function RegisterScreen() {
    const { signUpWithEmail, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            await signUpWithEmail(email, password);
            alert('¡Registro exitoso! Por favor verifica tu correo si es necesario.');
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Registro</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
                autoCapitalize="none"
            />

            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginBottom: 20, padding: 8 }}
            />

            <Button
                title={loading ? "Registrando..." : "Registrarse"}
                onPress={handleRegister}
                disabled={loading}
            />

            <Link href="/(auth)/login" style={{ marginTop: 20, textAlign: 'center', color: 'blue' }}>
                ¿Ya tienes cuenta? Inicia sesión
            </Link>
        </View>
    );
}
