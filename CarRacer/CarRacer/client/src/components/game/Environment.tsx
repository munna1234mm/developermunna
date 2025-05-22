import { useTexture, Box } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export function Environment() {
  const grassTexture = useTexture("/textures/grass.png");
  
  // Pre-calculate random positions for environmental objects
  const treePositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 60 + Math.random() * 40;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push({ x, z, height: 3 + Math.random() * 4 });
    }
    return positions;
  }, []);
  
  const buildingPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 120 + Math.random() * 20;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      positions.push({ 
        x, 
        z, 
        height: 15 + Math.random() * 25,
        width: 8 + Math.random() * 12,
        depth: 8 + Math.random() * 12
      });
    }
    return positions;
  }, []);

  return (
    <group>
      {/* Skybox - simple colored planes */}
      <Box args={[500, 200, 1]} position={[0, 50, -200]} receiveShadow>
        <meshBasicMaterial color="#87CEEB" />
      </Box>
      <Box args={[500, 200, 1]} position={[0, 50, 200]} receiveShadow>
        <meshBasicMaterial color="#87CEEB" />
      </Box>
      <Box args={[1, 200, 500]} position={[-200, 50, 0]} receiveShadow>
        <meshBasicMaterial color="#87CEEB" />
      </Box>
      <Box args={[1, 200, 500]} position={[200, 50, 0]} receiveShadow>
        <meshBasicMaterial color="#87CEEB" />
      </Box>
      
      {/* Trees around the track */}
      {treePositions.map((pos, i) => (
        <group key={`tree-${i}`} position={[pos.x, 0, pos.z]}>
          {/* Tree trunk */}
          <Box args={[1, pos.height * 0.7, 1]} position={[0, pos.height * 0.35, 0]} castShadow>
            <meshStandardMaterial color="#8B4513" />
          </Box>
          {/* Tree foliage */}
          <Box args={[3, pos.height * 0.4, 3]} position={[0, pos.height * 0.8, 0]} castShadow>
            <meshStandardMaterial color="#228B22" />
          </Box>
        </group>
      ))}
      
      {/* Buildings in the distance */}
      {buildingPositions.map((pos, i) => (
        <Box 
          key={`building-${i}`}
          args={[pos.width, pos.height, pos.depth]} 
          position={[pos.x, pos.height / 2, pos.z]} 
          castShadow
        >
          <meshStandardMaterial color={`hsl(${210 + i * 15}, 20%, ${30 + i * 5}%)`} />
        </Box>
      ))}
      
      {/* Some rocks scattered around */}
      {Array.from({ length: 15 }, (_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 45 + Math.random() * 15;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const size = 0.5 + Math.random() * 1.5;
        
        return (
          <Box 
            key={`rock-${i}`}
            args={[size, size * 0.8, size * 1.2]} 
            position={[x, size * 0.4, z]} 
            rotation={[Math.random() * 0.3, Math.random() * Math.PI, Math.random() * 0.3]}
            castShadow
          >
            <meshStandardMaterial color="#696969" />
          </Box>
        );
      })}
    </group>
  );
}
