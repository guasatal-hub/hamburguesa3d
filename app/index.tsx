import React, { Suspense, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { supabase } from '../lib/supabase'; // <--- Importante para poder salir

// --- COMPONENTE DE SEGURIDAD ---
function IngredientMesh({ color, visible, positionY }: { color: string, visible: boolean, positionY: number }) {
  if (!visible) return null;
  return (
    <mesh position={[0, positionY, 0]}>
      <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function HamburgerApp() {
  const [config, setConfig] = useState({
    pan: true,
    carne: true,
    queso: true,
  });

  const toggleIngredient = (name: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [name]: !prev[name] }));
  };

  // --- FUNCIÓN PARA SALIR ---
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasBox}>
        <Canvas camera={{ position: [0, 2, 5] }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          
          <Suspense fallback={null}>
            <IngredientMesh color="#D2B48C" visible={config.pan} positionY={1.2} />
            <IngredientMesh color="#FFD700" visible={config.queso} positionY={0.6} />
            <IngredientMesh color="#5D4037" visible={config.carne} positionY={0} />
            <IngredientMesh color="#D2B48C" visible={true} positionY={-0.6} />
          </Suspense>
        </Canvas>
      </View>

      <View style={styles.uiBox}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>🍔 Configurador 3D</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Text style={styles.logoutText}>Salir</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView contentContainerStyle={styles.scroll}>
          <TouchableOpacity 
            style={[styles.button, config.carne && styles.activeCarne]} 
            onPress={() => toggleIngredient('carne')}
          >
            <Text style={styles.btnText}>{config.carne ? "QUITAR CARNE" : "PONER CARNE"}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, config.queso && styles.activeQueso]} 
            onPress={() => toggleIngredient('queso')}
          >
            <Text style={styles.btnText}>{config.queso ? "QUITAR QUESO" : "PONER QUESO"}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.button, config.pan && styles.activePan]} 
            onPress={() => toggleIngredient('pan')}
          >
            <Text style={styles.btnText}>{config.pan ? "QUITAR TAPA" : "PONER TAPA"}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a' },
  canvasBox: { flex: 0.6 },
  uiBox: { 
    flex: 0.4, 
    backgroundColor: '#fff', 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    padding: 20 
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#ffeded', padding: 8, borderRadius: 10 },
  logoutText: { color: '#ff4444', fontWeight: 'bold' },
  scroll: { alignItems: 'center' },
  button: { 
    backgroundColor: '#eee', 
    padding: 15, 
    borderRadius: 15, 
    width: '90%', 
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd'
  },
  activeCarne: { backgroundColor: '#5D4037', borderColor: '#3E2723' },
  activeQueso: { backgroundColor: '#FFD700', borderColor: '#FBC02D' },
  activePan: { backgroundColor: '#D2B48C', borderColor: '#A1887F' },
  btnText: { fontWeight: 'bold', fontSize: 16, color: '#333' }
});