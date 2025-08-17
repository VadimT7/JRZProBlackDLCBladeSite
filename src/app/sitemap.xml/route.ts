import { locales } from '@/i18n';

export function GET() {
  const baseUrl = process.env.BASE_URL || 'https://jrzpro.ru';
  
  const pages = [
    '',
    '/technology',
    '/player-vs-goalie',
    '/sizing',
    '/sharpening',
    '/reviews',
    '/warranty',
    '/contact',
    '/shop',
    '/legal',
    '/legal/payment',
    '/legal/delivery',
    '/legal/privacy',
  ];

  const urls = locales.flatMap(locale =>
    pages.map(page => ({
      loc: `${baseUrl}/${locale}${page}`,
      lastmod: new Date().toISOString(),
      changefreq: page === '' ? 'daily' : 'weekly',
      priority: page === '' ? 1.0 : page === '/shop' ? 0.9 : 0.8,
    }))
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
