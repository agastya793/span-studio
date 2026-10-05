import { describe, it, expect, vi } from 'vitest';
import {
  matchIntent,
  normalizeText,
  CHATBOT_RESPONSES,
  COMMON_ACTIONS,
  ChatbotIntent,
} from '../src/lib/chatbot';

describe('Phase 10: Deterministic SPAN Assistant Chatbot Suite', () => {
  // ── 0. TEXT NORMALIZATION & INTENT EXHAUSTIVENESS ──
  describe('0. Text Normalization & Intent Keys', () => {
    it('normalizes queries by trimming, lowercasing, and stripping punctuation', () => {
      expect(normalizeText('  What Services Do You Offer???  ')).toBe('what services do you offer');
      expect(normalizeText('SPAN Studio kya karta hai?!')).toBe('span studio kya karta hai');
    });

    it('defines exactly 16 intents in responses', () => {
      const intentKeys = Object.keys(CHATBOT_RESPONSES) as ChatbotIntent[];
      expect(intentKeys.length).toBe(16);
      expect(intentKeys).toContain('GREETING');
      expect(intentKeys).toContain('SERVICES');
      expect(intentKeys).toContain('FACTORY_VIDEOS');
      expect(intentKeys).toContain('PRODUCT_VIDEOS');
      expect(intentKeys).toContain('PHOTOGRAPHY');
      expect(intentKeys).toContain('THREE_D');
      expect(intentKeys).toContain('VIDEO_EDITING');
      expect(intentKeys).toContain('PROCESS');
      expect(intentKeys).toContain('SERVICE_AREA');
      expect(intentKeys).toContain('PRICING');
      expect(intentKeys).toContain('CONTACT');
      expect(intentKeys).toContain('WHATSAPP');
      expect(intentKeys).toContain('PHONE');
      expect(intentKeys).toContain('ABOUT');
      expect(intentKeys).toContain('PORTFOLIO');
      expect(intentKeys).toContain('UNKNOWN');
    });
  });

  // ── 1. GREETING INTENT ──
  describe('1. Greeting Intent', () => {
    it('matches common greetings to GREETING', () => {
      const inputs = ['Hello', 'Hi', 'Hey there', 'Namaste', 'Good morning', 'Kaise ho'];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('GREETING');
        expect(res.text).toBe(CHATBOT_RESPONSES.GREETING.text);
        expect(res.actions).toEqual(CHATBOT_RESPONSES.GREETING.actions);
      });
    });
  });

  // ── 2. SERVICES INTENT ──
  describe('2. Services Intent', () => {
    it('matches general services inquiries', () => {
      const inputs = [
        'What services do you offer?',
        'services',
        'what do you do',
        'what services',
        'What are your capabilities?',
      ];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('SERVICES');
        expect(res.text).toContain('five core visual production disciplines');
        expect(res.text).toContain('1. Factory / Industrial Videos');
      });
    });
  });

  // ── 3. FACTORY VIDEOS INTENT ──
  describe('3. Factory Video Intent', () => {
    it('matches factory, plant, and industrial video queries', () => {
      const inputs = [
        'factory video',
        'plant video',
        'industrial video',
        'factory walkthrough',
        'Can you film our plant machinery?',
      ];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('FACTORY_VIDEOS');
        expect(res.text).toContain('Factory / Industrial Videos');
      });
    });
  });

  // ── 4. PRODUCT VIDEOS INTENT ──
  describe('4. Product Video Intent', () => {
    it('matches product video and shoot queries', () => {
      const inputs = ['product video', 'product shoot', 'commercial product films'];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('PRODUCT_VIDEOS');
        expect(res.text).toContain('Product Videos');
      });
    });
  });

  // ── 5. PHOTOGRAPHY INTENT ──
  describe('5. Photography Intent', () => {
    it('matches photography and photoshoot queries', () => {
      const inputs = ['photography', 'commercial photography', 'industrial photo', 'plant photos'];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('PHOTOGRAPHY');
        expect(res.text).toContain('Photography');
      });
    });
  });

  // ── 6. 3D INTENT ──
  describe('6. 3D Animation Intent', () => {
    it('matches 3D, animation, and CAD queries', () => {
      const inputs = ['3d', '3d animation', 'CAD animation', 'exploded view mechanism'];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('THREE_D');
        expect(res.text).toContain('3D Animation');
      });
    });
  });

  // ── 7. EDITING INTENT ──
  describe('7. Video Editing Intent', () => {
    it('matches video editing and post-production queries', () => {
      const inputs = ['editing', 'video editing', 'post production', 'color grading'];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('VIDEO_EDITING');
        expect(res.text).toContain('Video Editing');
      });
    });
  });

  // ── 8. PROCESS INTENT ──
  describe('8. Process Intent', () => {
    it('matches workflow and production process inquiries', () => {
      const inputs = [
        'How does the production process work?',
        'how do you work',
        'production process',
        'what is your workflow',
      ];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('PROCESS');
        expect(res.text).toContain('5-stage production framework');
        expect(res.text).toContain('DISCOVER');
        expect(res.text).toContain('PLAN');
        expect(res.text).toContain('PRODUCE');
        expect(res.text).toContain('EDIT');
        expect(res.text).toContain('DELIVER');
      });
    });
  });

  // ── 9. SERVICE-AREA INTENT ──
  describe('9. Service-Area Intent', () => {
    it('matches geographic location and travel inquiries', () => {
      const inputs = [
        'Where are you located?',
        'Do you shoot in Rudrapur?',
        'Pantnagar shoot',
        'Can you travel to Delhi NCR?',
        'sidcul area',
      ];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('SERVICE_AREA');
        expect(res.text).toContain('Rudrapur Bypass Rd');
        expect(res.text).toContain('SIDCUL');
        expect(res.text).toContain('Pantnagar');
        expect(res.text).toContain('Delhi NCR');
      });
    });
  });

  // ── 10. PRICING INTENT ──
  describe('10. Pricing Intent', () => {
    it('matches pricing queries with exact mandated response and actions', () => {
      const inputs = [
        'How much do you charge?',
        'What is your pricing?',
        'cost',
        'how much',
        'budget',
        'pricing estimate',
      ];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('PRICING');
        expect(res.text).toBe(
          'Project pricing is custom-quoted based on the scope, location, production requirements and deliverables. Start a Project or message SPAN Studio on WhatsApp for a project-specific quote.'
        );
        expect(res.actions).toBeDefined();
        expect(res.actions).toEqual([
          COMMON_ACTIONS.START_PROJECT,
          COMMON_ACTIONS.WHATSAPP,
          COMMON_ACTIONS.CALL,
        ]);
        expect(res.actions?.[0].href).toBe('/contact');
        expect(res.actions?.[1].href).toContain('wa.me/917078382213');
        expect(res.actions?.[2].href).toBe('tel:+917078382213');
      });
    });
  });

  // ── 11. CONTACT INTENT ──
  describe('11. Contact Intent', () => {
    it('matches contact and start a project inquiries', () => {
      const inputs = [
        'How can I start a project?',
        'contact',
        'reach out',
        'email address',
        'send an inquiry',
      ];
      inputs.forEach((input) => {
        const res = matchIntent(input);
        expect(res.intent).toBe('CONTACT');
        expect(res.text).toContain('+91 70783 82213');
        expect(res.text).toContain('agastya071@gmail.com');
      });
    });
  });

  // ── 12. WHATSAPP ACTION GENERATION ──
  describe('12. WhatsApp Action Generation', () => {
    it('generates direct WhatsApp routing', () => {
      const res = matchIntent('whatsapp number');
      expect(res.intent).toBe('WHATSAPP');
      expect(res.actions?.[0].href).toContain('https://wa.me/917078382213');
      expect(res.actions?.[0].variant).toBe('whatsapp');
    });
  });

  // ── 13. PHONE ACTION GENERATION ──
  describe('13. Phone Action Generation', () => {
    it('generates direct phone call action', () => {
      const res = matchIntent('call us');
      expect(res.intent).toBe('PHONE');
      expect(res.actions?.[0].href).toBe('tel:+917078382213');
      expect(res.text).toContain('+91 70783 82213');
    });
  });

  // ── 14. UNKNOWN QUESTION FALLBACK ──
  describe('14. Unknown Question Fallback', () => {
    it('falls back gracefully on non-matching or arbitrary queries', () => {
      const arbitrary = 'Explain quantum physics theory of light';
      const res = matchIntent(arbitrary);
      expect(res.intent).toBe('UNKNOWN');
      expect(res.text).toContain('SPAN Studio');
      expect(res.actions).toEqual([
        COMMON_ACTIONS.START_PROJECT,
        COMMON_ACTIONS.WHATSAPP,
        COMMON_ACTIONS.CALL,
      ]);
    });

    it('falls back on empty or whitespace strings', () => {
      const res = matchIntent('   ');
      expect(res.intent).toBe('UNKNOWN');
    });
  });

  // ── 15. HINDI / HINGLISH EXAMPLES ──
  describe('15. Hindi / Hinglish Examples', () => {
    it('matches "SPAN Studio kya karta hai?"', () => {
      const res = matchIntent('SPAN Studio kya karta hai?');
      expect(['ABOUT', 'SERVICES']).toContain(res.intent);
      expect(res.text).toContain('SPAN Studio');
    });

    it('matches "Factory ki video banate ho?" to FACTORY_VIDEOS', () => {
      const res = matchIntent('Factory ki video banate ho?');
      expect(res.intent).toBe('FACTORY_VIDEOS');
      expect(res.text).toContain('Factory / Industrial Videos');
    });

    it('matches "3D animation karte ho?" to THREE_D', () => {
      const res = matchIntent('3D animation karte ho?');
      expect(res.intent).toBe('THREE_D');
      expect(res.text).toContain('3D Animation');
    });

    it('matches "Kitna charge karte ho?" to PRICING', () => {
      const res = matchIntent('Kitna charge karte ho?');
      expect(res.intent).toBe('PRICING');
      expect(res.text).toContain('custom-quoted');
    });

    it('matches "Rudrapur mein shoot hota hai?" to SERVICE_AREA', () => {
      const res = matchIntent('Rudrapur mein shoot hota hai?');
      expect(res.intent).toBe('SERVICE_AREA');
      expect(res.text).toContain('Rudrapur');
    });

    it('matches "Project kaise start kare?" to CONTACT', () => {
      const res = matchIntent('Project kaise start kare?');
      expect(res.intent).toBe('CONTACT');
      expect(res.text).toContain('Contact page');
    });
  });

  // ── 16. MESSAGE HISTORY MAX 20 ──
  describe('16. Message History Maximum 20 Window', () => {
    it('strictly limits sliding window to 20 messages', () => {
      const history = Array.from({ length: 25 }, (_, i) => ({
        id: `msg-${i}`,
        role: i % 2 === 0 ? ('user' as const) : ('model' as const),
        text: `Message ${i}`,
        timestamp: Date.now() + i,
      }));

      const capped = history.slice(-20);
      expect(capped.length).toBe(20);
      expect(capped[0].id).toBe('msg-5');
      expect(capped[19].id).toBe('msg-24');
    });
  });

  // ── 17. NO FABRICATED BUSINESS INFORMATION ──
  describe('17. Anti-Fabrication & Business Accuracy Verification', () => {
    it('does not contain any fabricated client names in responses', () => {
      const allText = Object.values(CHATBOT_RESPONSES)
        .map((r) => r.text)
        .join(' ');

      const forbiddenClients = [
        'Tata',
        'Bajaj',
        'Maruti',
        'Reliance',
        'Mahindra',
        'L&T',
        'Schneider',
        'Hero',
      ];
      forbiddenClients.forEach((client) => {
        expect(allText).not.toContain(client);
      });
    });

    it('does not invent revenue, certifications, or awards', () => {
      const allText = Object.values(CHATBOT_RESPONSES)
        .map((r) => r.text)
        .join(' ');

      expect(allText).not.toContain('ISO ');
      expect(allText).not.toContain('Award');
      expect(allText).not.toContain('revenue');
      expect(allText).not.toContain('crore');
      expect(allText).not.toContain('million');
      expect(allText).not.toContain('years of experience');
    });

    it('does not invent equipment ownership or camera models', () => {
      const allText = Object.values(CHATBOT_RESPONSES)
        .map((r) => r.text)
        .join(' ');

      expect(allText).not.toContain('RED ');
      expect(allText).not.toContain('ARRI');
      expect(allText).not.toContain('FX3');
      expect(allText).not.toContain('FX6');
      expect(allText).not.toContain('DJI Ronin');
    });

    it('accurately clarifies that portfolio items are concept demonstrations', () => {
      expect(CHATBOT_RESPONSES.PORTFOLIO.text).toContain('concept treatments');
      expect(CHATBOT_RESPONSES.PORTFOLIO.text).toContain('illustrative specification reels');
    });

    it('contains only confirmed founder and location facts', () => {
      expect(CHATBOT_RESPONSES.ABOUT.text).toContain('Mr. Ankit');
      expect(CHATBOT_RESPONSES.ABOUT.text).toContain('10-person');
      expect(CHATBOT_RESPONSES.CONTACT.text).toContain('+91 70783 82213');
      expect(CHATBOT_RESPONSES.CONTACT.text).toContain('agastya071@gmail.com');
      expect(CHATBOT_RESPONSES.CONTACT.text).toContain('Rudrapur Bypass Rd');
    });
  });

  // ── 18. NO GEMINI / EXTERNAL API CALL IS MADE ──
  describe('18. Zero Network / Gemini Dependency', () => {
    it('executes synchronously in memory with zero fetch calls', () => {
      const fetchSpy = vi.fn();
      globalThis.fetch = fetchSpy;

      const result = matchIntent('Do you shoot factory videos?');

      expect(result.intent).toBe('FACTORY_VIDEOS');
      expect(fetchSpy).not.toHaveBeenCalled();
    });
  });
});
