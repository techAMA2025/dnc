import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/leads', '/authority', '/api/'],
    },
    sitemap: 'https://designncode.com/sitemap.xml',
  };
}
