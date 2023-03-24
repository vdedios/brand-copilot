import type { NextApiRequest, NextApiResponse } from 'next'
import {
    Configuration,
    OpenAIApi
} from 'openai';

export type Data = {
  sentiment: string
}

const API_KEY = process.env.API_KEY

const configuration = new Configuration({
    apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const analysisSentiment = async (tweet: string) => openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    prompt: `sentiment analysis of the following text using positive, negative or neutral as value: '${tweet}'`,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweet = req.query['tweet'] as string;

  const response = await analysisSentiment(tweet);
  const sentiment = response.data.choices[0].text ?? 'neutral';
  res.status(200).json({ sentiment })
}