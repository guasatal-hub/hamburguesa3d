import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useAuth } from '../../lib/modules/auth/AuthProvider';

export default function LoginScreen() {
    const { signInWithEmail, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            await signInWithEmail(email, password);

        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text>Iniciar Sesión (Test Mode)</Text>

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
                title={loading ? "Cargando..." : "Ingresar"}
                onPress={handleLogin}
                disabled={loading}
            />

            <Link href="/(auth)/register" style={{ marginTop: 20, textAlign: 'center', color: 'blue' }}>
                ¿No tienes cuenta? Regístrate
            </Link>
        </View>
    );
}