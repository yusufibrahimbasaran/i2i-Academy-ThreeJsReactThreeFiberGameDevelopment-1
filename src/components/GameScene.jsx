import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import Player from './Player';
import Obstacles from './Obstacles';

export default function GameScene({ gameOver, onGameOver }) {
  const playerRef = useRef();

  return (
    <Canvas shadows camera={{ position: [0, 5, 8], fov: 50 }}>
      <Suspense fallback={null}>
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          castShadow 
          position={[10, 20, 10]} 
          intensity={1.5} 
          shadow-mapSize={[1024, 1024]}
        />
        
        {/* Ground */}
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#2d3436" />
        </mesh>

        {!gameOver && (
          <>
            <Player ref={playerRef} />
            <Obstacles playerRef={playerRef} onGameOver={onGameOver} />
          </>
        )}
      </Suspense>
    </Canvas>
  );
}
