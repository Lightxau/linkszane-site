// This file runs once, at BUILD time (not in the browser). Eleventy calls it
// automatically before generating any pages, because it lives in _data.
// Every template on the site can then use the `videos` variable directly.

const { createClient } = require("@supabase/supabase-js");

module.exports = async function () {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const TABLE = "linkszane_videos";

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn(
      "[videos.js] SUPABASE_URL / SUPABASE_ANON_KEY are not set — building with 0 videos. " +
      "Set them as environment variables (locally in a .env file, or in Netlify's site settings)."
    );
    return [];
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[videos.js] Failed to fetch videos from Supabase:", error.message);
    return [];
  }

  return data || [];
};
