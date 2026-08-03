module.exports = class {
  data() {
    return {
      permalink: "sitemap.xml",
      eleventyExcludeFromCollections: true
    };
  }
  render(data) {
    // Sitemap URLs must be absolute. Override with SITE_URL env var if needed.
    const SITE_URL = process.env.SITE_URL || "https://linkszane.fun";
    const videos = data.videos || [];
    const tags = data.tags || [];
    const slugify = (str) => (str || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const fallbackThumb = (src) => {
      if (!src) return null;
      let m = src.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]+)/);
      if (m) return `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`;
      m = src.match(/player\.vimeo\.com\/video\/(\d+)/);
      if (m) return `https://vumbnail.com/${m[1]}.jpg`;
      m = src.match(/customer-([a-z0-9]+)\.cloudflarestream\.com\/([a-zA-Z0-9]+)/i);
      if (m) return `https://customer-${m[1]}.cloudflarestream.com/${m[2]}/thumbnails/thumbnail.jpg`;
      if (/res\.cloudinary\.com\/.+\/video\/upload\//i.test(src)) {
        return src.replace("/video/upload/", "/video/upload/so_0/").replace(/\.[a-zA-Z0-9]+$/, ".jpg");
      }
      return null;
    };
    const escXml = (str) => (str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';
    xml += `  <url>\n    <loc>${SITE_URL}/</loc>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;
    videos.forEach(v => {
      const thumb = v.thumbnail_url || fallbackThumb(v.src);
      xml += `  <url>\n    <loc>${SITE_URL}/watch/${v.id}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n`;
      if (thumb) {
        xml += `    <image:image>\n      <image:loc>${escXml(thumb)}</image:loc>\n      <image:title>${escXml(v.title || "Untitled")}</image:title>\n    </image:image>\n`;
      }
      xml += `  </url>\n`;
    });
    tags.forEach(t => {
      xml += `  <url>\n    <loc>${SITE_URL}/tag/${slugify(t)}/</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.5</priority>\n  </url>\n`;
    });
    xml += '</urlset>';
    return xml;
  }
};
