import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { resolveJourney, type CameraRange } from './dioramasJourney'
import {
  getDioramasRuntime,
  shouldShowDioramasFallback,
  type DioramasWorldStatus,
} from './dioramasMotion'
import {
  DIORAMAS_SECTION_IDS,
  getDioramasShot,
  type DioramasShotState,
} from './dioramasShots'

const LOGO_URL = '/images/branding/hm-mark-large.png'
const INTERACTIVE_SELECTOR = 'a, button, input, select, textarea, [role="button"]'

interface MeasuredShot {
  range: CameraRange
  desktop: DioramasShotState
  mobile: DioramasShotState
}

const mixTuple = (
  target: THREE.Vector3,
  from: readonly [number, number, number],
  to: readonly [number, number, number],
  amount: number,
) => {
  target.set(
    THREE.MathUtils.lerp(from[0], to[0], amount),
    THREE.MathUtils.lerp(from[1], to[1], amount),
    THREE.MathUtils.lerp(from[2], to[2], amount),
  )
}

const disposeObject = (object: THREE.Object3D) => {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.Points)) {
      return
    }

    child.geometry.dispose()
    const materials = Array.isArray(child.material) ? child.material : [child.material]
    materials.forEach((material) => material.dispose())
  })
}

export default function DioramasWorld() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let runtime = getDioramasRuntime(window.innerWidth, window.devicePixelRatio)
    let mobile = runtime.mobile
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reducedMotion = motionQuery.matches
    const setWorldStatus = (status: DioramasWorldStatus) => {
      document.documentElement.dataset.dioramasFallback = String(
        shouldShowDioramasFallback(status),
      )
      if (status === 'ready') document.documentElement.dataset.dioramasReady = 'true'
      else document.documentElement.removeAttribute('data-dioramas-ready')
    }
    const clearWorldStatus = () => {
      document.documentElement.removeAttribute('data-dioramas-fallback')
      document.documentElement.removeAttribute('data-dioramas-ready')
    }
    setWorldStatus('loading')
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !mobile,
        powerPreference: 'high-performance',
      })
    } catch {
      setWorldStatus('fallback')
      return clearWorldStatus
    }

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050505, 0.058)

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80)
    const world = new THREE.Group()
    const logo = new THREE.Group()
    const rings = new THREE.Group()
    const pointer = new THREE.Vector2()
    const pointerTarget = new THREE.Vector2()
    const cameraPosition = new THREE.Vector3()
    const lookAt = new THREE.Vector3()
    const wavePositions = new Float32Array((mobile ? 72 : 120) * 3)
    const waveGeometry = new THREE.BufferGeometry()
    const waveMaterial = new THREE.LineBasicMaterial({
      blending: THREE.AdditiveBlending,
      color: 0x8f62c9,
      depthWrite: false,
      opacity: 0.22,
      transparent: true,
    })
    const waveform = new THREE.Line(waveGeometry, waveMaterial)
    const particleGeometry = new THREE.BufferGeometry()
    const particleMaterial = new THREE.PointsMaterial({
      blending: THREE.AdditiveBlending,
      color: 0xb9a6cb,
      depthWrite: false,
      opacity: 0.38,
      size: mobile ? 0.026 : 0.018,
      sizeAttenuation: true,
      transparent: true,
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    const logoGeometry = new THREE.PlaneGeometry(4.8, 4.185)
    let logoTexture: THREE.Texture | undefined
    let hologramMaterial: THREE.ShaderMaterial | undefined
    let measuredShots: MeasuredShot[] = []
    let frame = 0
    let disposed = false
    let lastRender = 0
    let pulse = 0
    let renderRequested = false
    const animationStart = performance.now()

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(runtime.pixelRatio)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.88
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.domElement.dataset.dioramasCanvas = 'true'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    mount.appendChild(renderer.domElement)

    waveGeometry.setAttribute('position', new THREE.BufferAttribute(wavePositions, 3))
    waveform.position.set(0, -1.66, -0.32)
    waveform.rotation.z = -0.05

    const particleCount = mobile ? 150 : 380
    const particlePositions = new Float32Array(particleCount * 3)
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.4 + Math.random() * 6.8
      const angle = Math.random() * Math.PI * 2
      particlePositions[index * 3] = Math.cos(angle) * radius
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 7.2
      particlePositions[index * 3 + 2] = -2.6 - Math.random() * 8.5
    }
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))

    const ringColors = [0x5e357e, 0x8e66aa, 0x4a315f, 0xa67bc4]
    for (let index = 0; index < ringColors.length; index += 1) {
      const geometry = new THREE.TorusGeometry(2.58 + index * 0.44, 0.008 + index * 0.002, 6, 144)
      const material = new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        color: ringColors[index],
        depthWrite: false,
        opacity: 0.15 - index * 0.018,
        transparent: true,
      })
      const ring = new THREE.Mesh(geometry, material)
      ring.rotation.set(0.12 + index * 0.055, -0.1 + index * 0.04, index * 0.21)
      ring.position.z = -0.55 - index * 0.18
      rings.add(ring)
    }

    world.add(particles, rings, logo, waveform)
    scene.add(world)

    const measureJourney = () => {
      const viewportHeight = Math.max(window.innerHeight, 1)
      const validIds = new Set<string>(DIORAMAS_SECTION_IDS)
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
        .filter((section) => validIds.has(section.id))

      measuredShots = sections.map((section) => {
        const top = section.getBoundingClientRect().top + window.scrollY
        const height = Math.max(section.offsetHeight, 1)
        const holdStart = top + Math.min(height * 0.08, viewportHeight * 0.14)
        const holdEnd = Math.max(holdStart, top + height - viewportHeight * 0.72)
        const selected = getDioramasShot(section.id)

        return {
          range: { start: holdStart, end: holdEnd },
          desktop: selected.desktop,
          mobile: selected.mobile,
        }
      })

      if (measuredShots.length === 0) {
        const opening = getDioramasShot('top')
        measuredShots = [{
          range: { start: 0, end: Number.MAX_SAFE_INTEGER },
          desktop: opening.desktop,
          mobile: opening.mobile,
        }]
      }
    }

    const journeyResizeObserver = new ResizeObserver(measureJourney)
    const observeJourneySections = () => {
      const validIds = new Set<string>(DIORAMAS_SECTION_IDS)
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
        .filter((section) => validIds.has(section.id))

      journeyResizeObserver.disconnect()
      sections.forEach((section) => journeyResizeObserver.observe(section))
    }

    const resize = () => {
      const width = Math.max(mount.clientWidth, window.innerWidth, 1)
      const height = Math.max(mount.clientHeight, window.innerHeight, 1)
      runtime = getDioramasRuntime(width, window.devicePixelRatio)
      mobile = runtime.mobile
      renderer.setPixelRatio(runtime.pixelRatio)
      renderer.setSize(width, height, false)
      particleMaterial.size = mobile ? 0.026 : 0.018
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      observeJourneySections()
      measureJourney()
      requestStaticRender()
    }

    const updateWaveform = (elapsed: number, energy: number) => {
      const count = wavePositions.length / 3
      for (let index = 0; index < count; index += 1) {
        const progress = index / (count - 1)
        const centered = progress * 2 - 1
        const envelope = Math.pow(Math.sin(progress * Math.PI), 1.35)
        const carrier = Math.sin(centered * 20 + elapsed * 1.25)
        const detail = Math.sin(centered * 47 - elapsed * 0.72) * 0.34
        wavePositions[index * 3] = centered * 3.7
        wavePositions[index * 3 + 1] = (carrier + detail) * envelope * (0.055 + energy * 0.055)
        wavePositions[index * 3 + 2] = Math.sin(progress * Math.PI * 2) * 0.06
      }
      waveGeometry.attributes.position.needsUpdate = true
    }

    const draw = (time: number) => {
      renderRequested = false
      if (disposed || document.hidden) return

      const elapsed = reducedMotion ? 0 : (time - animationStart) / 1000
      const ranges = measuredShots.map((entry) => entry.range)
      const blend = resolveJourney(window.scrollY, ranges)
      const from = measuredShots[blend.from] ?? measuredShots[0]
      const to = measuredShots[blend.to] ?? from
      const fromState = mobile ? from.mobile : from.desktop
      const toState = mobile ? to.mobile : to.desktop
      const amount = blend.mix
      const energy = THREE.MathUtils.lerp(fromState.energy, toState.energy, amount)
      const activePulse = reducedMotion ? 0 : pulse

      if (!reducedMotion) pointer.lerp(pointerTarget, 0.055)
      mixTuple(cameraPosition, fromState.camera, toState.camera, amount)
      mixTuple(lookAt, fromState.lookAt, toState.lookAt, amount)
      camera.position.copy(cameraPosition)
      camera.position.x += pointer.x * 0.14
      camera.position.y += pointer.y * 0.09
      camera.fov = THREE.MathUtils.lerp(fromState.fov, toState.fov, amount)
      camera.updateProjectionMatrix()
      camera.lookAt(lookAt)

      const logoScale = THREE.MathUtils.lerp(fromState.logoScale, toState.logoScale, amount)
      const ringScale = THREE.MathUtils.lerp(fromState.ringScale, toState.ringScale, amount)
      const rotation = THREE.MathUtils.lerp(fromState.logoRotation, toState.logoRotation, amount)
      logo.scale.setScalar(logoScale * (1 + activePulse * 0.025))
      logo.rotation.set(
        reducedMotion ? -0.025 : -0.025 + pointer.y * 0.045,
        rotation + (reducedMotion ? 0 : pointer.x * 0.085),
        rotation * 0.16,
      )
      logo.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.42) * 0.045
      rings.scale.setScalar(ringScale * (1 + activePulse * 0.055))
      rings.rotation.z = reducedMotion ? 0 : elapsed * 0.018
      rings.rotation.y = reducedMotion ? 0 : Math.sin(elapsed * 0.19) * 0.055
      particles.rotation.y = reducedMotion ? 0 : elapsed * 0.006
      particleMaterial.opacity = THREE.MathUtils.lerp(
        fromState.particleOpacity,
        toState.particleOpacity,
        amount,
      ) * (0.78 + activePulse * 0.22)
      waveMaterial.opacity = 0.12 + energy * 0.16 + activePulse * 0.08
      updateWaveform(elapsed, energy + activePulse * 0.45)

      if (hologramMaterial) {
        hologramMaterial.uniforms.uTime.value = elapsed
        hologramMaterial.uniforms.uPointer.value.copy(pointer)
        hologramMaterial.uniforms.uEnergy.value = energy + activePulse * 0.6
      }

      pulse *= 0.91
      renderer.render(scene, camera)
    }

    const animate = (time: number) => {
      frame = 0
      if (disposed || document.hidden) return
      if (runtime.frameInterval > 0 && time - lastRender < runtime.frameInterval) {
        frame = requestAnimationFrame(animate)
        return
      }
      lastRender = time
      draw(time)
      frame = requestAnimationFrame(animate)
    }

    function requestStaticRender() {
      if (!reducedMotion || renderRequested || disposed || document.hidden) return
      renderRequested = true
      requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.set(
        (event.clientX / Math.max(window.innerWidth, 1)) * 2 - 1,
        1 - (event.clientY / Math.max(window.innerHeight, 1)) * 2,
      )
    }
    const onPointerLeave = () => pointerTarget.set(0, 0)
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Element && target.closest(INTERACTIVE_SELECTOR)) return
      pulse = 1
    }
    let pointerInteractionsAttached = false
    let staticScrollAttached = false
    const attachPointerInteractions = () => {
      if (pointerInteractionsAttached) return
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave, { passive: true })
      window.addEventListener('pointerdown', onPointerDown, { passive: true })
      pointerInteractionsAttached = true
    }
    const detachPointerInteractions = () => {
      if (!pointerInteractionsAttached) return
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
      pointerInteractionsAttached = false
    }
    const attachStaticScroll = () => {
      if (staticScrollAttached) return
      window.addEventListener('scroll', requestStaticRender, { passive: true })
      staticScrollAttached = true
    }
    const detachStaticScroll = () => {
      if (!staticScrollAttached) return
      window.removeEventListener('scroll', requestStaticRender)
      staticScrollAttached = false
    }
    const syncMotionPreference = () => {
      reducedMotion = motionQuery.matches

      if (reducedMotion) {
        cancelAnimationFrame(frame)
        frame = 0
        pulse = 0
        pointer.set(0, 0)
        pointerTarget.set(0, 0)
        detachPointerInteractions()
        attachStaticScroll()
        requestStaticRender()
        return
      }

      detachStaticScroll()
      attachPointerInteractions()
      if (!frame && !document.hidden) frame = requestAnimationFrame(animate)
    }
    const onMotionPreferenceChange = () => syncMotionPreference()
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
        return
      }
      if (reducedMotion) requestStaticRender()
      else if (!frame) frame = requestAnimationFrame(animate)
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    motionQuery.addEventListener('change', onMotionPreferenceChange)

    resize()
    syncMotionPreference()

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

        for (let index = 0; index < 5; index += 1) {
          const material = new THREE.MeshBasicMaterial({
            alphaTest: 0.035,
            blending: THREE.AdditiveBlending,
            color: index % 2 === 0 ? 0xc7c2cc : 0x5b3d6d,
            depthWrite: false,
            map: texture,
            opacity: 0.035 + index * 0.012,
            side: THREE.DoubleSide,
            transparent: true,
          })
          const layer = new THREE.Mesh(logoGeometry, material)
          layer.position.z = -0.032 - index * 0.026
          logo.add(layer)
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
            uEnergy: { value: 0.5 },
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
            uniform float uEnergy;
            varying vec2 vUv;

            float hash(vec2 value) {
              return fract(sin(dot(value, vec2(127.1, 311.7))) * 43758.5453);
            }

            void main() {
              vec4 texel = texture2D(uMap, vUv);
              if (texel.a < 0.035) discard;

              float luminance = dot(texel.rgb, vec3(0.2126, 0.7152, 0.0722));
              float foil = 0.5 + 0.5 * sin((vUv.x * 0.8 + vUv.y * 1.14 + uTime * 0.025) * 6.28318);
              float highlight = pow(max(0.0, 1.0 - distance(vUv, vec2(0.5) + uPointer * 0.2) * 1.7), 5.0);
              float grain = hash(floor(vUv * 360.0) + floor(uTime * 2.0));
              vec3 charcoal = vec3(0.075, 0.065, 0.09);
              vec3 silver = vec3(0.72, 0.73, 0.79);
              vec3 violet = vec3(0.31, 0.15, 0.48);
              vec3 color = mix(charcoal, silver, smoothstep(0.14, 0.9, foil));
              color = mix(color, violet, 0.16 + (1.0 - foil) * 0.16);
              color = mix(color, vec3(luminance), 0.24);
              color += silver * (highlight * (0.2 + uEnergy * 0.2));
              color += silver * step(0.997, grain) * 0.12 * uEnergy;
              gl_FragColor = vec4(color, texel.a * 0.9);
            }
          `,
        })
        const hologram = new THREE.Mesh(logoGeometry, hologramMaterial)
        hologram.position.z = 0.025
        logo.add(hologram)

        setWorldStatus('ready')
        if (reducedMotion) requestStaticRender()
      },
      undefined,
      () => {
        if (!disposed) setWorldStatus('fallback')
      },
    )

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      journeyResizeObserver.disconnect()
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
      motionQuery.removeEventListener('change', onMotionPreferenceChange)
      detachStaticScroll()
      detachPointerInteractions()
      clearWorldStatus()
      disposeObject(world)
      logoGeometry.dispose()
      logoTexture?.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className="dioramas-world" aria-hidden="true" />
}
