// ═══════════════════════════════════════════════════════
// SPAN Studio — Service, Capability & Story Types
// Phase 4: Homepage Sections & Core Entities
// ═══════════════════════════════════════════════════════

export type ServiceSlug =
  | 'factory-video'
  | 'product-video'
  | 'photography'
  | '3d-animation'
  | 'video-editing';

export interface ServiceItem {
  id: string;
  number: string;
  slug: ServiceSlug;
  name: string;
  tabLabel: string;
  shortDescription: string;
  value: string;
  deliverables: readonly string[];
  visualAesthetic: string;
}

export type CapabilityCategory =
  | 'ALL'
  | 'FACTORY'
  | 'PRODUCT'
  | 'PHOTOGRAPHY'
  | '3D';

export interface CapabilityItem {
  id: string;
  title: string;
  category: Exclude<CapabilityCategory, 'ALL'>;
  categoryTag: string;
  subtitle: string;
  gridSpan: 'wide' | 'tall' | 'standard';
  isConcept: true;
  visualTheme: 'machinery' | 'optics' | 'product' | 'cad' | 'robotic';
  image?: string;
  video?: string;
}

export interface IndustrialStoryStage {
  stageNumber: string;
  title: string;
  description: string;
  subtitle: string;
  aspectHint: string;
}
