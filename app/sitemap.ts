import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://designncode.com';
  
  const routes = [
    '',
    '/about',
    '/services',
    '/ourwork',
    '/blogs',
    '/contact',
    '/privacy-policy',
    '/terms-and-conditions',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' || route === '/blogs' ? 'weekly' as const : 'monthly' as const,
    priority: route === '' ? 1.0 : route === '/services' || route === '/ourwork' ? 0.8 : 0.5,
  }));
}
