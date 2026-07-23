require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addFilter("tagList", (tags) => {
    return (tags || "").split(",").map((t) => t.trim()).filter(Boolean);
  });

  eleventyConfig.addFilter("slugify", (str) => {
    return (str || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  });

  eleventyConfig.addFilter("hoursAgo", (isoString) => {
    if (!isoString) return Infinity;
    return (Date.now() - new Date(isoString).getTime()) / (1000 * 60 * 60);
  });

  eleventyConfig.addFilter("shuffle", (arr) => {
    const a = (arr || []).slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  });

  eleventyConfig.addFilter("relatedTo", (allVideos, current, limit) => {
    limit = limit || 10;
    const myTags = (current.tags || "").toLowerCase().split(",").map(t => t.trim()).filter(Boolean);
    const others = (allVideos || []).filter(v => v.id !== current.id);
    let related = others.filter(v => {
      if (myTags.length === 0) return false;
      const vTags = (v.tags || "").toLowerCase().split(",").map(t => t.trim());
      return vTags.some(t => myTags.includes(t));
    });
    if (related.length < limit) {
      const remaining = others.filter(v => !related.includes(v));
      for (let i = remaining.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
      }
      related = related.concat(remaining);
    }
    return related.slice(0, limit);
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" }
  };
};
