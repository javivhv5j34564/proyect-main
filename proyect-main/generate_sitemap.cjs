const fs = require('fs');
const path = require('path');

// Leer data.js
const dataPath = path.join(__dirname, 'src', 'data.js');
const dataContent = fs.readFileSync(dataPath, 'utf8');

// Extraer todos los IDs de herramientas
const toolIds = [...dataContent.matchAll(/id:\s*'([^']*)'/g)].map(m => m[1]);

// Separar herramientas de blogs (blogs empiezan con 'blog-')
const blogIds = toolIds.filter(id => id.startsWith('blog-'));
const realToolIds = toolIds.filter(id => !id.startsWith('blog-'));

const baseUrl = 'https://yourdomain.com'; // Cambiar por el dominio real si se conoce
const date = new Date().toISOString().split('T')[0];

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${date}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/submit-tool</loc>
    <lastmod>${date}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${date}</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${date}</lastmod>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/cookies</loc>
    <lastmod>${date}</lastmod>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/legal-notice</loc>
    <lastmod>${date}</lastmod>
    <priority>0.3</priority>
  </url>
`;

// Añadir Blog Posts
blogIds.forEach(id => {
    sitemap += `  <url>
    <loc>${baseUrl}/blog/${id}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.7</priority>
  </url>\n`;
});

// Añadir Herramientas
realToolIds.forEach(id => {
    sitemap += `  <url>
    <loc>${baseUrl}/tool/${id}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.6</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generado con ' + (blogIds.length + realToolIds.length + 7) + ' URLs.');
