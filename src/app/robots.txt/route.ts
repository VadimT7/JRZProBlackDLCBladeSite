export function GET() {
  const baseUrl = process.env.BASE_URL || 'https://jrzpro.ru';
  
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin/api routes
Disallow: /api/
Disallow: /admin/
`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
