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
};

function IngredientPrimitive({ assetModule, visible, y }: IngredientPrimitiveProps) {
  const asset = useMemo(() => Asset.fromModule(assetModule), [assetModule]);
  const { scene } = useGLTF(asset.uri) as { scene: Object3D };

  if (!visible) {
    return null;
  }

  // eslint-disable-next-line react/no-unknown-property
  return <primitive object={scene.clone()} position={[0, y, 0]} />;
}
export default function BurgerModel({
  panSuperior,
  panInferior,
  carne,
  lechuga,
  queso,
}: Props) {

  return (
    <group scale={1.6}>
      <IngredientPrimitive
        assetModule={panInferiorModel}
        visible={panInferior}
        y={-0.45}
      />
      <IngredientPrimitive assetModule={carneModel} visible={carne} y={-0.2} />
      <IngredientPrimitive assetModule={quesoModel} visible={queso} y={0.03} />
      <IngredientPrimitive assetModule={lechugaModel} visible={lechuga} y={0.2} />
      <IngredientPrimitive
        assetModule={panSuperiorModel}
        visible={panSuperior}
        y={0.45}
      />
    </group>
  );
}
