import React from 'react';
import { SITE_CONFIG, getCanonicalUrl } from '@/lib/siteConfig';

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Renders an inline JSON-LD script tag with sanitized schema data.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * Returns the confirmed ProfessionalService / LocalBusiness Schema for SPAN Studio.
 * Complies with schema.org standards without fabricating ratings, reviews, or unverified claims.
 */
export function getStudioBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${getCanonicalUrl()}/#business`,
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: getCanonicalUrl(),
    telephone: SITE_CONFIG.contact.telephone,
    email: SITE_CONFIG.contact.email,
    hasMap: SITE_CONFIG.contact.mapsUrl,
    description: SITE_CONFIG.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.contact.address.streetAddress,
      addressLocality: SITE_CONFIG.contact.address.addressLocality,
      addressRegion: SITE_CONFIG.contact.address.addressRegion,
      postalCode: SITE_CONFIG.contact.address.postalCode,
      addressCountry: SITE_CONFIG.contact.address.addressCountry,
    },
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.founder,
    },
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      value: SITE_CONFIG.teamSize,
    },
    areaServed: [
      { '@type': 'City', name: 'Rudrapur' },
      { '@type': 'AdministrativeArea', name: 'Pantnagar' },
      { '@type': 'AdministrativeArea', name: 'SIDCUL' },
      { '@type': 'AdministrativeArea', name: 'Uttarakhand' },
      { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
      { '@type': 'Country', name: 'India' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'SPAN Studio Production Disciplines',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Factory / Industrial Videos',
            description:
              'Full facility walkthroughs, operational process documentation, equipment showcases, safety films, and investor presentations.',
            url: getCanonicalUrl('/services#factory-video'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Product Videos',
            description:
              'Commercial product cinematography, precision lighting, and controlled studio motion for hardware and engineering brands.',
            url: getCanonicalUrl('/services#product-video'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Photography',
            description:
              'High-definition industrial facility architecture, product macro stills, and executive portraits.',
            url: getCanonicalUrl('/services#photography'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '3D Animation',
            description:
              'CAD-to-cinematic visualization, internal mechanism exploded views, and technical engineering animations.',
            url: getCanonicalUrl('/services#three-d'),
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Video Editing',
            description:
              'Precision cinema color grading, custom sound design, motion typography, and 4K Ultra HD master delivery.',
            url: getCanonicalUrl('/services#video-editing'),
          },
        },
      ],
    },
  };
}

/**
 * Returns Schema.org BreadcrumbList for navigation clarity.
 */
export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getCanonicalUrl(item.path),
    })),
  };
}
