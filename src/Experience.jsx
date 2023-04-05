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

  export default function Experience() {
    const [name, setName] = useState("");

    const [matcapTexture] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);


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

      </>
    );
  }
  