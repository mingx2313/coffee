import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WebGLBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 vUv;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                            -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
            + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = .5;
        for (int i = 0; i < 5; i++) {
          value += amplitude * snoise(st);
          st *= 2.;
          amplitude *= .5;
        }
        return value;
      }

      void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        st.x *= u_resolution.x/u_resolution.y;

        vec2 mouse = u_mouse / u_resolution;
        mouse.x *= u_resolution.x/u_resolution.y;
        float dist = distance(st, mouse);
        float interact = smoothstep(0.5, 0.0, dist);
        
        vec2 q = vec2(0.);
        q.x = fbm( st + 0.00 * u_time);
        q.y = fbm( st + vec2(1.0));

        vec2 r = vec2(0.);
        r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time + interact * 0.5);
        r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

        float f = fbm(st+r);

        vec3 color1 = vec3(0.976, 0.964, 0.941); 
        vec3 color2 = vec3(0.831, 0.639, 0.450); 
        vec3 color3 = vec3(0.42, 0.29, 0.22);    
        
        vec3 finalColor = mix(color1, color2, clamp((f*f)*4.0, 0.0, 1.0));
        finalColor = mix(finalColor, color3, clamp(length(q)*0.5, 0.0, 1.0));
        
        float vignette = st.y * 1.5;
        finalColor = mix(finalColor, color1, 1.0 - vignette);

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const uniforms = {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_mouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onMouseMove = (e) => {
      uniforms.u_mouse.value.x = e.clientX;
      uniforms.u_mouse.value.y = window.innerHeight - e.clientY;
    };

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      uniforms.u_time.value = clock.getElapsedTime() * 0.5;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="webgl-container" 
      className="fixed top-0 left-0 w-full h-[120vh] -z-10 overflow-hidden"
      style={{
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
      }}
    />
  );
};

export default WebGLBackground;
