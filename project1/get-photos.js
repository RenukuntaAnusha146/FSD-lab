// Downloads real photos from Wikimedia Commons into both photo folders.
// Run from this folder:  node get-photos.js   (needs internet + Node 18 or newer)
const fs = require("fs");
const path = require("path");

const QUERIES = {
  "yellow-leaves": "chlorosis yellow leaves plant",
  "brown-leaf-tips": "brown leaf tips plant",
  "wilting": "wilted plant drooping leaves",
  "root-rot": "root rot plant roots",
  "underwatering": "underwatered plant dried leaves",
  "overwatering": "overwatered plant yellow leaves",
  "waterlogged-soil": "waterlogged soil flooded pot",
  "dry-compacted-soil": "dry cracked soil",
};
const FOLDERS = ["client/public/problems", "demo/photos"];
const UA = { "User-Agent": "PlantCareTracker/1.0 (student project)" };

async function find(q) {
  const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({
    action: "query", generator: "search", gsrsearch: q, gsrnamespace: "6",
    gsrlimit: "10", prop: "imageinfo", iiprop: "url|mime", iiurlwidth: "800", format: "json",
  });
  const j = await (await fetch(url, { headers: UA })).json();
  const pages = Object.values(j.query?.pages || {}).sort((a, b) => a.index - b.index);
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (ii && ii.mime === "image/jpeg") return { url: ii.thumburl || ii.url, title: p.title };
  }
}

(async () => {
  let credits = "Photos from Wikimedia Commons (check each file page for its licence/author):\n";
  for (const [slug, q] of Object.entries(QUERIES)) {
    try {
      const hit = await find(q);
      if (!hit) { console.log("No photo found for", slug); continue; }
      const buf = Buffer.from(await (await fetch(hit.url, { headers: UA })).arrayBuffer());
      for (const f of FOLDERS) { fs.mkdirSync(f, { recursive: true }); fs.writeFileSync(path.join(f, slug + ".jpg"), buf); }
      credits += `${slug}.jpg  <-  ${hit.title}\n`;
      console.log("OK  ", slug, "<-", hit.title);
    } catch (e) { console.log("FAILED", slug, e.message); }
  }
  fs.writeFileSync("PHOTO-CREDITS.txt", credits);
  console.log("\nDone. Open the photos and replace any that look wrong with your own (same file name).");
})();
