import type { NextApiRequest, NextApiResponse } from 'next'
import {
    Configuration,
    OpenAIApi
} from 'openai';

export type Data = {
  text: string
}

const API_KEY = process.env.API_KEY

const configuration = new Configuration({
    apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateResponse = async (tweet: string, user: string) => openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 200,
        temperature: 0.6,
        prompt: `Genera un tuit de respuesta asertiva y respetuosa para este tuit: '${tweet}' y destinado a este usuario: '@${user}'`,
    });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweet = req.query['tweet'] as string;
  const user = req.query['user'] as string;

  const response = await generateResponse(tweet, user);
  const text = response.data.choices[0].text ?? 'neutral';
  res.status(200).json({ text })
}