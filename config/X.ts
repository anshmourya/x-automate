import { Scraper } from "@the-convocation/twitter-scraper";
import fs from "fs";

const scraper = new Scraper();
scraper.setCookies(JSON.parse(fs.readFileSync("cookies.json", "utf-8")));

export async function saveCookies() {
  await scraper.login(
    process.env.TWITTER_USERNAME!,
    process.env.TWITTER_PASSWORD!
  );

  const profile = await scraper.getCookies();
  fs.writeFileSync("cookies.json", JSON.stringify(profile));
}

export default scraper;
