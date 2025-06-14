import express, { Request, Response } from "express";
import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";
import { Scraper } from "@the-convocation/twitter-scraper";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Twitter client initialization
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_SECRET!,
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Twitter API Server" });
});

// Example route to post a tweet
app.post("/tweet", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const tweet = await twitterClient.v2.tweet(text);
    res.json({ success: true, tweet });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error });
  }
});

// Example route to get user tweets
app.get("/tweets/:username", async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const user = await twitterClient.v2.userByUsername(username);
    const tweets = await twitterClient.v2.userTimeline(user.data.id);
    res.json({ success: true, tweets: tweets.data.data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//comment route
app.post("/comment", async (req: Request, res: Response) => {
  try {
    const { text, tweetId } = req.body;
    const comment = await twitterClient.v2.reply(tweetId, text);
    res.json({ success: true, comment });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});
const scraper = new Scraper({});

async function fetchProfile() {
  await scraper.login(
    process.env.TWITTER_USERNAME!,
    process.env.TWITTER_PASSWORD!
  );
  const profile = await scraper.getCookies();
  console.log(profile);
}

fetchProfile();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
