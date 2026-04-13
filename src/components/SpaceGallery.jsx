import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=1600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop',
];

const CAPTIONS = [
  { label: '以太晨光', sub: '台北市大安區 · 開放式空間' },
  { label: '光線與影子', sub: '每日早晨的魔法時刻' },
  { label: '職人工作台', sub: '精密校準的沖煮設備' },
  { label: '靜謐角落', sub: '為你留存的一方天地' },
];

const SpaceGallery = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const rendererRef = useRef(null);
  const uniformsRef = useRef(null);
  const texturesRef = useRef([]);
  const currentIdxRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const loader = new THREE.TextureLoader();
    const textures = IMAGES.map(url => {
      const t = loader.load(url);
      t.minFilter = THREE.LinearFilter;
      return t;
    });
    texturesRef.current = textures;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D u_texture1;
      uniform sampler2D u_texture2;
      uniform float u_progress;
      uniform float u_time;
      varying vec2 vUv;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = vUv;
        // Liquid wipe with noise distortion
        float n = noise(uv * 4.0 + u_time * 0.3) * 0.25;
        float edge = uv.x + n;
        float threshold = u_progress * 1.5 - 0.25;
        float wipe = smoothstep(threshold, threshold + 0.25, edge);
        
        vec4 tex1 = texture2D(u_texture1, uv);
        vec4 tex2 = texture2D(u_texture2, uv);
        
        gl_FragColor = mix(tex1, tex2, wipe);
      }
    `;

    const uniforms = {
      u_texture1: { value: textures[0] },
      u_texture2: { value: textures[1] },
      u_progress: { value: 0.0 },
      u_time: { value: 0.0 },
    };
    uniformsRef.current = uniforms;

    const mat = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });
    const geo = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geo, mat));

    const clock = new THREE.Clock();
    let rafId;
    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  const transitionTo = (nextIdx) => {
    if (isTransitioning) return;
    const uniforms = uniformsRef.current;
    const textures = texturesRef.current;
    if (!uniforms) return;

    setIsTransitioning(true);
    uniforms.u_texture1.value = textures[currentIdxRef.current];
    uniforms.u_texture2.value = textures[nextIdx];
    uniforms.u_progress.value = 0;

    gsap.to(uniforms.u_progress, {
      value: 1,
      duration: 1.4,
      ease: 'power2.inOut',
      onComplete: () => {
        currentIdxRef.current = nextIdx;
        setCurrentIndex(nextIdx);
        setIsTransitioning(false);
      },
    });
  };

  return (
    <section
      ref={sectionRef}
      id="space"
      className="relative min-h-[100dvh] z-10 overflow-hidden bg-brand-dark"
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />

      {/* Dark gradient overlay bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-brand-dark/30 pointer-events-none z-10" />

      {/* Section label */}
      <div className="absolute top-8 left-6 md:left-12 z-20">
        <span className="font-sans text-brand-accent text-sm tracking-widest">04 / THE SPACE</span>
      </div>

      {/* Caption */}
      <div className="absolute bottom-20 left-6 md:left-12 z-20">
        <p className="font-sans text-brand-accent text-xs tracking-widest uppercase mb-2">
          {String(currentIndex + 1).padStart(2, '0')} / {String(IMAGES.length).padStart(2, '0')}
        </p>
        <h3 className="font-serif text-3xl md:text-5xl text-brand-bg leading-tight mb-1">
          {CAPTIONS[currentIndex].label}
        </h3>
        <p className="font-sans text-brand-bg/60 text-sm tracking-widest">
          {CAPTIONS[currentIndex].sub}
        </p>
      </div>

      {/* Navigation dots / arrows */}
      <div className="absolute bottom-20 right-6 md:right-12 z-20 flex flex-col gap-3">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => transitionTo(i)}
            className="hover-trigger flex items-center gap-2 group"
          >
            <div
              className="rounded-full transition-all duration-500"
              style={{
                width: currentIndex === i ? '32px' : '8px',
                height: '2px',
                backgroundColor: currentIndex === i ? '#D4A373' : 'rgba(255,255,255,0.4)',
              }}
            />
          </button>
        ))}
      </div>

      {/* Prev / Next */}
      <div className="absolute bottom-8 right-6 md:right-12 z-20 flex gap-4">
        <button
          onClick={() => transitionTo((currentIndex - 1 + IMAGES.length) % IMAGES.length)}
          disabled={isTransitioning}
          className="hover-trigger w-10 h-10 border border-brand-bg/20 rounded-full flex items-center justify-center text-brand-bg/70 hover:border-brand-accent hover:text-brand-accent transition-colors"
        >
          ←
        </button>
        <button
          onClick={() => transitionTo((currentIndex + 1) % IMAGES.length)}
          disabled={isTransitioning}
          className="hover-trigger w-10 h-10 border border-brand-bg/20 rounded-full flex items-center justify-center text-brand-bg/70 hover:border-brand-accent hover:text-brand-accent transition-colors"
        >
          →
        </button>
      </div>
    </section>
  );
};

export default SpaceGallery;
