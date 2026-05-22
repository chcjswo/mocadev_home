/** XSS 방지를 위한 JSON-LD 직렬화 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function organizationSchema(params: {
  siteUrl: string;
  name: string;
  description: string;
  logoUrl: string;
  sameAs?: string[];
  email?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${params.siteUrl}/#organization`,
    name: params.name,
    url: params.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: params.logoUrl,
      width: 200,
      height: 200,
    },
    description: params.description,
    sameAs: params.sameAs ?? ['https://github.com/mocadev'],
    ...(params.email
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            email: params.email,
          },
        }
      : {}),
  };
}

export function websiteSchema(params: {
  siteUrl: string;
  localeUrl: string;
  name: string;
  description: string;
  locale: string;
  publisherId: string;
  inLanguage: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${params.siteUrl}/#website`,
    name: params.name,
    url: params.localeUrl,
    description: params.description,
    inLanguage: params.inLanguage,
    publisher: { '@id': params.publisherId },
  };
}

export function itemListSchema(params: {
  name: string;
  items: Array<{ name: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: params.name,
    numberOfItems: params.items.length,
    itemListElement: params.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

export function aboutPageSchema(params: {
  siteUrl: string;
  locale: string;
  name: string;
  description: string;
  members: Array<{ name: string; description: string; image?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: params.name,
    description: params.description,
    url: `${params.siteUrl}/${params.locale}/team`,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${params.siteUrl}/#organization`,
      member: params.members.map((member) => ({
        '@type': 'Person',
        name: member.name,
        description: member.description,
        ...(member.image ? { image: member.image } : {}),
      })),
    },
  };
}
