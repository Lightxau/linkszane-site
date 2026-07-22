// Reuses the same fetch logic as videos.js to get the full video list,
// then reduces it down to a deduplicated list of every tag in use.
// (This does mean a second Supabase query at build time — fine for a site
// this size; if the catalog gets huge, cache the first result instead.)

const getVideos = require("./videos.js");

module.exports = async function () {
  const videos = await getVideos();
  const seen = new Set();

  videos.forEach((v) => {
    (v.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => seen.add(t));
  });

  return Array.from(seen).sort();
};
