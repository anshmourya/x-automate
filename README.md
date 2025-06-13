# X-Automate

A Node.js + TypeScript Express server for posting and retrieving tweets using the Twitter API (v2) via `twitter-api-v2`.

## Features
- Post tweets programmatically
- Retrieve tweets from a user
- Written in TypeScript
- Uses Express.js

## Setup

1. **Clone the repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file in the project root:
     ```env
     PORT=3000
     TWITTER_API_KEY=your_api_key_here
     TWITTER_API_SECRET=your_api_secret_here
     TWITTER_ACCESS_TOKEN=your_access_token_here
     TWITTER_ACCESS_SECRET=your_access_secret_here
     ```
   - Get your credentials from the [Twitter Developer Portal](https://developer.twitter.com/).

4. **Run the server in development**
   ```bash
   npm run dev
   ```

5. **Build and run the server in production**
   ```bash
   npm run build
   npm start
   ```

## API Endpoints

### POST `/tweet`
Post a tweet.
- **Body:** `{ "text": "your tweet here" }`
- **Example:**
  ```bash
  curl -X POST http://localhost:3000/tweet -H "Content-Type: application/json" -d '{"text":"hi"}'
  ```

### GET `/tweets/:username`
Get recent tweets from a user.
- **Example:**
  ```bash
  curl http://localhost:3000/tweets/twitterdev
  ```

## Notes
- Ensure your Twitter app has **Read and Write** permissions and you have regenerated your access tokens after changing permissions.
- Do not commit your `.env` file or any sensitive credentials.

---

MIT License 