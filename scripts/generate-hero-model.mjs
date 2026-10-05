import * as THREE from 'three';
import fs from 'fs';
import path from 'path';

// Polyfill FileReader for Node.js environment used by GLTFExporter
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        if (this.onload) this.onload({ target: this });
        if (this.onloadend) this.onloadend({ target: this });
      });
    }
  };
}

import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

console.log('Generating SPAN Studio Precision Cinema Lens 3D Model (GLB)...');

// 1. Root group with orientation
const lensGroup = new THREE.Group();
lensGroup.name = 'SpanStudio_CinemaLens_Prime50mm';

// ── Materials System ──
// Dark Anodized Aluminum Barrel
const barrelMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x13171e),
  metalness: 0.88,
  roughness: 0.28,
  name: 'Mat_AnodizedBarrel',
});

// Fine Titanium / Steel Knurled Ring Material
const steelRingMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x282e38),
  metalness: 0.92,
  roughness: 0.22,
  name: 'Mat_SteelGears',
});

// Chrome / Stainless Steel PL Mount Flange
const chromeMountMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xd0d5dd),
  metalness: 0.96,
  roughness: 0.14,
  name: 'Mat_ChromeMount',
});

// SPAN Studio Signature Anodized Red Accent Ring
const redAccentMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0xd4002a),
  metalness: 0.85,
  roughness: 0.18,
  emissive: new THREE.Color(0x35000a),
  name: 'Mat_SpanRedAccent',
});

// Front Multi-Coated Optical Glass
const opticalGlassMaterial = new THREE.MeshPhysicalMaterial
  ? new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0e1828),
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.82,
      thickness: 0.6,
      transparent: true,
      opacity: 0.85,
      reflectivity: 0.9,
      name: 'Mat_OpticalGlass',
    })
  : new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x101a2c),
      metalness: 0.3,
      roughness: 0.05,
      transparent: true,
      opacity: 0.75,
      name: 'Mat_OpticalGlass',
    });

// Internal Aperture Diaphragm Material
const apertureMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x181a20),
  metalness: 0.7,
  roughness: 0.35,
  name: 'Mat_ApertureBlades',
});

// Internal Lens Baffle (Deep black light trap)
const baffleMaterial = new THREE.MeshStandardMaterial({
  color: new THREE.Color(0x060709),
  metalness: 0.2,
  roughness: 0.9,
  name: 'Mat_InnerBaffle',
});

// ── Geometry Construction ──
// Lens is built along the Z-axis (pointing forward toward +Z)

// 1. Rear Bayonet / PL Mount Base (-Z: -1.6 to -1.3)
const mountRing = new THREE.Mesh(
  new THREE.CylinderGeometry(0.72, 0.72, 0.3, 48),
  chromeMountMaterial
);
mountRing.rotation.x = Math.PI / 2;
mountRing.position.z = -1.45;
lensGroup.add(mountRing);

// 4 Bayonet Locking Tabs
for (let i = 0; i < 4; i++) {
  const angle = (i * Math.PI) / 2;
  const tab = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.06, 0.14),
    chromeMountMaterial
  );
  tab.position.set(Math.cos(angle) * 0.74, Math.sin(angle) * 0.74, -1.55);
  tab.rotation.z = angle;
  lensGroup.add(tab);
}

// 2. Rear Lens Housing Section (-Z: -1.3 to -0.8)
const rearBarrel = new THREE.Mesh(
  new THREE.CylinderGeometry(0.85, 0.78, 0.5, 48),
  barrelMaterial
);
rearBarrel.rotation.x = Math.PI / 2;
rearBarrel.position.z = -1.05;
lensGroup.add(rearBarrel);

// 3. Iris / Aperture Ring (-Z: -0.8 to -0.4)
const irisRing = new THREE.Mesh(
  new THREE.CylinderGeometry(0.92, 0.92, 0.38, 48),
  steelRingMaterial
);
irisRing.rotation.x = Math.PI / 2;
irisRing.position.z = -0.6;
lensGroup.add(irisRing);

// Iris Gear Teeth (36 small radial teeth for focus gear motor)
for (let i = 0; i < 36; i++) {
  const angle = (i * Math.PI * 2) / 36;
  const tooth = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.04, 0.32),
    steelRingMaterial
  );
  tooth.position.set(Math.cos(angle) * 0.94, Math.sin(angle) * 0.94, -0.6);
  tooth.rotation.z = angle;
  lensGroup.add(tooth);
}

// 4. SPAN Red Anodized Accent Ring (-0.4 to -0.32)
const accentRing = new THREE.Mesh(
  new THREE.CylinderGeometry(0.94, 0.94, 0.08, 48),
  redAccentMaterial
);
accentRing.rotation.x = Math.PI / 2;
accentRing.position.z = -0.36;
lensGroup.add(accentRing);

// 5. Main Center Barrel Body (-0.32 to +0.4)
const mainBarrel = new THREE.Mesh(
  new THREE.CylinderGeometry(0.96, 0.94, 0.72, 48),
  barrelMaterial
);
mainBarrel.rotation.x = Math.PI / 2;
mainBarrel.position.z = 0.04;
lensGroup.add(mainBarrel);

// 6. Focus Gear Ring (+0.4 to +0.9)
const focusRing = new THREE.Mesh(
  new THREE.CylinderGeometry(1.02, 1.02, 0.48, 48),
  steelRingMaterial
);
focusRing.rotation.x = Math.PI / 2;
focusRing.position.z = 0.64;
lensGroup.add(focusRing);

// Focus Gear Teeth (48 teeth around 0.8 Cine pitch)
for (let i = 0; i < 48; i++) {
  const angle = (i * Math.PI * 2) / 48;
  const tooth = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.04, 0.42),
    steelRingMaterial
  );
  tooth.position.set(Math.cos(angle) * 1.04, Math.sin(angle) * 1.04, 0.64);
  tooth.rotation.z = angle;
  lensGroup.add(tooth);
}

// 7. Front Outer Bell Housing (+0.9 to +1.4)
const frontBell = new THREE.Mesh(
  new THREE.CylinderGeometry(1.15, 1.02, 0.5, 64),
  barrelMaterial
);
frontBell.rotation.x = Math.PI / 2;
frontBell.position.z = 1.15;
lensGroup.add(frontBell);

// 8. Front Bezel / Matte Box Retention Ring (+1.4 to +1.52, 95mm or 114mm front standard)
const frontBezel = new THREE.Mesh(
  new THREE.CylinderGeometry(1.18, 1.15, 0.12, 64),
  steelRingMaterial
);
frontBezel.rotation.x = Math.PI / 2;
frontBezel.position.z = 1.46;
lensGroup.add(frontBezel);

// Inner Baffle Cavity
const innerBaffle = new THREE.Mesh(
  new THREE.CylinderGeometry(0.85, 0.65, 0.4, 48, 1, true),
  baffleMaterial
);
innerBaffle.rotation.x = Math.PI / 2;
innerBaffle.position.z = 1.25;
lensGroup.add(innerBaffle);

// 9. Curved Front Optical Element (Convex lens surface)
const frontGlass = new THREE.Mesh(
  new THREE.SphereGeometry(0.82, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.38),
  opticalGlassMaterial
);
frontGlass.rotation.x = 0;
frontGlass.position.z = 1.05;
lensGroup.add(frontGlass);

// 10. Internal Secondary Lens Element (Mid cavity)
const midGlass = new THREE.Mesh(
  new THREE.SphereGeometry(0.58, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.3),
  opticalGlassMaterial
);
midGlass.rotation.x = Math.PI;
midGlass.position.z = 0.2;
lensGroup.add(midGlass);

// 11. Internal Aperture Blades (Star polygon iris representation)
const irisBladeGroup = new THREE.Group();
irisBladeGroup.position.z = -0.15;
for (let i = 0; i < 9; i++) {
  const angle = (i * Math.PI * 2) / 9;
  const blade = new THREE.Mesh(
    new THREE.CircleGeometry(0.38, 5),
    apertureMaterial
  );
  blade.position.set(Math.cos(angle) * 0.32, Math.sin(angle) * 0.32, (i * 0.002));
  blade.rotation.z = angle + 0.6;
  irisBladeGroup.add(blade);
}
lensGroup.add(irisBladeGroup);

// Center the entire lens assembly near its natural center of mass
lensGroup.position.z = -0.1;

// Scale to friendly unit size (~2.4 units long, ~1.8 units wide)
lensGroup.scale.set(0.9, 0.9, 0.9);

// ── Export to GLB format ──
const exporter = new GLTFExporter();
try {
  const glbBuffer = await exporter.parseAsync(lensGroup, { binary: true });
  const outDir = path.resolve('public/models');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  const outFile = path.join(outDir, 'hero-object.glb');
  fs.writeFileSync(outFile, Buffer.from(glbBuffer));
  const stats = fs.statSync(outFile);
  console.log(`✓ Model exported successfully to: ${outFile}`);
  console.log(`✓ File size: ${(stats.size / 1024).toFixed(2)} KB (Target: < 2500 KB)`);
} catch (err) {
  console.error('Error generating GLB:', err);
  process.exit(1);
}

