import { useMemo } from "react";
import { Asset } from "expo-asset";
import { useGLTF } from "@react-three/drei/native";
import { Object3D } from "three";
import panInferiorModel from "@/assets/images/pan_inferior.glb";
import carneModel from "@/assets/images/carne.glb";
import quesoModel from "@/assets/images/queso.glb";
import lechugaModel from "@/assets/images/lechuga.glb";
import panSuperiorModel from "@/assets/images/pan_superior.glb";

type Props = {
  panSuperior: boolean;
  panInferior: boolean;
  carne: boolean;
  lechuga: boolean;
  queso: boolean;
};

type IngredientPrimitiveProps = {
  assetModule: number;
  visible: boolean;
  y: number;
  color: string;
};

function IngredientPrimitive({
  assetModule,
  visible,
  y,
  color,
}: IngredientPrimitiveProps) {
  const asset = useMemo(() => Asset.fromModule(assetModule), [assetModule]);
  const { scene } = useGLTF(asset.uri) as { scene: Object3D };

  const coloredScene = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.color.set(color);
        child.material.roughness = 0.7;
        child.material.metalness = 0.1;
      }
    });

    return clone;
  }, [scene, color]);

  if (!visible) {
    return null;
  }

  return <primitive object={coloredScene} position={[0, y, 0]} />;
}

export default function BurgerModel({
  panSuperior,
  panInferior,
  carne,
  lechuga,
  queso,
}: Props) {
  return (
    <group scale={0.6}>
      <IngredientPrimitive
        assetModule={panInferiorModel}
        visible={panInferior}
        y={-3.5}
        color="#D9A066"   // Pan
      />
      <IngredientPrimitive
        assetModule={carneModel}
        visible={carne}
        y={-1.2}
        color="#6B2E1A"   // Carne
      />
      <IngredientPrimitive
        assetModule={quesoModel}
        visible={queso}
        y={0.03}
        color="#F4C430"   // Queso
      />
      <IngredientPrimitive
        assetModule={lechugaModel}
        visible={lechuga}
        y={-2.3}
        color="#4CAF50"   // Lechuga
      />
      <IngredientPrimitive
        assetModule={panSuperiorModel}
        visible={panSuperior}
        y={0.2}
        color="#D9A066"   // Pan superior
      />
    </group>
  );
}
