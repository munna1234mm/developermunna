import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { useCarGame } from "../../lib/stores/useCarGame";
import { useAudio } from "../../lib/stores/useAudio";

enum Controls {
  forward = 'forward',
  backward = 'backward',
  left = 'left',
  right = 'right',
  brake = 'brake'
}

export function Car() {
  const carRef = useRef<THREE.Group>(null);
  const { car, updateCar } = useCarGame();
  const { playHit } = useAudio();
  const [subscribe, getControls] = useKeyboardControls<Controls>();
  
  // Audio setup
  useEffect(() => {
    const engineSound = new Audio('/sounds/background.mp3');
    engineSound.loop = true;
    engineSound.volume = 0.3;
    
    // Start engine sound
    engineSound.play().catch(console.log);
    
    return () => {
      engineSound.pause();
    };
  }, []);

  // Log controls for debugging
  useEffect(() => {
    return subscribe(
      (state) => state,
      (controls) => {
        const activeControls = Object.entries(controls)
          .filter(([, pressed]) => pressed)
          .map(([control]) => control);
        if (activeControls.length > 0) {
          console.log("Active controls:", activeControls);
        }
      }
    );
  }, [subscribe]);

  useFrame((state, delta) => {
    if (!carRef.current) return;
    
    const controls = getControls();
    const group = carRef.current;
    
    // Calculate movement based on controls
    let acceleration = 0;
    let steering = 0;
    
    if (controls.forward) {
      acceleration = car.acceleration;
    }
    if (controls.backward) {
      acceleration = -car.acceleration * 0.7; // Reverse is slower
    }
    if (controls.left) {
      steering = car.turnSpeed;
    }
    if (controls.right) {
      steering = -car.turnSpeed;
    }
    if (controls.brake) {
      acceleration = 0;
      // Apply braking force
      car.velocity.multiplyScalar(0.9);
    }
    
    // Apply steering only when moving
    if (Math.abs(car.speed) > 0.1) {
      car.rotation.y += steering * (car.speed / car.maxSpeed);
    }
    
    // Update velocity based on car rotation
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyEuler(car.rotation);
    
    // Apply acceleration
    if (acceleration !== 0) {
      const accelVector = direction.clone().multiplyScalar(acceleration);
      car.velocity.add(accelVector);
    }
    
    // Apply friction
    car.velocity.multiplyScalar(0.95);
    
    // Limit max speed
    const currentSpeed = car.velocity.length();
    if (currentSpeed > car.maxSpeed) {
      car.velocity.normalize().multiplyScalar(car.maxSpeed);
    }
    
    // Update position
    car.position.add(car.velocity.clone().multiplyScalar(delta));
    
    // Simple collision with track boundaries
    const trackSize = 40;
    if (Math.abs(car.position.x) > trackSize) {
      car.position.x = Math.sign(car.position.x) * trackSize;
      car.velocity.x *= -0.5;
      playHit();
    }
    if (Math.abs(car.position.z) > trackSize) {
      car.position.z = Math.sign(car.position.z) * trackSize;
      car.velocity.z *= -0.5;
      playHit();
    }
    
    // Keep car on ground
    car.position.y = 0.5;
    
    // Update car state
    updateCar({
      position: car.position.clone(),
      rotation: car.rotation.clone(),
      velocity: car.velocity.clone(),
      speed: currentSpeed
    });
    
    // Apply transforms to mesh
    group.position.copy(car.position);
    group.rotation.copy(car.rotation);
  });

  return (
    <group ref={carRef}>
      {/* Car body */}
      <Box args={[2, 0.8, 4]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#ff4444" />
      </Box>
      
      {/* Car roof */}
      <Box args={[1.6, 0.6, 2]} position={[0, 0.7, -0.2]} castShadow>
        <meshStandardMaterial color="#cc2222" />
      </Box>
      
      {/* Wheels */}
      <Box args={[0.3, 0.6, 0.6]} position={[-1.2, -0.3, 1.4]} castShadow>
        <meshStandardMaterial color="#222222" />
      </Box>
      <Box args={[0.3, 0.6, 0.6]} position={[1.2, -0.3, 1.4]} castShadow>
        <meshStandardMaterial color="#222222" />
      </Box>
      <Box args={[0.3, 0.6, 0.6]} position={[-1.2, -0.3, -1.4]} castShadow>
        <meshStandardMaterial color="#222222" />
      </Box>
      <Box args={[0.3, 0.6, 0.6]} position={[1.2, -0.3, -1.4]} castShadow>
        <meshStandardMaterial color="#222222" />
      </Box>
      
      {/* Headlights */}
      <Box args={[0.4, 0.3, 0.2]} position={[-0.6, 0.2, 2.1]} castShadow>
        <meshStandardMaterial color="#ffffaa" emissive="#444400" />
      </Box>
      <Box args={[0.4, 0.3, 0.2]} position={[0.6, 0.2, 2.1]} castShadow>
        <meshStandardMaterial color="#ffffaa" emissive="#444400" />
      </Box>
    </group>
  );
}
