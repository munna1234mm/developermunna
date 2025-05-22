import { useTexture, Box, Plane } from "@react-three/drei";
import * as THREE from "three";

export function Track() {
  const asphaltTexture = useTexture("/textures/asphalt.png");
  const grassTexture = useTexture("/textures/grass.png");
  
  // Configure texture repeating
  asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping;
  asphaltTexture.repeat.set(20, 20);
  
  grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
  grassTexture.repeat.set(40, 40);

  return (
    <group>
      {/* Main ground plane with grass */}
      <Plane 
        args={[200, 200]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial map={grassTexture} />
      </Plane>
      
      {/* Racing track - oval shape */}
      <group>
        {/* Straight sections */}
        <Box args={[8, 0.1, 60]} position={[-15, 0.05, 0]} receiveShadow>
          <meshStandardMaterial map={asphaltTexture} />
        </Box>
        <Box args={[8, 0.1, 60]} position={[15, 0.05, 0]} receiveShadow>
          <meshStandardMaterial map={asphaltTexture} />
        </Box>
        
        {/* Curved sections - approximated with multiple boxes */}
        {/* Top curve */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 7) * Math.PI;
          const x = Math.cos(angle) * 15;
          const z = 25 + Math.sin(angle) * 10;
          const rotation = angle;
          
          return (
            <Box 
              key={`top-${i}`}
              args={[8, 0.1, 8]} 
              position={[x, 0.05, z]}
              rotation={[0, rotation, 0]}
              receiveShadow
            >
              <meshStandardMaterial map={asphaltTexture} />
            </Box>
          );
        })}
        
        {/* Bottom curve */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 7) * Math.PI + Math.PI;
          const x = Math.cos(angle) * 15;
          const z = -25 + Math.sin(angle) * 10;
          const rotation = angle;
          
          return (
            <Box 
              key={`bottom-${i}`}
              args={[8, 0.1, 8]} 
              position={[x, 0.05, z]}
              rotation={[0, rotation, 0]}
              receiveShadow
            >
              <meshStandardMaterial map={asphaltTexture} />
            </Box>
          );
        })}
      </group>
      
      {/* Track barriers */}
      <group>
        {/* Inner barriers */}
        <Box args={[1, 2, 40]} position={[-10, 1, 0]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
        <Box args={[1, 2, 40]} position={[10, 1, 0]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
        
        {/* Outer barriers */}
        <Box args={[1, 2, 80]} position={[-25, 1, 0]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
        <Box args={[1, 2, 80]} position={[25, 1, 0]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
        <Box args={[50, 2, 1]} position={[0, 1, 40]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
        <Box args={[50, 2, 1]} position={[0, 1, -40]} castShadow>
          <meshStandardMaterial color="#666666" />
        </Box>
      </group>
      
      {/* Start/Finish line */}
      <Box args={[8, 0.11, 2]} position={[0, 0.06, -25]} receiveShadow>
        <meshStandardMaterial color="#ffffff" />
      </Box>
      
      {/* Checkered pattern for start/finish */}
      {Array.from({ length: 8 }, (_, i) => (
        <Box 
          key={i}
          args={[1, 0.12, 0.5]} 
          position={[-3.5 + i, 0.07, -25 + (i % 2) * 1]}
          receiveShadow
        >
          <meshStandardMaterial color={i % 2 === 0 ? "#000000" : "#ffffff"} />
        </Box>
      ))}
    </group>
  );
}
