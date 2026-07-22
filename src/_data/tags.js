// Reuses the same fetch logic as videos.js to get the full video list,
// then reduces it down to a deduplicated list of every tag in use.
// Tags are deduplicated on their lowercase form, since tag pages use a
// lowercase URL slug — "MILF" and "milf" would otherwise both try to
// create the exact same page and break the build.

const getVideos = require("./videos.js");

module.exports = async function () {
  const videos = await getVideos();
  const seen = new Map(); // lowercase key -> original-cased tag to display

  videos.forEach((v) => {
    (v.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .forEach((t) => {
        const key = t.toLowerCase();
        if (!seen.has(key)) seen.set(key, t);
      });
  });

  return Array.from(seen.values()).sort();
};
