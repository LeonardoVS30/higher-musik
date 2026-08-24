import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const LOGO_URL = '/images/branding/hm-mark-large.png'

export default function HeroLogo3D() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading')

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch {
      setStatus('fallback')
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    const logo = new THREE.Group()
    const geometry = new THREE.PlaneGeometry(4.8, 4.185)
    const materials: THREE.Material[] = []
    const mobile = window.innerWidth < 768
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = new THREE.Vector2()
    const pointerTarget = new THREE.Vector2()
    let hologramMaterial: THREE.ShaderMaterial | undefined
    let logoTexture: THREE.Texture | undefined
    let frame = 0
    let visible = true
    let disposed = false
    let textureReady = false
    let animationStart = 0
    let lastRender = 0

    camera.position.z = 8
    scene.add(logo)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.92
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.className = 'absolute inset-0 h-full w-full transition-opacity duration-500'
    renderer.domElement.style.opacity = '0'
    mount.appendChild(renderer.domElement)

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    const animate = (time: number) => {
      frame = 0
      if (!visible || document.hidden) return
      if (mobile && !reducedMotion && time - lastRender < 1000 / 30) {
        frame = requestAnimationFrame(animate)
        return
      }
      lastRender = time

      const elapsed = Math.max(0, (time - animationStart) / 1000)
      const reveal = Math.min(elapsed / 1.2, 1)
      const eased = 1 - Math.pow(1 - reveal, 3)
      pointer.lerp(pointerTarget, reducedMotion ? 1 : 0.075)

      if (reducedMotion) {
        logo.position.y = 0
        logo.scale.setScalar(1)
        logo.rotation.set(-0.035, -0.12, -0.02)
      } else {
        const float = Math.sin(elapsed * 0.85)
        logo.position.x = pointer.x * 0.075
        logo.position.y = THREE.MathUtils.lerp(0.5, float * 0.065 + pointer.y * 0.035, eased)
        logo.scale.setScalar(THREE.MathUtils.lerp(0.86, 1, eased))
        logo.rotation.x = THREE.MathUtils.lerp(-0.24, -0.035 + pointer.y * 0.14 + float * 0.018, eased)
        logo.rotation.y = THREE.MathUtils.lerp(0.3, -0.12 + pointer.x * 0.2 + Math.sin(elapsed * 0.48) * 0.035, eased)
        logo.rotation.z = THREE.MathUtils.lerp(-0.08, -0.02 + pointer.x * 0.025, eased)
      }

      if (hologramMaterial) {
        hologramMaterial.uniforms.uTime.value = elapsed
        hologramMaterial.uniforms.uPointer.value.copy(pointer)
      }
      renderer.render(scene, camera)
      if (!reducedMotion) frame = requestAnimationFrame(animate)
    }

    const schedule = () => {
      if (visible && textureReady && !document.hidden && !frame) {
        frame = requestAnimationFrame(animate)
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      schedule()
    })

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        1 - (event.clientY / window.innerHeight) * 2,
      )
    }

    const resetPointer = () => pointerTarget.set(0, 0)
    const onVisibility = () => schedule()

    new THREE.TextureLoader().load(
      LOGO_URL,
      (texture) => {
        if (disposed) {
          texture.dispose()
          return
        }

        logoTexture = texture
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy())

        for (let index = 0; index < 7; index += 1) {
          const material = new THREE.MeshBasicMaterial({
            alphaTest: 0.04,
            blending: THREE.AdditiveBlending,
            color: index % 2 === 0 ? 0xb8bdc7 : 0x58466f,
            depthWrite: false,
            map: texture,
            opacity: 0.045 + index * 0.009,
            side: THREE.DoubleSide,
            transparent: true,
          })
          const layer = new THREE.Mesh(geometry, material)
          layer.position.z = -0.025 - index * 0.032
          logo.add(layer)
          materials.push(material)
        }

        hologramMaterial = new THREE.ShaderMaterial({
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
          transparent: true,
          uniforms: {
            uMap: { value: texture },
            uTime: { value: 0 },
            uPointer: { value: new THREE.Vector2() },
          },
          vertexShader: `
            varying vec2 vUv;

            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D uMap;
            uniform float uTime;
            uniform vec2 uPointer;
            varying vec2 vUv;

            float hash(vec2 point) {
              return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
            }

            void main() {
              vec4 texel = texture2D(uMap, vUv);
              if (texel.a < 0.04) discard;

              float sourceLight = dot(texel.rgb, vec3(0.2126, 0.7152, 0.0722));
              vec3 source = mix(vec3(sourceLight), texel.rgb, 0.16);
              float foil = 0.5 + 0.5 * sin((vUv.x * 0.72 + vUv.y * 1.08 + uPointer.x * 0.12 - uPointer.y * 0.08 + uTime * 0.012) * 6.28318);
              vec3 silver = vec3(0.72, 0.76, 0.82);
              vec3 smoke = vec3(0.12, 0.105, 0.15);
              vec3 violet = vec3(0.34, 0.25, 0.46);
              vec3 foilColor = mix(smoke, silver, smoothstep(0.08, 0.92, foil));
              foilColor = mix(foilColor, violet, 0.22 + (1.0 - foil) * 0.2);
              vec2 shineOrigin = vec2(0.5) + uPointer * vec2(0.28, 0.22);
              float shine = pow(max(0.0, 1.0 - distance(vUv, shineOrigin) * 1.45), 4.0);
              float caustic = 0.5 + 0.5 * sin((vUv.x * 1.7 - vUv.y * 1.35 + uTime * 0.055) * 18.0);
              float scan = 0.975 + 0.025 * sin(vUv.y * 760.0 - uTime * 2.4);
              float sparkle = step(0.995, hash(floor(vUv * 420.0) + floor(uTime * 3.0)));
              vec3 color = mix(source, foilColor, 0.34 + caustic * 0.08);
              color = color * scan + silver * (shine * 0.38 + sparkle * 0.22);
              color += violet * 0.045;
              gl_FragColor = vec4(color, texel.a * (0.92 + shine * 0.08));
            }
          `,
        })
        const hologram = new THREE.Mesh(geometry, hologramMaterial)
        hologram.position.z = 0.035
        logo.add(hologram)
        materials.push(hologramMaterial)

        textureReady = true
        animationStart = performance.now()
        resize()
        renderer.domElement.style.opacity = '1'
        setStatus('ready')
        schedule()
      },
      undefined,
      () => {
        if (!disposed) setStatus('fallback')
      },
    )

    resizeObserver.observe(mount)
    visibilityObserver.observe(mount)
    document.addEventListener('visibilitychange', onVisibility)
    if (!mobile && !reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('blur', resetPointer)
    }

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('blur', resetPointer)
      geometry.dispose()
      materials.forEach((material) => material.dispose())
      logoTexture?.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="pointer-events-none relative h-full w-full"
      role="img"
      aria-label="Logo holográfico de Higher Musik"
    >
      {status === 'loading' && (
        <span className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-electric/50 shadow-[0_0_28px_rgba(124,58,237,0.45)]" />
      )}
      {status === 'fallback' && (
        <img
          src={LOGO_URL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_18px_38px_rgba(124,58,237,0.35)]"
        />
      )}
    </div>
  )
}
