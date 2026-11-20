import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({ threatLevel = 'SAFE' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // 1. Central 3D Cyber Security Shield / Icosahedron
    const geoCore = new THREE.IcosahedronGeometry(7, 1);
    const matCore = new THREE.MeshBasicMaterial({
      color: threatLevel === 'CRITICAL' ? 0xef4444 : threatLevel === 'WARNING' ? 0xf59e0b : 0x00d2ff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const coreMesh = new THREE.Mesh(geoCore, matCore);
    scene.add(coreMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(3.5, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: threatLevel === 'CRITICAL' ? 0xff2222 : 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // 2. Holographic Scanning Orbit Rings
    const ringGeo = new THREE.TorusGeometry(10.5, 0.05, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    scene.add(ring2);

    // 3. Cyber Particles Constellation Field
    const particleCount = 750;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorA = new THREE.Color(0x00b9f5); // Paytm Cyan
    const colorB = new THREE.Color(0x6366f1); // Indigo
    const colorDanger = new THREE.Color(0xef4444); // Red alert

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 70;
      positions[i + 1] = (Math.random() - 0.5) * 70;
      positions[i + 2] = (Math.random() - 0.5) * 50;

      const mixedColor = (threatLevel === 'CRITICAL')
        ? colorDanger
        : (Math.random() > 0.5 ? colorA : colorB);

      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      coreMesh.rotation.x += 0.003;
      coreMesh.rotation.y += 0.005;

      innerMesh.rotation.y -= 0.007;

      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;

      particles.rotation.y += 0.0008;

      scene.rotation.y = targetX * 0.35;
      scene.rotation.x = -targetY * 0.35;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      geoCore.dispose();
      matCore.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [threatLevel]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
    />
  );
}
