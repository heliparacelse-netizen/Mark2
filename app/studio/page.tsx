'use client';

import * as THREE from 'three';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useI18n } from '@/lib/i18n';

function Viewer() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111118');

    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
    const material = new THREE.MeshStandardMaterial({ color: '#6c47ff', metalness: 0.7, roughness: 0.25 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    scene.add(new THREE.AmbientLight('#ffffff', 1));
    const directional = new THREE.DirectionalLight('#f0c96e', 1.5);
    directional.position.set(3, 3, 3);
    scene.add(directional);

    const animate = () => {
      cube.rotation.x += 0.008;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full rounded-xl" />;
}

export default function StudioPage() {
  const { data: session } = useSession();
  const { t } = useI18n();
  const router = useRouter();
  const [used, setUsed] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;
    fetch('/api/usage').then(async (res) => {
      const data = await res.json();
      setUsed(data.used ?? 0);
    });
  }, [session?.user?.email]);

  const handleGenerate = async () => {
    if (!session) {
      router.push('/login');
      return;
    }
    if (used >= 3) {
      setShowModal(true);
      return;
    }
    const response = await fetch('/api/usage', { method: 'POST' });
    const data = await response.json();
    setUsed(data.used ?? used);
  };

  return (
    <main>
      <Navbar />
      <section className="section-shell pt-28">
        <h1 className="mb-6 text-3xl font-semibold">{t('studio.title')}</h1>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl border border-borderDark bg-bgCard p-6">
            <div className="rounded-xl border-2 border-dashed border-borderDark p-8 text-center text-textSecondary">{t('studio.upload')}</div>
            <select className="w-full rounded-xl border border-borderDark bg-bgSecondary px-4 py-3">
              <option>{t('studio.roomType')}</option>
              <option>Living Room</option>
              <option>Bedroom</option>
              <option>Kitchen</option>
            </select>
            <select className="w-full rounded-xl border border-borderDark bg-bgSecondary px-4 py-3">
              <option>{t('studio.style')}</option>
              <option>Modern Luxe</option>
              <option>Japandi</option>
              <option>Industrial</option>
            </select>
            <button
              disabled={used >= 3}
              onClick={handleGenerate}
              className={`w-full rounded-xl px-6 py-3 font-semibold transition duration-200 ${used >= 3 ? 'cursor-not-allowed border border-borderDark text-textSecondary' : 'btn-premium'}`}
            >
              {used >= 3 ? t('studio.limitReached') : t('studio.generate')}
            </button>
          </div>
          <div className="hidden h-[460px] rounded-2xl border border-borderDark bg-bgCard p-2 md:block">
            <Viewer />
          </div>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
          <div className="w-full max-w-md rounded-2xl border border-borderDark bg-bgCard p-6">
            <h2 className="text-xl font-semibold">{t('studio.modalTitle')}</h2>
            <p className="mt-3 text-textSecondary">{t('studio.modalText')}</p>
            <button className="btn-premium mt-6 w-full" onClick={() => router.push('/#pricing')}>
              {t('studio.modalButton')}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
