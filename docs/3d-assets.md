# SPAN Studio — 3D Asset Documentation (Phase 6)

## 1. 3D Model Asset

- **Filename:** `hero-object.glb`
- **Location:** [`/public/models/hero-object.glb`](file:///c:/Users/acer/OneDrive/Desktop/SPAN%20STUDIO/span-studio/public/models/hero-object.glb)
- **Subject:** SPAN Studio 50mm Anamorphic Cinema Prime Lens Assembly
  - Chrome PL mount flange with 4 bayonet tabs and alignment pin
  - Anodized aluminum barrel with stepped mechanical housing
  - Precision 0.8 Cine pitch focus and iris gear rings
  - Multi-coated curved front and mid optical glass elements
  - Internal 9-blade star aperture diaphragm
  - Signature SPAN Studio anodized red accent ring
- **Source:** Generated via custom Three.js parametric CAD synthesis pipeline ([`scripts/generate-hero-model.mjs`](file:///c:/Users/acer/OneDrive/Desktop/SPAN%20STUDIO/span-studio/scripts/generate-hero-model.mjs)) using Three.js `GLTFExporter`.
- **License:** Open Source / MIT (Internal Studio Spec Work). 100% royalty-free, free of third-party copyright claims.
- **Status:** **Functional Development Asset**. High-precision spec model engineered to establish 3D interaction, camera lighting, and performance benchmarks without external license dependencies.

## 2. Optimization Details

- **File Format:** GLB (Binary glTF 2.0)
- **Total File Size:** **332.36 KB** (Target was < 2,500 KB / 2.5 MB; operating at ~13% of budget)
- **Textures:** 0 external texture maps; all materials utilize procedural PBR parameters (metalness, roughness, transmission, clearcoat) to eliminate bitmap download and decoding overhead.
- **Poly Budget:** Controlled cylindrical and spherical geometry (~12k polygons total) ensuring 60 FPS performance on mobile and desktop GPUs.
- **Post-Processing:** Zero expensive multi-pass post-processing (no bloom, no SSAO, no depth-of-field shaders) to preserve browser scrolling responsiveness and battery life.
- **Rendering Modes:**
  - Hero Scene: Continuous frame loop with conservative scroll-boundary unmounting.
  - 3D Feature Scene: `frameloop="demand"` (renders only on pointer interaction or capability focus changes).

## 3. 2D Fallback Asset

- **Filename:** `hero-3d-fallback.webp`
- **Location:** [`/public/images/hero-3d-fallback.webp`](file:///c:/Users/acer/OneDrive/Desktop/SPAN%20STUDIO/span-studio/public/images/hero-3d-fallback.webp)
- **Dimensions:** 1024 × 1024 px
- **File Size:** **48.2 KB**
- **Format:** Modern WebP (Quality 85)
- **Trigger Conditions:** Rendered automatically whenever client lacks WebGL support, during server-side pre-rendering, or if a runtime WebGL error occurs.
