import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useCarGame } from "../../lib/stores/useCarGame";

export function GameCamera() {
  const { camera } = useThree();
  const { car } = useCarGame();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());
  
  useFrame(() => {
    if (!car.position) return;
    
    // Calculate camera position behind and above the car
    const carDirection = new THREE.Vector3(0, 0, 1);
    carDirection.applyEuler(car.rotation);
    
    // Position camera behind the car
    const offset = carDirection.clone().multiplyScalar(-12); // 12 units behind
    offset.y = 6; // 6 units above
    
    targetPosition.current.copy(car.position).add(offset);
    
    // Look at point slightly ahead of the car
    const lookAhead = carDirection.clone().multiplyScalar(8);
    targetLookAt.current.copy(car.position).add(lookAhead);
    targetLookAt.current.y = 1; // Look slightly above ground
    
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.1);
    camera.lookAt(targetLookAt.current);
  });
  
  return null;
}
