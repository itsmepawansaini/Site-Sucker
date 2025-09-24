import axios from "axios";
import fs from "fs";
import path from "path";
import { URL } from "url";
import { load } from "cheerio";

const START_URL = "https://example.com/"; // put your site link here
const OUTPUT_DIR = path.resolve("./site");

const visitedPages = new Set();
const visitedAssets = new Set();

async function downloadFile(fileUrl, savePath) {
  try {
    const response = await axios.get(fileUrl, { responseType: "arraybuffer" });
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, response.data);
    console.log(`Downloaded: ${fileUrl}`);
  } catch (err) {
    console.warn(`Failed: ${fileUrl} — ${err.message}`);
  }
}

async function crawlPage(pageUrl, rootUrl) {
  if (visitedPages.has(pageUrl)) return;
  visitedPages.add(pageUrl);

  try {
    const { data } = await axios.get(pageUrl);
    const u = new URL(pageUrl);

    let filePath = u.pathname;
    if (filePath.endsWith("/")) filePath += "index.html";
    if (filePath === "") filePath = "/index.html";

    const savePath = path.join(OUTPUT_DIR, filePath);
    fs.mkdirSync(path.dirname(savePath), { recursive: true });
    fs.writeFileSync(savePath, data);
    console.log(`Saved page: ${pageUrl}`);

    const $ = load(data);
    const links = [];

    $("a[href], link[href], script[src], img[src], source[src]").each((_, el) => {
      const href = $(el).attr("href") || $(el).attr("src");
      if (!href) return;
      try {
        const abs = new URL(href, pageUrl).href;
        links.push(abs);
      } catch {}
    });

    for (const link of links) {
      const isSameDomain = link.startsWith(rootUrl);
      const isHtml = link.match(/\.(html?|php)?(\?.*)?$/i) || link.endsWith("/");

      if (isSameDomain && isHtml) {
        await crawlPage(link, rootUrl);
      } else if (/\.(png|jpe?g|gif|svg|css|js|webp|woff2?|ttf)$/i.test(link) && !visitedAssets.has(link)) {
        visitedAssets.add(link);
        const assetUrl = new URL(link);
        const assetPath = path.join(OUTPUT_DIR, assetUrl.pathname);
        await downloadFile(link, assetPath);
      }
    }
  } catch (err) {
    console.warn(`Skipping ${pageUrl} — ${err.message}`);
  }
}

(async () => {
  const root = new URL(START_URL).origin;
  console.log(`Starting Site Download: ${START_URL}`);
  await crawlPage(START_URL, root);
  console.log("\nDone!");
})();
