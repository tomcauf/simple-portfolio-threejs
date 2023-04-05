import {
    useMatcapTexture,
    Center,
    Text3D,
    OrbitControls,
  } from "@react-three/drei";
  import { Perf } from "r3f-perf";
  import React, { useEffect, useRef, useState } from "react";
  import { useFrame } from "@react-three/fiber";
  import * as THREE from "three";
  
  const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
  const material = new THREE.MeshMatcapMaterial();
  let donuts;
  const Donuts = React.memo(() => (
      <>
          {[...Array(100)].map((value, index) => (
          <mesh
              onClick={() => donuts.current[index].scale.set(0, 0, 0)}
              ref={(element) => (donuts.current[index] = element)}
              key={index}
              geometry={torusGeometry}
              material={material}
              position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              ]}
              scale={0.2 + Math.random() * 0.2}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          >
              <torusGeometry args={[1, 0.6, 16, 32]} />
          </mesh>
          ))}
      </>
      ));
  
  export default function Experience() {
    const [name, setName] = useState("");
      donuts = useRef(new Array(100));
  
    const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  
    useFrame((state, delta) => {
      for (const donut of donuts.current) {
        donut.rotation.y += delta * 0.2;
      }
    });
  
    useEffect(() => {
      const nameToDisplay = "Tom Caufrier";
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < nameToDisplay.length) {
          setName(nameToDisplay.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 200);
    }, []);
  
    useEffect(() => {
      matcapTexture.encoding = THREE.sRGBEncoding;
      matcapTexture.needsUpdate = true;
  
      material.matcap = matcapTexture;
      material.needsUpdate = true;
    }, []);
  
    return (
      <>
        <OrbitControls makeDefault />
        <Center>
          <Text3D
            material={material}
            font="./fonts/helvetiker_regular.typeface.json"
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {name}
          </Text3D>
  
          <Text3D
            material={material}
            font="./fonts/helvetiker_regular.typeface.json"
            size={0.3}
            height={0.1}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
            position={[0.2, -0.5, 0]}
          >
            Passionate Developer
          </Text3D>
        </Center>
        <Donuts />
      </>
    );
  }
  