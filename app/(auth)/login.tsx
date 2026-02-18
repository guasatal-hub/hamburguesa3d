import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
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
        <View style={styles.screen}>
        <View style={styles.card}>
            <View style={styles.logoBadge}>
                <Ionicons name="fast-food" size={28} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>Tu burger favorita te espera</Text>
            <Text style={styles.subtitle}>Inicia sesión para armar tu hamburguesa 3D</Text>

            <View style={styles.inputGroup}>
                <Ionicons name="mail-outline" size={20} color="#8B5E3C" />
                <TextInput
                    placeholder="Correo electrónico"
                    placeholderTextColor="#A88B72"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputGroup}>
                <Ionicons name="lock-closed-outline" size={20} color="#8B5E3C" />
                <TextInput
                    placeholder="Contraseña"
                    placeholderTextColor="#A88B72"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
            </View>

            <Pressable
                onPress={handleLogin}
                disabled={loading}
                style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            >
                <Ionicons name="log-in-outline" size={18} color="#FFFFFF" />
                <Text style={styles.loginButtonText}>{loading ? 'Cargando...' : 'Ingresar'}</Text>
            </Pressable>
        </View>

        <Link href="/(auth)/register" style={styles.registerLink}>
                ¿No tienes cuenta? Regístrate
            </Link>
        </View>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#F6E9D8',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 22,
        shadowColor: '#4A2B12',
        shadowOpacity: 0.14,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
    },
    logoBadge: {
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: '#D16A2A',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2B1608',
    },
    subtitle: {
        marginTop: 6,
        marginBottom: 20,
        color: '#7F6249',
    },
    inputGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8D4BD',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: '#FFF9F3',
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        marginLeft: 8,
        color: '#3B2414',
    },
    loginButton: {
        marginTop: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#D16A2A',
        borderRadius: 12,
        paddingVertical: 12,
    },
    loginButtonDisabled: {
        opacity: 0.75,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 16,
    },
    registerLink: {
        marginTop: 20,
        textAlign: 'center',
        color: '#7A421B',
        fontWeight: '600',
    },
});