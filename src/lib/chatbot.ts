import { ChatAction } from '@/types/chat';

export type ChatbotIntent =
  | 'GREETING'
  | 'SERVICES'
  | 'FACTORY_VIDEOS'
  | 'PRODUCT_VIDEOS'
  | 'PHOTOGRAPHY'
  | 'THREE_D'
  | 'VIDEO_EDITING'
  | 'PROCESS'
  | 'SERVICE_AREA'
  | 'PRICING'
  | 'CONTACT'
  | 'WHATSAPP'
  | 'PHONE'
  | 'ABOUT'
  | 'PORTFOLIO'
  | 'UNKNOWN';

export interface ChatbotResponse {
  intent: ChatbotIntent;
  text: string;
  actions?: ChatAction[];
}

export const COMMON_ACTIONS = {
  START_PROJECT: {
    label: 'Start a Project',
    href: '/contact',
    variant: 'primary',
  } as ChatAction,
  WHATSAPP: {
    label: 'Talk on WhatsApp',
    href: 'https://wa.me/917078382213?text=Hi%20SPAN%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20project.',
    isExternal: true,
    variant: 'whatsapp',
  } as ChatAction,
  CALL: {
    label: 'Call Us',
    href: 'tel:+917078382213',
    isExternal: true,
    variant: 'secondary',
  } as ChatAction,
  SERVICES: {
    label: 'Explore Services',
    href: '/services',
    variant: 'secondary',
  } as ChatAction,
  WORK: {
    label: 'View Capability Demos',
    href: '/work',
    variant: 'secondary',
  } as ChatAction,
};

export const CHATBOT_RESPONSES: Record<ChatbotIntent, { text: string; actions?: ChatAction[] }> = {
  GREETING: {
    text: "Hello! I'm SPAN Assistant. How can I help you today? You can ask about our 5 core production services, production process, service locations, pricing, or how to start a project.",
    actions: [COMMON_ACTIONS.SERVICES, COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  SERVICES: {
    text: "SPAN Studio provides exactly five core visual production disciplines:\n\n1. Factory / Industrial Videos\n2. Product Videos\n3. Photography\n4. 3D Animation\n5. Video Editing\n\nEach discipline is tailored for manufacturing plants, engineering businesses, and commercial product brands.",
    actions: [COMMON_ACTIONS.SERVICES, COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  FACTORY_VIDEOS: {
    text: "Our Factory / Industrial Videos cover full facility walkthroughs, operational process documentation, equipment showcases, safety films, and investor presentations. We film directly on-site with cinema camera setups and industrial lighting designed to operate smoothly around active plant routines.",
    actions: [COMMON_ACTIONS.SERVICES, COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  PRODUCT_VIDEOS: {
    text: "Our Product Videos bring commercial product cinematography, precision rim lighting, and controlled studio motion to your hardware. Deliverables include hero product films, feature highlight reels, 360° showcases, and e-commerce launch content.",
    actions: [COMMON_ACTIONS.SERVICES, COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  PHOTOGRAPHY: {
    text: "Our Photography discipline delivers high-definition stills communicating precision, quality, and scale. We cover industrial facility architecture, product catalog macros, executive portraits, and B2B marketing assets.",
    actions: [COMMON_ACTIONS.SERVICES, COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  THREE_D: {
    text: "Our 3D Animation service visualizes what a physical camera cannot: internal mechanism exploded views, photorealistic CAD-to-cinematic animations, fluid & pressure process flows, and technical pre-build presentations rendered in high resolution.",
    actions: [COMMON_ACTIONS.SERVICES, COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  VIDEO_EDITING: {
    text: "Our Video Editing & Post-Production service transforms footage into polished final assets. Deliverables include precision cinema color grading, custom sound design & audio mixing, motion typography, and multi-format master packages (4K Ultra HD and 1080p).",
    actions: [COMMON_ACTIONS.SERVICES, COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  PROCESS: {
    text: "We follow a disciplined 5-stage production framework:\n\n1. DISCOVER — Scope, briefing & deliverable roadmap\n2. PLAN — Shot lists, CAD storyboards & safety coordination\n3. PRODUCE — On-site cinema filming or controlled studio staging\n4. EDIT — Color grading, sound design & motion graphics\n5. DELIVER — Multi-format 4K Ultra HD and web master packages",
    actions: [COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  SERVICE_AREA: {
    text: "SPAN Studio is based on Rudrapur Bypass Rd in Rudrapur, Uttarakhand (SIDCUL manufacturing belt). We deploy for on-site productions across Rudrapur, Pantnagar, Uttarakhand, Delhi NCR, and industrial corridors across India. For 3D animation and post-production, we collaborate remotely nationwide.",
    actions: [COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP],
  },
  PRICING: {
    text: "Project pricing is custom-quoted based on the scope, location, production requirements and deliverables. Start a Project or message SPAN Studio on WhatsApp for a project-specific quote.",
    actions: [COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP, COMMON_ACTIONS.CALL],
  },
  CONTACT: {
    text: "You can reach our team through several direct channels:\n\n• Location: Rudrapur Bypass Rd, Rudrapur, Uttarakhand 263153\n• Phone: +91 70783 82213\n• WhatsApp: +91 70783 82213\n• Email: agastya071@gmail.com\n\nYou can also submit a project brief directly through our Contact page.",
    actions: [COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP, COMMON_ACTIONS.CALL],
  },
  WHATSAPP: {
    text: "You can message SPAN Studio directly on WhatsApp at +91 70783 82213 for rapid project scheduling, quotes, or production discussions.",
    actions: [COMMON_ACTIONS.WHATSAPP, COMMON_ACTIONS.START_PROJECT],
  },
  PHONE: {
    text: "You can call our Rudrapur office directly at +91 70783 82213 (Mon – Sat, 9:00 AM – 7:00 PM IST).",
    actions: [COMMON_ACTIONS.CALL, COMMON_ACTIONS.WHATSAPP],
  },
  ABOUT: {
    text: "SPAN Studio is an independent visual cinematography studio founded by Mr. Ankit, based in Rudrapur, Uttarakhand. We operate with a dedicated 10-person production team specialized in industrial manufacturing and commercial product visual content.",
    actions: [COMMON_ACTIONS.SERVICES, COMMON_ACTIONS.START_PROJECT],
  },
  PORTFOLIO: {
    text: "You can explore our visual benchmarks on the Work page (/work). Note that all showcased projects are concept treatments and illustrative specification reels created internally by SPAN Studio to demonstrate visual style, lighting, and camera movement.",
    actions: [COMMON_ACTIONS.WORK, COMMON_ACTIONS.START_PROJECT],
  },
  UNKNOWN: {
    text: "I'm here to help with information about SPAN Studio's services (Factory Videos, Product Films, Photography, 3D Animation, Editing), production process, service locations, and project inquiries. For specific questions or customized project quotes, please reach out to our team directly.",
    actions: [COMMON_ACTIONS.START_PROJECT, COMMON_ACTIONS.WHATSAPP, COMMON_ACTIONS.CALL],
  },
};

/**
 * Normalizes user text for matching (lowercase, strips punctuation).
 */
export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Matches user query against deterministic keyword patterns and returns the mapped response.
 */
export function matchIntent(rawInput: string): ChatbotResponse {
  const norm = normalizeText(rawInput);

  if (!norm) {
    return {
      intent: 'UNKNOWN',
      ...CHATBOT_RESPONSES.UNKNOWN,
    };
  }

  // 1. Pricing / Quote questions (High priority)
  if (
    norm.includes('price') ||
    norm.includes('pricing') ||
    norm.includes('cost') ||
    norm.includes('how much') ||
    norm.includes('budget') ||
    norm.includes('charge') ||
    norm.includes('rate') ||
    norm.includes('fee') ||
    norm.includes('kitna charge') ||
    norm.includes('kitne paise') ||
    norm.includes('kya rate') ||
    norm.includes('costing') ||
    norm.includes('estimate')
  ) {
    return { intent: 'PRICING', ...CHATBOT_RESPONSES.PRICING };
  }

  // 2. Direct WhatsApp query
  if (
    norm.includes('whatsapp') ||
    norm === 'wa' ||
    norm.startsWith('wa ') ||
    norm.endsWith(' wa') ||
    norm.includes(' wa ') ||
    norm.includes('watsapp') ||
    norm.includes('what s app') ||
    norm.includes('whatsapp number')
  ) {
    return { intent: 'WHATSAPP', ...CHATBOT_RESPONSES.WHATSAPP };
  }

  // 3. Direct Phone / Call query
  if (
    norm.includes('call') ||
    norm.includes('phone') ||
    norm.includes('telephone') ||
    norm.includes('mobile number') ||
    norm.includes('phone number') ||
    norm.includes('call us') ||
    norm.includes('call karo')
  ) {
    return { intent: 'PHONE', ...CHATBOT_RESPONSES.PHONE };
  }

  // 4. Contact / How to start a project
  if (
    norm.includes('contact') ||
    norm.includes('start a project') ||
    norm.includes('start project') ||
    norm.includes('project kaise start') ||
    norm.includes('reach out') ||
    norm.includes('talk to someone') ||
    norm.includes('email') ||
    norm.includes('inquire') ||
    norm.includes('inquiry') ||
    norm.includes('brief') ||
    norm.includes('connect') ||
    norm.includes('baat karni') ||
    norm.includes('kaise contact')
  ) {
    return { intent: 'CONTACT', ...CHATBOT_RESPONSES.CONTACT };
  }

  // 5. Photography (Checks for photo/stills explicitly)
  if (
    norm.includes('photo') ||
    norm.includes('photography') ||
    norm.includes('photoshoot') ||
    norm.includes('commercial photo') ||
    norm.includes('industrial photo') ||
    norm.includes('plant photo') ||
    norm.includes('product photo') ||
    norm.includes('stills')
  ) {
    return { intent: 'PHOTOGRAPHY', ...CHATBOT_RESPONSES.PHOTOGRAPHY };
  }

  // 6. Factory / Industrial Videos
  if (
    norm.includes('factory video') ||
    norm.includes('factory films') ||
    norm.includes('plant video') ||
    norm.includes('plant shoot') ||
    norm.includes('plant film') ||
    norm.includes('plant machinery') ||
    norm.includes('industrial video') ||
    norm.includes('industrial shoot') ||
    norm.includes('factory walkthrough') ||
    norm.includes('plant walkthrough') ||
    norm.includes('machinery video') ||
    norm.includes('manufacturing video') ||
    norm.includes('factory ki video') ||
    norm.includes('factory')
  ) {
    return { intent: 'FACTORY_VIDEOS', ...CHATBOT_RESPONSES.FACTORY_VIDEOS };
  }

  // 7. Product Videos
  if (
    norm.includes('product video') ||
    norm.includes('product shoot') ||
    norm.includes('product films') ||
    norm.includes('product commercial') ||
    norm.includes('product showcase') ||
    norm.includes('product macro') ||
    norm.includes('product ki video')
  ) {
    return { intent: 'PRODUCT_VIDEOS', ...CHATBOT_RESPONSES.PRODUCT_VIDEOS };
  }

  // 8. 3D Animation / CAD
  if (
    norm.includes('3d') ||
    norm.includes('3d animation') ||
    norm.includes('cad') ||
    norm.includes('animation') ||
    norm.includes('exploded view') ||
    norm.includes('render') ||
    norm.includes('mechanism') ||
    norm.includes('3d video') ||
    norm.includes('3d animation karte ho')
  ) {
    return { intent: 'THREE_D', ...CHATBOT_RESPONSES.THREE_D };
  }

  // 9. Video Editing / Post Production
  if (
    norm.includes('editing') ||
    norm.includes('video editing') ||
    norm.includes('post production') ||
    norm.includes('color grading') ||
    norm.includes('sound design') ||
    norm.includes('editor') ||
    norm.includes('re edit') ||
    norm === 'cut' ||
    norm.startsWith('cut ') ||
    norm.endsWith(' cut') ||
    norm.includes(' cut ') ||
    norm.includes('final cut')
  ) {
    return { intent: 'VIDEO_EDITING', ...CHATBOT_RESPONSES.VIDEO_EDITING };
  }

  // 10. Process / Workflow
  if (
    norm.includes('process') ||
    norm.includes('how does it work') ||
    norm.includes('how do you work') ||
    norm.includes('workflow') ||
    norm.includes('steps') ||
    norm.includes('stages') ||
    norm.includes('production process') ||
    norm.includes('kaise kaam karte ho') ||
    norm.includes('workflow kya hai') ||
    norm.includes('timeline')
  ) {
    return { intent: 'PROCESS', ...CHATBOT_RESPONSES.PROCESS };
  }

  // 11. Location / Service Area
  if (
    norm.includes('rudrapur') ||
    norm.includes('pantnagar') ||
    norm.includes('sidcul') ||
    norm.includes('delhi') ||
    norm.includes('ncr') ||
    norm.includes('uttarakhand') ||
    norm.includes('location') ||
    norm.includes('area') ||
    norm.includes('where are you') ||
    norm.includes('where are you located') ||
    norm.includes('kahan par hai') ||
    norm.includes('kahan hai') ||
    norm.includes('rudrapur mein') ||
    norm.includes('kahan shoot hota') ||
    norm.includes('address')
  ) {
    return { intent: 'SERVICE_AREA', ...CHATBOT_RESPONSES.SERVICE_AREA };
  }

  // 12. Portfolio / Work / Examples
  if (
    norm.includes('portfolio') ||
    norm === 'work' ||
    norm.startsWith('work ') ||
    norm.endsWith(' work') ||
    norm.includes(' work ') ||
    norm.includes('our work') ||
    norm.includes('your work') ||
    norm.includes('past work') ||
    norm.includes('previous work') ||
    norm.includes('recent work') ||
    norm.includes('work samples') ||
    norm.includes('work examples') ||
    norm.includes('examples') ||
    norm.includes('samples') ||
    norm.includes('demo') ||
    norm.includes('demos') ||
    norm.includes('showcase')
  ) {
    return { intent: 'PORTFOLIO', ...CHATBOT_RESPONSES.PORTFOLIO };
  }

  // 13. About / Founder / Team
  if (
    norm.includes('about') ||
    norm.includes('who are you') ||
    norm.includes('who is') ||
    norm.includes('founder') ||
    norm.includes('ankit') ||
    norm.includes('team') ||
    norm.includes('company') ||
    norm.includes('span studio kya karta hai') ||
    norm.includes('kya karta hai') ||
    norm.includes('background')
  ) {
    return { intent: 'ABOUT', ...CHATBOT_RESPONSES.ABOUT };
  }

  // 14. Services (General)
  if (
    norm.includes('services') ||
    norm.includes('what do you do') ||
    norm.includes('what services') ||
    norm.includes('offer') ||
    norm.includes('capabilities') ||
    norm.includes('kya service') ||
    norm.includes('services kya hai') ||
    norm.includes('kya karte ho') ||
    norm.includes('kya banate ho')
  ) {
    return { intent: 'SERVICES', ...CHATBOT_RESPONSES.SERVICES };
  }

  // 15. Greetings
  if (
    norm === 'hi' ||
    norm === 'hello' ||
    norm === 'hey' ||
    norm.startsWith('hi ') ||
    norm.startsWith('hello ') ||
    norm.startsWith('hey ') ||
    norm.includes('namaste') ||
    norm.includes('good morning') ||
    norm.includes('good afternoon') ||
    norm.includes('good evening') ||
    norm.includes('kaise ho') ||
    norm.includes('kese ho') ||
    norm.includes('greetings')
  ) {
    return { intent: 'GREETING', ...CHATBOT_RESPONSES.GREETING };
  }

  // 16. Fallback / Unknown
  return {
    intent: 'UNKNOWN',
    ...CHATBOT_RESPONSES.UNKNOWN,
  };
}
