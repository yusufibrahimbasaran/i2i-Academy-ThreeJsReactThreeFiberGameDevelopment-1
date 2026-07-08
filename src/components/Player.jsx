import React, { forwardRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Player = forwardRef((props, ref) => {
  const [keys, setKeys] = useState({ left: false, right: false });
  const speed = 10;
  const limits = 4; // limit movement to left and right bounds

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') setKeys(k => ({ ...k, left: true }));
      if (e.code === 'ArrowRight' || e.code === 'KeyD') setKeys(k => ({ ...k, right: true }));
    };
    const handleKeyUp = (e) => {
      if (e.code === 'ArrowLeft' || e.code === 'KeyA') setKeys(k => ({ ...k, left: false }));
      if (e.code === 'ArrowRight' || e.code === 'KeyD') setKeys(k => ({ ...k, right: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Movement logic
    if (keys.left) {
      ref.current.position.x -= speed * delta;
      // Add slight rotation for dynamic feel
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 0.2, 0.1);
    } else if (keys.right) {
      ref.current.position.x += speed * delta;
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -0.2, 0.1);
    } else {
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, 0, 0.1);
    }

    // Clamp position
    ref.current.position.x = THREE.MathUtils.clamp(ref.current.position.x, -limits, limits);
  });

  return (
    <mesh ref={ref} castShadow position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00d2d3" />
    </mesh>
  );
});

export default Player;
