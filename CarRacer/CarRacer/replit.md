# 3D Car Racing Game

## Overview

This is a 3D car racing game built with React and Three.js, featuring a modern web application architecture with a full-stack Express backend. The application combines immersive 3D graphics with real-time gameplay mechanics, providing an engaging browser-based racing experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for the UI framework
- **React Three Fiber** (@react-three/fiber) for 3D rendering and Three.js integration
- **React Three Drei** (@react-three/drei) for enhanced 3D components and utilities
- **Vite** as the build tool and development server
- **TailwindCSS** for styling with a comprehensive design system
- **Radix UI** components for accessible, pre-built UI elements
- **Zustand** for state management across game and audio systems

### Backend Architecture
- **Express.js** server with TypeScript support
- **Node.js 20** runtime environment
- **In-memory storage** with interface design for future database integration
- **Session-based architecture** ready for user authentication

### 3D Graphics Pipeline
- **Three.js** for WebGL rendering and 3D scene management
- **GLSL shader support** via vite-plugin-glsl for custom graphics effects
- **3D asset loading** with support for GLTF/GLB models and various audio formats
- **Real-time physics** simulation for car movement and collision detection

## Key Components

### Game Engine
- **Car Physics System**: Realistic car movement with acceleration, turning, and collision detection
- **Track System**: Procedurally rendered racing track with asphalt and grass textures
- **Camera System**: Dynamic third-person camera that follows the car smoothly
- **Audio System**: 3D positional audio with engine sounds and collision effects
- **Environment Rendering**: Skybox, trees, buildings, and atmospheric elements

### State Management
- **Game State** (useCarGame): Manages car physics, lap times, scoring, and race progress
- **Audio State** (useAudio): Controls background music, sound effects, and mute functionality
- **General Game State** (useGame): Handles game phases (ready, playing, ended)

### User Interface
- **Game HUD**: Real-time display of speed, lap time, score, and game statistics
- **Control Interface**: Sound toggle, restart functionality, and responsive design
- **3D UI Integration**: Seamless overlay of 2D UI elements on 3D game world

## Data Flow

1. **Input Handling**: Keyboard controls (WASD/Arrow keys) are captured via React Three Fiber's KeyboardControls
2. **Physics Update**: Car position, velocity, and rotation are calculated each frame based on user input
3. **Collision Detection**: Track boundaries and environmental objects are checked for intersections
4. **State Updates**: Game state is updated through Zustand stores with reactive subscriptions
5. **3D Rendering**: Scene is rendered at 60fps with dynamic camera positioning and lighting
6. **Audio Processing**: Spatial audio effects are calculated based on 3D object positions
7. **UI Updates**: React components re-render based on state changes for real-time feedback

## External Dependencies

### Core 3D Libraries
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Helper components for Three.js scenes
- **@react-three/postprocessing**: Visual effects and post-processing pipeline

### UI and Styling
- **@radix-ui/***: Comprehensive accessible component library
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe CSS class variants
- **lucide-react**: Modern icon library

### Database and Query Management
- **@tanstack/react-query**: Server state management and caching
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect configured
- **@neondatabase/serverless**: Serverless PostgreSQL database connection

### Development Tools
- **tsx**: TypeScript execution environment for development
- **esbuild**: Fast JavaScript bundler for production builds
- **vite**: Modern frontend build tool with HMR support

## Deployment Strategy

### Development Environment
- **Replit-optimized**: Configured for Replit's containerized environment
- **Hot Module Replacement**: Instant code updates during development
- **Port Configuration**: Frontend on port 5000 with automatic external mapping

### Production Build
- **Static Asset Generation**: Vite builds optimized client-side bundle
- **Server Bundle**: ESBuild creates production server with external package references
- **Asset Pipeline**: Support for 3D models, textures, audio files, and shaders

### Database Integration
- **Drizzle Kit**: Database migration and schema management
- **PostgreSQL Ready**: Schema and configuration prepared for user data persistence
- **Serverless Compatible**: Designed for serverless deployment environments

### Performance Optimizations
- **Code Splitting**: Automatic bundle optimization for faster loading
- **Asset Optimization**: Texture compression and 3D model optimization
- **Memory Management**: Efficient cleanup of 3D resources and audio objects
- **Frame Rate Control**: Optimized rendering loop for consistent 60fps performance