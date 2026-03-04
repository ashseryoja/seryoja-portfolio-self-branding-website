"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NodeNetwork() {
    const group = useRef<THREE.Group>(null);
    const numNodes = 120;

    // Generate random positions for nodes
    const [positions, lines] = useMemo(() => {
        const pos = new Float32Array(numNodes * 3);
        for (let i = 0; i < numNodes; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 25; // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 25; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
        }

        const lineGeo = [];
        // Connect nodes that are close to each other
        for (let i = 0; i < numNodes; i++) {
            const v1 = new THREE.Vector3(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
            for (let j = i + 1; j < numNodes; j++) {
                const v2 = new THREE.Vector3(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
                if (v1.distanceTo(v2) < 4.5) {
                    lineGeo.push(v1.x, v1.y, v1.z);
                    lineGeo.push(v2.x, v2.y, v2.z);
                }
            }
        }

        return [pos, new Float32Array(lineGeo)];
    }, []);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.05;
            group.current.rotation.x = state.clock.elapsedTime * 0.02;
        }
    });

    return (
        <group ref={group}>
            {/* Nodes */}
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.08} color="#ffffff" transparent opacity={0.6} />
            </points>
            {/* Connections between nodes */}
            <lineSegments>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[lines, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="#ffffff" transparent opacity={0.12} />
            </lineSegments>
        </group>
    );
}

export default function NetworkBackground() {
    return (
        <div className="fixed inset-0 z-0 bg-black pointer-events-none">
            <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
                <fog attach="fog" args={["#000000", 10, 30]} />
                <NodeNetwork />
            </Canvas>
            {/* Subtle overlay to blend depth into pure black */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </div>
    );
}
