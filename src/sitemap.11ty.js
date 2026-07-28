module.exports = class {
  data() {
    return {
      permalink: "sitemap.xml",
      eleventyExcludeFromCollections: true
    };
  }
  render(data) {
    const videos = data.videos || [];
    const tags = data.tags || [];
    const slugify = (str) => (str || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    xml += '  <url>\n    <loc>https://linkszane.fun/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n';
    videos.forEach(v => {
      xml += `  <url>\n    <loc>https://linkszane.fun/watch/${v.id}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });
    tags.forEach(t => {
      xml += `  <url>\n    <loc>https://linkszane.fun/tag/${slugify(t)}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
    });
    xml += '</urlset>';
    return xml;
  }
};
