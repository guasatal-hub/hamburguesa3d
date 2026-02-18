import BurgerModel from "@/components/BurgerModel";
import { useAuth } from "@/lib/modules/auth/AuthProvider";
import { Canvas } from "@react-three/fiber/native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ingredientLabels = {
  panSuperior: "Pan superior",
  panInferior: "Pan inferior",
  carne: "Carne",
  lechuga: "Lechuga",
  queso: "Queso",
} as const;

type IngredientKey = keyof typeof ingredientLabels;

export default function Index() {
  const { signOut, session } = useAuth();
  const [ingredients, setIngredients] = useState<Record<IngredientKey, boolean>>({
    panSuperior: false,
    panInferior: false,
    carne: false,
    lechuga: false,
    queso: false,
  });

  const toggleIngredient = (ingredient: IngredientKey) => {
    setIngredients((current) => ({
      ...current,
      [ingredient]: !current[ingredient],
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {session?.user.email}</Text>

      <View style={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }}>
          {/* eslint-disable-next-line react/no-unknown-property */}
          <ambientLight intensity={0.8} />
          {/* eslint-disable-next-line react/no-unknown-property */}
          <directionalLight position={[2, 3, 2]} intensity={1.1} />
          <BurgerModel {...ingredients} />
        </Canvas>
      </View>

      <View style={styles.buttonGrid}>
        {(Object.keys(ingredientLabels) as IngredientKey[]).map((ingredient) => (
          <Pressable
            key={ingredient}
            onPress={() => toggleIngredient(ingredient)}
            style={[styles.ingredientButton, ingredients[ingredient] && styles.ingredientButtonActive]}
          >
            <Text style={styles.ingredientButtonText}>{ingredientLabels[ingredient]}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable onPress={signOut} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: "#f4f4f4",
  },
  welcomeText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 12,
    fontWeight: "600",
  },
  canvasWrapper: {
    width: "100%",
    height: 340,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e2e2e2",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginBottom: 14,
  },
  ingredientButton: {
    backgroundColor: "#2d2d2d",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    minWidth: 125,
    alignItems: "center",
  },
  ingredientButtonActive: {
    backgroundColor: "#0d8f46",
  },
  ingredientButtonText: {
    color: "#ffffff",
    fontWeight: "700",
  },
  logoutButton: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#cb2b2b",
  },
  logoutButtonText: {
    color: "white",
    fontWeight: "700",
  },
});