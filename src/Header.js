import * as THREE from "three";
import { useState, useRef, Suspense, useMemo } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
import {
  Reflector,
  CameraShake,
  OrbitControls,
  useTexture,
} from "@react-three/drei";

import { KernelSize } from "postprocessing";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

import "./Header.css";

function Logo({ color, ...props }) {
  const ref = useRef();
  const [r] = useState(() => Math.random() * 10000);
  useFrame(
    (_) =>
      (ref.current.position.y = -1.75 + Math.sin(_.clock.elapsedTime + r) / 10)
  );
  const { paths: [path] } = useLoader(SVGLoader, '/logortreversetest.svg') // prettier-ignore
  // const reducer = (previousValue, currentValue) => previousValue + currentValue;
  path.userData.style.strokeLineCap = "square";
  path.userData.style.strokeWidth = 4;

  const geom1 = useMemo(
    () =>
      SVGLoader.pointsToStroke(
        path.subPaths[0].getPoints(),
        path.userData.style
      ),
    []
  );

  const geom2 = useMemo(
    () =>
      SVGLoader.pointsToStroke(
        path.subPaths[1].getPoints(),
        path.userData.style
      ),
    []
  );

  return (
    <group ref={ref}>
      <mesh geometry={geom1} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
      <mesh geometry={geom2} {...props}>
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Ground(props) {
  const [floor, normal] = useTexture([
    "/SurfaceImperfections003_1K_var1.jpg",
    "/glass2.jpg",
  ]);
  return (
    <Reflector resolution={1024} args={[7, 7]} {...props}>
      {(Material, props) => (
        <Material
          color='#f0f0f0'
          metalness={0}
          roughnessMap={floor}
          normalMap={normal}
          normalScale={[0.1, 0.1]}
          {...props}
        />
      )}
    </Reflector>
  );
}

function Rig({ children }) {
  const ref = useRef();
  const vec = new THREE.Vector3();
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.lerp(vec.set(mouse.x * 2, 0, 3.5), 0.05);
    ref.current.position.lerp(vec.set(mouse.x * 1, mouse.y * 0.1, 0), 0.1);
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (-mouse.x * Math.PI) / 20,
      0.1
    );
  });
  return <group ref={ref}>{children}</group>;
}

export default function Header() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      className={"header"}
      camera={{ position: [0, 0, 15] }}>
      <color attach='background' args={["black"]} />
      <Suspense
        fallback={<html center className='loading' children='Loading...' />}>
        <ambientLight />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
        <Suspense fallback={null}>
          <Rig>
            <Logo
              color='#ff2060'
              scale={0.007}
              position={[-4.5, 0.8, -0.7]}
              rotation={[0, 0, 0]}
            />
            <Logo
              color='cyan'
              scale={0.007}
              position={[-4.5, 0.8, -0.5]}
              rotation={[0, 0, 0]}
            />
            <Logo
              color='#ff2060'
              scale={0.007}
              position={[0, 0.8, -0.7]}
              rotation={[0, 0, 0]}
            />
            <Logo
              color='cyan'
              scale={0.007}
              position={[0, 0.8, -0.5]}
              rotation={[0, 0, 0]}
            />
            <Ground
              mirror={0.9}
              mixBlur={1.2}
              mixStrength={0.8}
              rotation={[-Math.PI / 2, 0, Math.PI / 2]}
              blur={[300, 120]}
              position-y={-0.4}
            />
          </Rig>
          <EffectComposer multisampling={8}>
            <Bloom
              kernelSize={3}
              luminanceThreshold={0}
              luminanceSmoothing={0.4}
              intensity={0.6}
            />
            <Bloom
              kernelSize={KernelSize.HUGE}
              luminanceThreshold={0}
              luminanceSmoothing={0}
              intensity={0.5}
            />
          </EffectComposer>
        </Suspense>
        <CameraShake
          yawFrequency={0.2}
          pitchFrequency={0.2}
          rollFrequency={0.2}
        />
      </Suspense>
    </Canvas>
  );
}
