# 3D Endless Runner Game (React Three Fiber)

This is a browser-based 3D interactive game developed as part of the "Three.js / React Three Fiber Game Development" assignment for i2i Academy.

## Project Scope
The goal of this project is to demonstrate fundamental knowledge of WebGL and 3D graphics in the browser using **React Three Fiber (R3F)**. The game is an endless runner style obstacle avoider where the player must dodge incoming red blocks.

## Core Mechanics
- **Scene Infrastructure**: Built with R3F Canvas, including a Perspective Camera, WebGL Renderer, Ground Plane, and Dynamic Lighting (Ambient + Directional with shadows).
- **Player Controls**: The player controls a blue box using the `A/D` or `Left/Right Arrow` keys. The movement is smoothed using linear interpolation (lerp).
- **Game Loop & Obstacles**: Red obstacle blocks are dynamically spawned and continuously move towards the player inside the `useFrame` game loop.
- **Collision Detection**: Implemented bounding-box style distance checks to detect collisions between the player and obstacles.
- **State Management & UI**: React state tracks the player's score and game status, rendering a 2D HTML overlay for the Score and Game Over screens.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## Technologies Used
- React
- Vite
- React Three Fiber (`@react-three/fiber`)
- Drei (`@react-three/drei`)
- Three.js
