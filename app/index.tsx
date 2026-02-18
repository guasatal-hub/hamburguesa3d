import BurgerModel from "@/components/BurgerModel";
import { useAuth } from "@/lib/modules/auth/AuthProvider";
import { Environment, OrbitControls } from "@react-three/drei/native";
import { Canvas } from "@react-three/fiber/native";
import { Suspense, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
    panSuperior: true,
    panInferior: true,
    carne: true,
    lechuga: true,
    queso: true,
  });

  const toggleIngredient = (ingredient: IngredientKey) => {
    setIngredients((current) => ({
      ...current,
      [ingredient]: !current[ingredient],
    }));
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.appTitle}>Burger 3D</Text>
          <Text style={styles.subtitle}>
            Bienvenido, {session?.user.email}
          </Text>
        </View>

        <Pressable onPress={signOut} style={styles.logoutIcon}>
          <Ionicons name="log-out-outline" size={22} color="#7A2E0E" />
        </Pressable>
      </View>

      {/* CARD 3D */}
      <View style={styles.canvasWrapper}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={["#FFE8CC"]} />
          <ambientLight intensity={0.95} />
          <directionalLight position={[2, 3, 2]} intensity={1.4} />
          <Suspense fallback={null}>
            <BurgerModel {...ingredients} />
            <Environment preset="sunset" />
          </Suspense>
          <OrbitControls enablePan={false} minDistance={2.8} maxDistance={6} />
        </Canvas>
      </View>

      {/* INGREDIENTES */}
      <Text style={styles.sectionTitle}>Personaliza tu hamburguesa</Text>

      <View style={styles.buttonGrid}>
        {(Object.keys(ingredientLabels) as IngredientKey[]).map((ingredient) => {
          const isActive = ingredients[ingredient];

          return (
            <Pressable
              key={ingredient}
              onPress={() => toggleIngredient(ingredient)}
              style={[
                styles.ingredientButton,
                isActive && styles.ingredientButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.ingredientButtonText,
                  isActive && styles.ingredientButtonTextActive,
                ]}
              >
                {ingredientLabels[ingredient]}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 60,
    backgroundColor: "#FFF4E6",
  },

  /* HEADER */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#4A2B12",
  },
  subtitle: {
    fontSize: 14,
    color: "#7A5C4D",
    marginTop: 4,
  },
  logoutIcon: {
    backgroundColor: "#FFD8C2",
    padding: 10,
    borderRadius: 50,
  },

  /* CANVAS CARD */
  canvasWrapper: {
    width: "100%",
    height: 360,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#FFE8CC",
    marginBottom: 20,
    elevation: 8,
  },

  /* SECTION TITLE */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
    color: "#5A3825",
  },

  /* INGREDIENT BUTTONS */
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  ingredientButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 130,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0C9B2",
  },
  ingredientButtonActive: {
    backgroundColor: "#D16A2A",
    borderColor: "#D16A2A",
  },
  ingredientButtonText: {
    color: "#5A3825",
    fontWeight: "700",
  },
  ingredientButtonTextActive: {
    color: "#FFFFFF",
  },
});
