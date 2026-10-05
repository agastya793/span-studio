// ═══════════════════════════════════════════════════════
// SPAN Studio — Master Business Constants & Types
// Phase 4: Homepage Sections 1–6
// Note: SPAN Studio is an independent visual-content studio.
// Do not mix with SPAN Industrial Solutions Pvt Ltd.
// ═══════════════════════════════════════════════════════

import type {
  ServiceItem,
  ServiceSlug,
  CapabilityItem,
  CapabilityCategory,
  IndustrialStoryStage,
} from '@/types/services';

export type {
  ServiceItem,
  ServiceSlug,
  CapabilityItem,
  CapabilityCategory,
  IndustrialStoryStage,
};

export interface ContactInfo {
  phoneDisplay: string;
  phoneRaw: string;
  whatsappDisplay: string;
  whatsappRaw: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface BusinessInfo {
  brandName: string;
  founder: string;
  teamSizeDescription: string;
  teamCount: number;
  /** Working brand tagline direction */
  workingTagline: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  contact: ContactInfo;
  targetAreas: readonly string[];
}

export const BUSINESS_INFO: BusinessInfo = {
  brandName: 'SPAN Studio',
  founder: 'Mr. Ankit',
  teamSizeDescription: '10 people',
  teamCount: 10,
  workingTagline: 'MAKE YOUR WORK IMPOSSIBLE TO IGNORE.',
  primaryCtaLabel: 'START A PROJECT',
  secondaryCtaLabel: 'Explore Services',
  contact: {
    phoneDisplay: '+91 70783 82213',
    phoneRaw: '+917078382213',
    whatsappDisplay: '+91 70783 82213',
    whatsappRaw: '917078382213',
    email: 'agastya071@gmail.com',
    address: 'Rudrapur Bypass Rd, Rudrapur, Uttarakhand 263153, India',
    city: 'Rudrapur',
    state: 'Uttarakhand',
    postalCode: '263153',
    country: 'India',
  },
  targetAreas: [
    'Rudrapur',
    'Pantnagar',
    'SIDCUL',
    'Uttarakhand',
    'Delhi NCR',
    'India',
  ] as const,
};

export const SERVICES: readonly ServiceItem[] = [
  {
    id: 'factory-video',
    number: '01',
    slug: 'factory-video',
    name: 'Factory / Industrial Videos',
    tabLabel: 'FACTORY / INDUSTRIAL',
    shortDescription: 'Industrial walkthroughs, operational processes, and manufacturing scale.',
    value:
      'Show the scale, precision, and power of your facility to investors, buyers, and global partners — on your terms.',
    deliverables: [
      'Full facility walkthroughs',
      'Process documentation',
      'Equipment showcases',
      'Safety & compliance films',
      'Investor presentations',
    ],
    visualAesthetic: 'Dark industrial environment — deep depth of field, machinery highlights',
  },
  {
    id: 'product-video',
    number: '02',
    slug: 'product-video',
    name: 'Product Videos',
    tabLabel: 'PRODUCT VIDEOS',
    shortDescription: 'Commercial product cinematography, precision lighting, and studio motion.',
    value:
      'Make your product the undeniable center of attention — with cinematic motion, precision lighting, and commercial storytelling.',
    deliverables: [
      'Hero product films',
      'Feature highlight reels',
      '360° showcase',
      'Catalog videos',
      'E-commerce & marketplace content',
    ],
    visualAesthetic: 'Controlled studio environment — dark bg, precision rim lighting',
  },
  {
    id: 'photography',
    number: '03',
    slug: 'photography',
    name: 'Photography',
    tabLabel: 'PHOTOGRAPHY',
    shortDescription: 'High-definition industrial, architectural plant, and commercial product stills.',
    value:
      'High-definition stills that communicate precision, quality, and scale — ready for print, digital, and investor decks.',
    deliverables: [
      'Industrial & facility photography',
      'Product catalog photography',
      'Executive & team portraits',
      'Architectural plant imaging',
      'B2B marketing assets',
    ],
    visualAesthetic: 'Split contrast — industrial plant geometry & product macros',
  },
  {
    id: '3d-animation',
    number: '04',
    slug: '3d-animation',
    name: '3D Animation',
    tabLabel: '3D ANIMATION',
    shortDescription: 'Internal mechanism exploded views, CAD animation, and pre-build visualization.',
    value:
      'Show what a camera physically cannot — internal structures, assembly sequences, and technical concepts rendered in photorealistic detail.',
    deliverables: [
      'Product exploded views',
      'CAD-to-cinematic animation',
      'Process flow visualization',
      'Facility walkthroughs (pre-build)',
      'Technical presentations',
    ],
    visualAesthetic: 'Exploded mechanical assembly floating in deep dark space',
  },
  {
    id: 'video-editing',
    number: '05',
    slug: 'video-editing',
    name: 'Video Editing',
    tabLabel: 'VIDEO EDITING',
    shortDescription: 'Color grading, sound design, motion graphics, and multi-format delivery.',
    value:
      'Raw footage transformed into polished content — with professional color, sound, motion graphics, and precise narrative pacing.',
    deliverables: [
      'Professional color grading',
      'Sound design & mix',
      'Motion graphics & typography',
      'Multi-format delivery',
      'Subtitle & caption tracks',
    ],
    visualAesthetic: 'Studio timeline aesthetic — waveform, color grading scopes, crisp cuts',
  },
] as const;

export const CAPABILITIES: readonly CapabilityItem[] = [
  {
    id: 'cap-01',
    title: 'Heavy Machinery Operational Reel',
    category: 'FACTORY',
    categoryTag: 'FACTORY VIDEO',
    subtitle: 'Plant floor motion control documentation and heavy stamping press sequence.',
    gridSpan: 'wide',
    isConcept: true,
    visualTheme: 'machinery',
    image: '/images/showcase/machinery-press.jpg',
  },
  {
    id: 'cap-02',
    title: 'Precision Tooling in 3D Motion',
    category: '3D',
    categoryTag: '3D ANIMATION',
    subtitle: 'Photorealistic 3D CAD animation showing high-speed multi-axis milling, chip shear physics, and real-time laser tolerance measurement.',
    gridSpan: 'tall',
    isConcept: true,
    visualTheme: 'cad',
    image: '/images/showcase/cnc-exploded.jpg',
    video: '/videos/precision-tooling-3d.mp4',
  },
  {
    id: 'cap-03',
    title: 'Automotive Component Studio Stills',
    category: 'PHOTOGRAPHY',
    categoryTag: 'PHOTOGRAPHY',
    subtitle: 'High-contrast studio macro stills of precision-machined aluminum casings.',
    gridSpan: 'standard',
    isConcept: true,
    visualTheme: 'product',
    image: '/images/showcase/automotive-macro.jpg',
  },
  {
    id: 'cap-04',
    title: 'Industrial Robotics Assembly Cell',
    category: 'FACTORY',
    categoryTag: 'FACTORY VIDEO',
    subtitle: 'Six-axis articulated arm assembly workflow captured in cinematic high frame rate.',
    gridSpan: 'standard',
    isConcept: true,
    visualTheme: 'robotic',
    image: '/images/showcase/robotics-assembly.jpg',
  },
  {
    id: 'cap-05',
    title: 'Optics & Sensor Housing Showcase',
    category: 'PRODUCT',
    categoryTag: 'PRODUCT VIDEO',
    subtitle: 'Controlled studio motion tracking film highlighting multi-coated anti-reflective glass.',
    gridSpan: 'wide',
    isConcept: true,
    visualTheme: 'optics',
    image: '/images/showcase/optics-housing.jpg',
  },
  {
    id: 'cap-06',
    title: 'Hydraulic Actuator Flow Simulation',
    category: '3D',
    categoryTag: '3D ANIMATION',
    subtitle: 'Dynamic fluid pressure and internal valve manifold technical visualization.',
    gridSpan: 'standard',
    isConcept: true,
    visualTheme: 'cad',
    image: '/images/showcase/hydraulic-simulation.jpg',
  },
] as const;

export const INDUSTRIAL_STORY_STAGES: readonly IndustrialStoryStage[] = [
  {
    stageNumber: '01',
    title: 'YOUR FACILITY',
    description: 'Capture the full scale of your operation.',
    subtitle:
      'Architecture, floor layout, cleanrooms, and automated logistics photographed to convey enterprise credibility to buyers.',
    aspectHint: 'Scale & Architecture',
  },
  {
    stageNumber: '02',
    title: 'YOUR PROCESS',
    description: 'Document the precision of your production line.',
    subtitle:
      'Macro camera movements tracking specialized fabrication, robotic assembly, and rigorous quality inspection stations.',
    aspectHint: 'Precision & Workflow',
  },
  {
    stageNumber: '03',
    title: 'YOUR PRODUCT',
    description: 'Present the finished output at its very best.',
    subtitle:
      'Commercial studio lighting showcasing surface finishes, exact tolerances, and retail packaging ready for distribution.',
    aspectHint: 'Detail & Craft',
  },
  {
    stageNumber: '04',
    title: 'YOUR STORY',
    description: 'Deliver a film that speaks to buyers and investors.',
    subtitle:
      'A cohesive narrative combining engineering discipline, human craft, and company vision that wins international contracts.',
    aspectHint: 'Impact & Conversion',
  },
] as const;

/**
 * Generates a direct WhatsApp link using the confirmed studio WhatsApp number.
 * @param customMessage Optional pre-filled text for user inquiry
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    'Hello SPAN Studio, I would like to discuss a visual production project for my business.';
  const encoded = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/${BUSINESS_INFO.contact.whatsappRaw}?text=${encoded}`;
}

/**
 * Generates a direct Google Maps link to the SPAN Studio location.
 * Priority: NEXT_PUBLIC_GOOGLE_MAPS_URL env var -> universal search URL.
 */
export function getGoogleMapsUrl(query?: string): string {
  const envUrl = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL : undefined;
  if (envUrl && envUrl.trim().length > 0) {
    // Prevent desktop ERR_CONNECTION_TIMED_OUT with maps.app.goo.gl links by using canonical google.com/maps
    if (envUrl.includes('knsX22NSA6JPk73r6')) {
      return 'https://www.google.com/maps/place/ARS+COMPUTER/@28.9886308,79.4183647,17z';
    }
    return envUrl;
  }
  const searchQuery = query || `${BUSINESS_INFO.brandName}, ${BUSINESS_INFO.contact.address}`;
  return 'https://www.google.com/maps/place/ARS+COMPUTER/@28.9886308,79.4183647,17z';
}

// ═══════════════════════════════════════════════════════
// Phase 5: Homepage Sections 7–14 Constants & Types
// ═══════════════════════════════════════════════════════

// ── 07: 3D Animation Feature ──
export interface ThreeDCapability {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technicalPoints: readonly string[];
}

export const THREE_D_CAPABILITIES: readonly ThreeDCapability[] = [
  {
    id: 'internal-structure',
    number: '01',
    title: 'INTERNAL STRUCTURE',
    tagline: "Show what's inside a product or machine.",
    description:
      'Photorealistic exploded assemblies and transparent cutaways revealing engineering tolerances, moving parts, and internal mechanisms that physical cameras cannot access.',
    technicalPoints: [
      'Exploded mechanical assemblies',
      'Transparent material cutaways',
      'Dynamic component cross-sections',
    ],
  },
  {
    id: 'process-flow',
    number: '02',
    title: 'PROCESS FLOW',
    tagline: 'Visualize complex manufacturing sequences.',
    description:
      'Dynamic technical animations tracking materials through production lines, high-pressure hydraulic paths, and automated robotic handling cells in precise chronological order.',
    technicalPoints: [
      'Multi-stage manufacturing flow',
      'Hydraulic & thermal simulations',
      'Automated robotic synchronization',
    ],
  },
  {
    id: 'before-built',
    number: '03',
    title: "BEFORE IT'S BUILT",
    tagline: 'Animate facilities and concepts pre-construction.',
    description:
      'Convert engineering CAD blueprints and architectural BIM models into cinematic walkthroughs for capital pitching, customer pre-orders, and municipal compliance long before ground is broken.',
    technicalPoints: [
      'Greenfield facility walkthroughs',
      'BIM & CAD blueprint translation',
      'Pre-construction investor presentations',
    ],
  },
] as const;

// ── 08: Product Visual Story Pillars & Comparison ──
export interface ProductPillar {
  number: string;
  title: string;
  description: string;
}

export const PRODUCT_STORY_PILLARS: readonly ProductPillar[] = [
  {
    number: '01',
    title: 'Precision Lighting',
    description:
      'Directional key, fill, and rim illumination sculpted to define physical volume, eliminate harsh glare, and carve depth.',
  },
  {
    number: '02',
    title: 'Controlled Environment',
    description:
      'Deep void background with calibrated reflection absorption flags, eliminating plant floor clutter and isolating the product.',
  },
  {
    number: '03',
    title: 'Material Detail',
    description:
      'High-dynamic-range cinema sensors and macro optics capturing fine brushed textures, matte coatings, and tight manufacturing tolerances.',
  },
] as const;

export interface ProductComparisonFeature {
  feature: string;
  ordinary: string;
  spanStudio: string;
}

export const PRODUCT_COMPARISON_SPECS: readonly ProductComparisonFeature[] = [
  {
    feature: 'Illumination',
    ordinary: 'Flat overhead fluorescent lighting with harsh shadows and glare',
    spanStudio: 'Sculpted 3-point key, fill, and rim lighting accentuating geometry',
  },
  {
    feature: 'Environment',
    ordinary: 'Cluttered plant floor background with uncontrolled ambient bounce',
    spanStudio: 'Pure deep black void with precision light-absorbing flags',
  },
  {
    feature: 'Texture & Finish',
    ordinary: 'Washed out highlights and compressed dynamic range losing fine detail',
    spanStudio: 'Macro-sharp resolution capturing micro-textures, coatings, and tolerances',
  },
  {
    feature: 'Commercial Impact',
    ordinary: 'Generic documentation look that fails to impress enterprise buyers',
    spanStudio: 'Cinematic brand statement built for high-value sales & investor decks',
  },
] as const;

// ── 09: Why SPAN Studio Positioning Pillars ──
export interface WhySpanPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export const WHY_SPAN_PILLARS: readonly WhySpanPillar[] = [
  {
    number: '01',
    title: 'INDUSTRIAL UNDERSTANDING',
    subtitle: 'Plant-Floor Fluent',
    description:
      'Deep appreciation for factory floor workflows, safety protocols, heavy machinery operation, and technical engineering language. We know what matters to technical buyers and industrial plant leaders.',
  },
  {
    number: '02',
    title: 'END-TO-END PRODUCTION',
    subtitle: 'Single Agile Pipeline',
    description:
      'From script development, storyboards, and plant scouting to high-frame-rate on-site filming, commercial studio photography, CAD animation, and color grading. One dedicated team handling the entire pipeline.',
  },
  {
    number: '03',
    title: 'CINEMATIC STANDARDS',
    subtitle: 'Commercial Cinema Rigor',
    description:
      'Bringing high-end commercial cinema optics, controlled lighting, and sound design to industrial subjects that are usually shot on mobile phones or basic cameras.',
  },
  {
    number: '04',
    title: "BUILT FOR INDIA'S INDUSTRIAL CORRIDOR",
    subtitle: 'Strategic Regional Presence',
    description:
      'Headquartered in Rudrapur, Uttarakhand, strategically located within the SIDCUL industrial hub and connected directly to manufacturing belts across Delhi NCR and nationwide.',
  },
] as const;

// ── 10: Five-Step Production Process ──
export interface ProcessStep {
  number: string;
  title: string;
  shortLabel: string;
  description: string;
  deliverables: readonly string[];
}

export const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    shortLabel: 'Scope & Briefing',
    description:
      'We dive into your plant layout, product mechanics, target audience, and business objectives. We define key deliverables and commercial goals.',
    deliverables: [
      'Project brief & commercial objectives',
      'Facility / product reconnaissance',
      'Deliverable roadmap',
    ],
  },
  {
    number: '02',
    title: 'PLAN',
    shortLabel: 'Pre-Production Planning',
    description:
      'Developing shot lists, technical CAD storyboards, lighting plans, and safety coordination schedules designed to work smoothly within active production facilities.',
    deliverables: [
      'Approved shot list & sequence board',
      'Safety coordination & shift planning',
      'Filming timeline & shift coordination',
    ],
  },
  {
    number: '03',
    title: 'PRODUCE',
    shortLabel: 'Cinematic Capture',
    description:
      'On-site filming with cinema cameras, specialized rigging, and industrial lighting setups, or controlled product staging inside our studio environment.',
    deliverables: [
      'High-bitrate cinema footage',
      'Controlled studio stills',
      'Dedicated industrial lighting setup',
    ],
  },
  {
    number: '04',
    title: 'EDIT',
    shortLabel: 'Post-Production Craft',
    description:
      'Color grading, sound design, motion typography, 3D compositing, and narrative pacing crafted to hold buyer attention.',
    deliverables: [
      'Narrative cut & pacing review',
      'Precision cinema color grading',
      'Custom sound design & titles',
    ],
  },
  {
    number: '05',
    title: 'DELIVER',
    shortLabel: 'Multi-Format Masters',
    description:
      'Exporting high-bitrate master files formatted for 4K presentations, web performance, social formats, and trade show displays.',
    deliverables: [
      '4K Ultra HD master files',
      'Web-optimized video packages',
      'Multi-format delivery master packages',
    ],
  },
] as const;

// ── 11: About Studio Facts ──
export interface StudioFact {
  label: string;
  value: string;
  detail: string;
}

export const ABOUT_FACTS: readonly StudioFact[] = [
  {
    label: 'Production Team',
    value: '10 People',
    detail: 'Rudrapur-based team dedicated to industrial and product visual content',
  },
  {
    label: 'Studio Base',
    value: 'Rudrapur, Uttarakhand',
    detail: 'Located in the SIDCUL manufacturing corridor, serving clients across India',
  },
  {
    label: 'Core Disciplines',
    value: 'Video · Photography · 3D',
    detail: 'Integrated visual content tailored for manufacturing and commercial brands',
  },
] as const;

// ── 12: Frequently Asked Questions ──
export interface FAQItem {
  id: string;
  category: 'General' | 'Production' | '3D & Tech' | 'Commercial';
  question: string;
  answer: string;
}

export const FAQ_ITEMS: readonly FAQItem[] = [
  {
    id: 'faq-01',
    category: 'General',
    question: 'What types of businesses does SPAN Studio work with?',
    answer:
      'We primarily work with industrial manufacturers, heavy engineering plants, automotive component makers, fabrication units, and commercial product enterprises. We also collaborate with architecture, infrastructure, and technology firms that require cinematic documentation of facilities, hardware, and operational processes.',
  },
  {
    id: 'faq-02',
    category: 'Production',
    question: 'Do you shoot at factory and manufacturing locations?',
    answer:
      'Yes. Our crew is experienced in operational industrial environments. We follow plant safety instructions, wear required PPE, and coordinate with plant management and shift supervisors to shoot efficiently alongside daily operations.',
  },
  {
    id: 'faq-03',
    category: 'General',
    question: 'Can you create videos for companies outside Rudrapur / Uttarakhand?',
    answer:
      'Absolutely. While headquartered in Rudrapur within the SIDCUL industrial belt, our production team regularly deploys across Uttarakhand, Delhi NCR, and industrial manufacturing corridors throughout India. For 3D animation and post-production, we work seamlessly with clients remotely anywhere.',
  },
  {
    id: 'faq-04',
    category: '3D & Tech',
    question: 'What is included in a 3D animation project?',
    answer:
      'A complete 3D technical animation project includes CAD file import/optimization (or custom 3D modeling from engineering schematics), texturing, photorealistic lighting, exploded assembly motion, process flow simulation, camera choreography, sound design, and master rendering in high resolution.',
  },
  {
    id: 'faq-05',
    category: 'Production',
    question: 'How long does a typical video production project take?',
    answer:
      'A standard production cycle generally takes 2 to 4 weeks from initial briefing and pre-production planning through on-site filming, post-production, and final delivery. Accelerated turnaround schedules can also be arranged depending on your launch or trade show deadlines.',
  },
  {
    id: 'faq-06',
    category: 'Production',
    question: 'Do you provide edited videos or only raw footage?',
    answer:
      'We deliver complete, fully edited cinematic films—including narrative structure, professional color grading, sound design, motion graphics, and typography. If your internal marketing team requires raw footage or archival b-roll reels for future use, we can supply that upon request.',
  },
  {
    id: 'faq-07',
    category: 'Commercial',
    question: 'Can I see examples of your work before booking?',
    answer:
      'Yes. You can explore our visual capabilities and concept demonstrations directly on this website under the Work section. During our initial conversation, we can also share specific spec examples and creative treatments relevant to your manufacturing sector or product category.',
  },
  {
    id: 'faq-08',
    category: 'Commercial',
    question: 'How do I get a quotation?',
    answer:
      'Simply click "START A PROJECT" to submit your project requirements, message us on WhatsApp, or call our Rudrapur office directly at +91 70783 82213. We will review your facility or product scope and provide a transparent, itemized proposal tailored to your goals.',
  },
  {
    id: 'faq-09',
    category: 'General',
    question: 'Can SPAN Studio work with startups and smaller businesses?',
    answer:
      'Yes. While we frequently work with large manufacturing plants, we also partner with emerging engineering startups, product innovators, and growing enterprises that need commercial-grade visuals to pitch investors, secure procurement contracts, or launch new hardware.',
  },
  {
    id: 'faq-10',
    category: 'Production',
    question: 'What formats and resolutions are final videos delivered in?',
    answer:
      'We deliver master files in 4K Ultra HD and 1080p Full HD (ProRes and high-bitrate MP4), along with optimized aspect ratios for website embedding, sales presentations, trade show LED walls, and vertical formats (9:16) for social and mobile channels.',
  },
] as const;

