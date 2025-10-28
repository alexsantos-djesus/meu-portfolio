"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { paused?: boolean };

export default function TechCube({ paused = false }: Props) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const rafRef = useRef<number | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);

  // cria cena uma vez
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const width = el.clientWidth;
    const height = 260;

    // scene & camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 4;

    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    el.appendChild(renderer.domElement);

    // objeto
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ffe1,
      metalness: 0.6,
      roughness: 0.2,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // luzes
    const light1 = new THREE.PointLight(0xff00f5, 2, 10);
    light1.position.set(5, 5, 5);
    const light2 = new THREE.PointLight(0x00a3ff, 2, 10);
    light2.position.set(-5, -3, 5);
    scene.add(light1, light2);

    // guardar refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    cubeRef.current = cube;

    // resize responsivo
    const handleResize = () => {
      if (!rendererRef.current || !cameraRef.current || !wrapperRef.current)
        return;
      const w = wrapperRef.current.clientWidth;
      const h = height; // altura fixa leve – ajuste se quiser
      rendererRef.current.setSize(w, h);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      // re-render estático após resize
      rendererRef.current.render(sceneRef.current!, cameraRef.current!);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(el);
    roRef.current = ro;

    // render inicial
    renderer.render(scene, camera);

    // cleanup geral
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      roRef.current?.disconnect();
      roRef.current = null;

      geometry.dispose();
      material.dispose();
      renderer.dispose();

      // remove canvas
      el.removeChild(renderer.domElement);

      // solta refs
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      cubeRef.current = null;
    };
  }, []);

  // loop de animação (controlado por "paused")
  useEffect(() => {
    const renderer = rendererRef.current;
    const camera = cameraRef.current;
    const scene = sceneRef.current;
    const cube = cubeRef.current;
    if (!renderer || !camera || !scene || !cube) return;

    const animate = () => {
      // gira só quando não está pausado
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.012;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    if (paused) {
      // parado: só garante que a cena atual está desenhada
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      renderer.render(scene, camera);
      return;
    }

    // rodar
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [paused]);

  return (
    <div
      ref={wrapperRef}
      aria-hidden
      className="w-full"
      style={{ height: 260 }}
    />
  );
}
