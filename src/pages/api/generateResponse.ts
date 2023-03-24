import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

export type Data = {
  text: string;
};

export type Mood = "asertiva" | "divertida" | "troll";

const API_KEY = process.env.API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateResponse = async (tweet: string, user: string, mood: Mood, language: string) =>
  openai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 300,
    temperature: 0.6,
    prompt: `Genera un tweet de respuesta ${mood} para este tweet: '${tweet}' en el idioma ${language} y que esté destinado a este usuario: '@${user}' y que tenga una extensión máxima de 300 caracteres`,
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const tweet = req.query["tweet"] as string;
  const user = req.query["user"] as string;
  const mood = req.query["mood"] as string;
  const language = req.query["language"] as string;

  const response = await generateResponse(tweet, user, mood as Mood, language);
  const text = response.data.choices[0].text ?? "neutral";
  res.status(200).json({ text });
}
