import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Obstacles({ playerRef, onGameOver }) {
  const [obstacles, setObstacles] = useState([]);
  const timeRef = useRef(0);
  const spawnRate = 0.8; // Spawn obstacle every 0.8 seconds
  const speed = 15;

  useFrame((state, delta) => {
    timeRef.current += delta;
    
    // Spawn new obstacles
    if (timeRef.current > spawnRate) {
      timeRef.current = 0;
      const xPos = (Math.random() - 0.5) * 8; // Random position between -4 and 4
      setObstacles(prev => [...prev, { id: Math.random(), position: new THREE.Vector3(xPos, 0, -30) }]);
    }
  });

  return (
    <>
      {obstacles.map(obs => (
        <Obstacle 
          key={obs.id} 
          obstacle={obs} 
          playerRef={playerRef} 
          speed={speed} 
          onGameOver={onGameOver}
          setObstacles={setObstacles}
        />
      ))}
    </>
  );
}

function Obstacle({ obstacle, playerRef, speed, onGameOver, setObstacles }) {
  const meshRef = useRef();
  
  // Add some random rotation to make obstacles look better
  const rotX = useRef(Math.random() * 0.05);
  const rotY = useRef(Math.random() * 0.05);

  useFrame((state, delta) => {
    if (!meshRef.current || !playerRef.current) return;

    // Move obstacle towards player
    meshRef.current.position.z += speed * delta;
    
    // Rotate slightly
    meshRef.current.rotation.x += rotX.current;
    meshRef.current.rotation.y += rotY.current;

    // Check collision
    const playerPos = playerRef.current.position;
    const obsPos = meshRef.current.position;
    
    // Simple distance bounding box check
    if (Math.abs(playerPos.x - obsPos.x) < 1 && 
        Math.abs(playerPos.y - obsPos.y) < 1 && 
        Math.abs(playerPos.z - obsPos.z) < 1) {
      onGameOver();
    }

    // Remove if passed the camera
    if (obsPos.z > 5) {
      setObstacles(prev => prev.filter(o => o.id !== obstacle.id));
    }
  });

  return (
    <mesh ref={meshRef} position={obstacle.position} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ff6b6b" />
    </mesh>
  );
}
