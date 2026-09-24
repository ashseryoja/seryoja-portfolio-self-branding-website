"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox, useFBO } from "@react-three/drei";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

type Pointer = { x: number; y: number };

type Quality = {
  fbo: number;
  samples: number;
  dpr: [number, number];
  lite: boolean;
};

type BodyKind = "torus" | "sphere" | "capsule" | "box" | "ring";

type Body = {
  kind: BodyKind;
  /** Page position, in viewport heights, where the body sits at rest. */
  page: number;
  /** Horizontal / vertical resting position as a fraction of the half viewport. */
  x: number;
  y: number;
  /** Resting position on portrait screens, where the content fills the width. */
  portrait?: [number, number];
  /** Resting position on the inner pages (landscape, portrait), clear of their headers. */
  away?: [[number, number], [number, number]];
  z: number;
  scale: number;
  /** Scroll speed relative to the content (lower = further away). */
  depth: number;
  spin: [number, number, number];
  lite?: boolean;
};

const BODIES: Body[] = [
  { kind: "torus", page: 0, x: 0.6, y: 0.08, portrait: [0.55, 0.62], away: [[0.7, -0.34], [0.58, -0.56]], z: 0, scale: 1.18, depth: 0.42, spin: [0.14, 0.2, 0.05], lite: true },
  { kind: "sphere", page: 1.25, x: -0.74, y: -0.1, z: -1.2, scale: 0.78, depth: 0.32, spin: [0.05, 0.12, 0] },
  { kind: "box", page: 2.5, x: 0.76, y: 0.12, z: -0.6, scale: 0.72, depth: 0.46, spin: [0.18, 0.24, 0.08], lite: true },
  { kind: "capsule", page: 3.9, x: -0.72, y: 0.02, z: -0.4, scale: 0.95, depth: 0.4, spin: [0.08, 0.16, 0.22] },
  { kind: "ring", page: 5.4, x: 0.72, y: -0.08, z: -0.8, scale: 1.05, depth: 0.36, spin: [0.2, 0.1, 0.06], lite: true },
  { kind: "sphere", page: 6.9, x: -0.7, y: 0.1, z: -0.5, scale: 0.62, depth: 0.5, spin: [0.04, 0.1, 0] },
  { kind: "torus", page: 8.4, x: 0.7, y: 0, z: -1, scale: 0.82, depth: 0.38, spin: [0.16, 0.12, 0.1], lite: true },
  { kind: "box", page: 10, x: -0.72, y: 0.06, z: -0.6, scale: 0.6, depth: 0.44, spin: [0.2, 0.16, 0.04] },
];

/* ------------------------------------------------------------------ */
/* Aurora — the colour field every piece of glass refracts            */
/* ------------------------------------------------------------------ */

const auroraVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const auroraFragment = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uPointer;
  uniform vec2 uResolution;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec3 blob(vec2 p, vec2 c, vec2 r, vec3 color) {
    vec2 d = (p - c) / r;
    return color * exp(-dot(d, d));
  }

  // Wraps a blob's vertical position so colour keeps flowing past while scrolling.
  float lane(float base, float speed) {
    return fract(base + uScroll * speed) * 1.9 - 0.45;
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2(vUv.x * aspect, vUv.y);
    float t = uTime * 0.06;
    vec2 m = uPointer * 0.035;

    vec3 color = vec3(0.006, 0.006, 0.008);

    color += blob(p, vec2(aspect * (0.8 + 0.05 * sin(t * 1.3)), lane(0.82, 0.12) + 0.03 * cos(t)) + m,
                  vec2(0.55, 0.42), vec3(0.03, 0.032, 0.048));
    color += blob(p, vec2(aspect * (0.16 + 0.04 * cos(t * 0.9)), lane(0.35, 0.09)) - m * 0.6,
                  vec2(0.5, 0.46), vec3(0.04, 0.026, 0.036));
    color += blob(p, vec2(aspect * (0.58 + 0.06 * sin(t * 0.7 + 1.7)), lane(0.02, 0.15)) + m * 0.4,
                  vec2(0.44, 0.3), vec3(0.012, 0.02, 0.022));
    color += blob(p, vec2(aspect * (0.34 + 0.05 * sin(t * 1.1 + 2.4)), lane(0.62, 0.07)),
                  vec2(0.32, 0.26), vec3(0.036, 0.018, 0.02));
    color += blob(p, vec2(aspect * (0.9 + 0.03 * cos(t * 1.4)), lane(0.18, 0.11)),
                  vec2(0.3, 0.3), vec3(0.016, 0.018, 0.028));

    // Portrait screens see the same blobs across far less width; calm them.
    color = vec3(0.006, 0.006, 0.008) + (color - vec3(0.006, 0.006, 0.008)) * mix(0.55, 1.0, smoothstep(0.6, 1.3, aspect));

    // Soft horizon of light near the top, like a studio softbox.
    color += vec3(0.02, 0.02, 0.024) * smoothstep(0.55, 1.0, vUv.y) * 0.3;

    // Dither to keep the gradients free of banding.
    color += (hash(gl_FragCoord.xy + uTime) - 0.5) / 255.0;

    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function Aurora({ pointer, reduced }: { pointer: MutableRefObject<Pointer>; reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const shader = material.current;
    if (!shader) return;
    if (!reduced) shader.uniforms.uTime.value += delta;
    if (reduced) return;
    const scroll = window.scrollY / Math.max(1, window.innerHeight);
    shader.uniforms.uScroll.value += (scroll - shader.uniforms.uScroll.value) * Math.min(1, delta * 4);
    const target = shader.uniforms.uPointer.value as THREE.Vector2;
    target.x += (pointer.current.x - target.x) * Math.min(1, delta * 2);
    target.y += (pointer.current.y - target.y) * Math.min(1, delta * 2);
    (shader.uniforms.uResolution.value as THREE.Vector2).set(state.size.width, state.size.height);
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={auroraVertex}
        fragmentShader={auroraFragment}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Network — the original node field, now drifting in depth           */
/* ------------------------------------------------------------------ */

function Network({ reduced, count }: { reduced: boolean; count: number }) {
  const group = useRef<THREE.Group>(null);

  const [positions, lines] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }

    const segments: number[] = [];
    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    for (let i = 0; i < count; i++) {
      a.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
      for (let j = i + 1; j < count; j++) {
        b.set(pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
        if (a.distanceTo(b) < 4.4) {
          segments.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }

    return [pos, new Float32Array(segments)];
  }, [count]);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;
    if (!reduced) {
      node.rotation.y += delta * 0.035;
      node.rotation.x += delta * 0.012;
    }
    if (reduced) return;
    const scroll = window.scrollY / Math.max(1, window.innerHeight);
    const target = scroll * 1.1;
    node.position.y += (target - node.position.y) * Math.min(1, delta * 3);
  });

  return (
    <group ref={group} position={[0, 0, -7]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#ffffff" transparent opacity={0.7} depthWrite={false} />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#dcdce4" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Glass bodies — real transmission with a shared refraction buffer   */
/* ------------------------------------------------------------------ */

function BodyGeometry({ kind, children }: { kind: BodyKind; children: React.ReactNode }) {
  switch (kind) {
    case "torus":
      return (
        <mesh>
          <torusGeometry args={[1, 0.38, 72, 180]} />
          {children}
        </mesh>
      );
    case "ring":
      return (
        <mesh>
          <torusGeometry args={[1, 0.16, 48, 200]} />
          {children}
        </mesh>
      );
    case "sphere":
      return (
        <mesh>
          <sphereGeometry args={[1, 96, 96]} />
          {children}
        </mesh>
      );
    case "capsule":
      return (
        <mesh>
          <capsuleGeometry args={[0.5, 1.25, 24, 64]} />
          {children}
        </mesh>
      );
    case "box":
      return (
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.42} smoothness={10}>
          {children}
        </RoundedBox>
      );
  }
}

function GlassBodies({
  pointer,
  quality,
  reduced,
  home,
}: {
  pointer: MutableRefObject<Pointer>;
  quality: Quality;
  reduced: boolean;
  home: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const holders = useRef<Array<THREE.Group | null>>([]);
  const smoothScroll = useRef(0);
  const tilt = useRef<Pointer>({ x: 0, y: 0 });
  const fbo = useFBO(quality.fbo, quality.fbo);

  const bodies = useMemo(() => (quality.lite ? BODIES.filter((body) => body.lite) : BODIES), [quality.lite]);
  const rotations = useMemo(
    () => bodies.map((_, index) => new THREE.Euler(index * 0.7, index * 1.3, index * 0.4)),
    [bodies],
  );

  useFrame((state, delta) => {
    const container = group.current;
    if (!container) return;

    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 0]);
    const scroll = window.scrollY / Math.max(1, window.innerHeight);
    smoothScroll.current = reduced ? scroll : smoothScroll.current + (scroll - smoothScroll.current) * Math.min(1, delta * 7);
    if (!reduced) {
      tilt.current.x += (pointer.current.x - tilt.current.x) * Math.min(1, delta * 2.5);
      tilt.current.y += (pointer.current.y - tilt.current.y) * Math.min(1, delta * 2.5);
    }

    const fit = THREE.MathUtils.clamp(viewport.width / 11, 0.52, 1.15);
    const portrait = viewport.width < viewport.height;
    const time = state.clock.elapsedTime;

    bodies.forEach((body, index) => {
      const holder = holders.current[index];
      if (!holder) return;

      const [restX, restY] =
        !home && body.away
          ? body.away[portrait ? 1 : 0]
          : portrait && body.portrait
            ? body.portrait
            : [body.x, body.y];
      const y =
        (restY * viewport.height) / 2 +
        // Reduced motion: bodies travel with the content, so nothing drifts.
        (smoothScroll.current - body.page) * viewport.height * (reduced ? 1 : body.depth) +
        (reduced ? 0 : Math.sin(time * 0.5 + index * 1.7) * 0.08);
      const x = (restX * viewport.width) / 2 + tilt.current.x * 0.22 * (1 - body.z * 0.2);
      const scale = body.scale * fit;

      // Glide rather than jump when the layout or route changes the target.
      const glide = holder.userData.placed && !reduced ? Math.min(1, delta * 5) : 1;
      holder.userData.placed = true;
      holder.position.set(
        holder.position.x + (x - holder.position.x) * glide,
        holder.position.y + (y - holder.position.y) * glide,
        body.z,
      );
      holder.scale.setScalar(scale);
      holder.visible = Math.abs(y) < viewport.height / 2 + scale * 2.2;

      const rotation = rotations[index];
      if (!reduced) {
        rotation.x += delta * body.spin[0];
        rotation.y += delta * body.spin[1];
        rotation.z += delta * body.spin[2];
      }
      holder.rotation.set(
        rotation.x - tilt.current.y * 0.35,
        rotation.y + tilt.current.x * 0.45,
        rotation.z,
      );
    });

    // Render the scene once without the glass, then let every body sample it.
    const toneMapping = state.gl.toneMapping;
    container.visible = false;
    state.gl.toneMapping = THREE.NoToneMapping;
    state.gl.setRenderTarget(fbo);
    state.gl.render(state.scene, state.camera);
    state.gl.setRenderTarget(null);
    state.gl.toneMapping = toneMapping;
    container.visible = true;
  });

  return (
    <group ref={group}>
      {bodies.map((body, index) => (
        <group
          key={`${body.kind}-${body.page}`}
          ref={(node) => {
            holders.current[index] = node;
          }}
        >
          <BodyGeometry kind={body.kind}>
            <MeshTransmissionMaterial
              buffer={fbo.texture}
              resolution={16}
              samples={quality.samples}
              transmission={1}
              thickness={body.kind === "ring" ? 0.45 : 1.1}
              roughness={0.04}
              ior={1.32}
              chromaticAberration={0.42}
              anisotropicBlur={0.12}
              distortion={reduced ? 0 : 0.32}
              distortionScale={0.4}
              temporalDistortion={reduced ? 0 : 0.08}
              clearcoat={1}
              clearcoatRoughness={0.08}
              attenuationDistance={2.4}
              attenuationColor="#ffffff"
              color="#ffffff"
              envMapIntensity={1.6}
            />
          </BodyGeometry>
        </group>
      ))}
    </group>
  );
}

function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={3.2} color="#ffffff" position={[0, 5, -6]} scale={[14, 2.6, 1]} />
      <Lightformer form="rect" intensity={1.8} color="#f2f2f5" position={[-7, 0.5, 1]} rotation-y={Math.PI / 2} scale={[16, 1.2, 1]} />
      <Lightformer form="rect" intensity={1.2} color="#f7f3f1" position={[7, -1, 1]} rotation-y={-Math.PI / 2} scale={[16, 0.9, 1]} />
      <Lightformer form="ring" intensity={2.6} color="#ffffff" position={[3, 3, 7]} scale={2.4} target={[0, 0, 0]} />
      <Lightformer form="rect" intensity={0.8} color="#eef1f4" position={[0, -6, 2]} rotation-x={-Math.PI / 2} scale={[12, 3, 1]} />
    </Environment>
  );
}

export default function GlassScene({ home = true, onReady }: { home?: boolean; onReady?: () => void }) {
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  const { quality, reduced } = useMemo(() => {
    const compact = window.matchMedia("(max-width: 767px)").matches;
    const cores = navigator.hardwareConcurrency || 4;
    const lite = compact || cores <= 4;
    return {
      reduced: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      quality: {
        fbo: lite ? 512 : 1024,
        samples: lite ? 4 : 6,
        dpr: (lite ? [1, 1.25] : [1, 1.5]) as [number, number],
        lite,
      },
    };
  }, []);

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <Canvas
      dpr={quality.dpr}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 10], fov: 35, near: 0.1, far: 60 }}
      onCreated={() => onReady?.()}
    >
      <fog attach="fog" args={["#040406", 9, 26]} />
      <Aurora pointer={pointer} reduced={reduced} />
      <Network reduced={reduced} count={quality.lite ? 80 : 120} />
      <GlassBodies pointer={pointer} quality={quality} reduced={reduced} home={home} />
      <Studio />
    </Canvas>
  );
}
