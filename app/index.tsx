import React, { Suspense, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Canvas } from '@react-three/fiber/native';

// --- COMPONENTE DE SEGURIDAD (Si falla el 3D, muestra un bloque sólido) ---
function IngredientMesh({ color, visible, positionY }: { color: string, visible: boolean, positionY: number }) {
  if (!visible) return null;
  return (
    <mesh position={[0, positionY, 0]}>
      {/* Usamos cilindros aplanados para que parezcan piezas de hamburguesa */}
      <cylinderGeometry args={[1.2, 1.2, 0.3, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function HamburgerApp() {
  // --- ESTADO DEL MENÚ (Tu reto) ---
  const [config, setConfig] = useState({
    pan: true,
    carne: true,
    queso: true,
  });

  const toggleIngredient = (name: keyof typeof config) => {
    setConfig(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasBox}>
        <Canvas camera={{ position: [0, 2, 5] }}>
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />
          
          <Suspense fallback={null}>
            {/* PAN SUPERIOR (Dorado) */}
            <IngredientMesh color="#D2B48C" visible={config.pan} positionY={1.2} />
            
            {/* QUESO (Amarillo) */}
            <IngredientMesh color="#FFD700" visible={config.queso} positionY={0.6} />
            
            {/* CARNE (Café) */}
            <IngredientMesh color="#5D4037" visible={config.carne} positionY={0} />
            
            {/* BASE (Dorado) */}
            <IngredientMesh color="#D2B48C" visible={true} positionY={-0.6} />
          </Suspense>
        </Canvas>
      </View>

      <View style={styles.uiBox}>
        <Text style={styles.title}>🍔 Configurador 3D</Text>
        
        <ScrollView contentContainerStyle={styles.scroll}>
          {/* BOTÓN CARNE */}
          <TouchableOpacity 
            style={[styles.button, config.carne && styles.activeCarne]} 
            onPress={() => toggleIngredient('carne')}
          >
            <Text style={styles.btnText}>{config.carne ? "QUITAR CARNE" : "PONER CARNE"}</Text>
          </TouchableOpacity>

          {/* BOTÓN QUESO */}
          <TouchableOpacity 
            style={[styles.button, config.queso && styles.activeQueso]} 
            onPress={() => toggleIngredient('queso')}
          >
            <Text style={styles.btnText}>{config.queso ? "QUITAR QUESO" : "PONER QUESO"}</Text>
          </TouchableOpacity>

          {/* BOTÓN PAN */}
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
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
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