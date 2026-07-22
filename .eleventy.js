require("dotenv").config();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addFilter("tagList", (tags) => {
    return (tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  });

  eleventyConfig.addFilter("slugify", (str) => {
    return (str || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
};
