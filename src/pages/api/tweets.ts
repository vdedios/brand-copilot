// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Twitter from 'twitter';

export type UserTweet = {
  user: string,
  tweet: string,
  avatar: string,
  tweetUrl: string,
  followers: number,
  retweets: number,
  favorites: number
}

export type Data = {
  response: UserTweet[]
}

const CONSUMER_KEY = process.env.CONSUMER_KEY ?? ''
const CONSUMER_SECRET = process.env.CONSUMER_SECRET ?? ''
const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY ?? ''
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? ''

const client = new Twitter({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token_key: ACCESS_TOKEN_KEY,
    access_token_secret: ACCESS_TOKEN_SECRET,
});

const mapResponse = (res: any): UserTweet[] => {
   return res.statuses.map((entry: any) => ({
    user: entry.user.screen_name,
    avatar: entry.user.profile_image_url,
    tweet: entry.full_text,
    tweetUrl: entry.entities?.urls[0]?.url,
    followers: entry.user.followers_count,
    retweets: entry.retweet_count,
    favorites: entry.favorite_count
  }));
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  client.get(
      "search/tweets",
      {
        q: "to:movistar_es",
        tweet_mode:"extended",
        count: "5"
      },
      function(error, tweets, response) {
        const mappedResponse = mapResponse(tweets);
        res.status(200).json({ response: mapResponse(tweets) })
      }
  );
}
