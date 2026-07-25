module.exports = class {
  data() {
    return {
      permalink: "search-index.json",
      eleventyExcludeFromCollections: true
    };
  }
  render(data) {
    const items = (data.videos || []).map(v => ({
      id: v.id,
      title: v.title || "Untitled",
      type: v.type,
      src: v.src,
      thumbnail: v.thumbnail_url || null,
      tags: v.tags || "",
      views: v.views || 0
    }));
    return JSON.stringify(items);
  }
};
