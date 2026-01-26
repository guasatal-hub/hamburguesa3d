import React from "react";
import { useGLTF } from "@react-three/drei";
import { Asset } from "expo-asset";

type Props = {
  pan: boolean;
  carne: boolean;
  queso: boolean;
  lechuga: boolean;
};

export default function BurgerModel({ pan, carne, queso, lechuga }: Props) {
  const asset = Asset.fromModule(
    require("../assets/burger.glb") // 👈 ESTA ERA LA RUTA CORRECTA
  );

  const { nodes } = useGLTF(asset.uri) as any;

  return (
    <group scale={1.5}>
      {pan && (
        <>
          <primitive object={nodes.PanArriba} />
          <primitive object={nodes.PanAbajo} />
        </>
      )}
      {carne && <primitive object={nodes.Carne} />}
      {queso && <primitive object={nodes.Queso} />}
      {lechuga && <primitive object={nodes.Lechuga} />}
    </group>
  );
}
