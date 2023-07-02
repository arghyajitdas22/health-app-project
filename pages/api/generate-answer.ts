import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type ResponseData = {
  text: string | undefined;
};

interface GenerateNextApiRequest extends NextApiRequest {
  body: {
    prompt: string;
  };
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: GenerateNextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const prompt = req.body.prompt;

  if (!prompt || prompt == "") {
    return new Response("Send prompt data", { status: 400 });
  }

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${prompt}`,
      },
      {
        role: "user",
        content: "the answer should be of one word",
      },
    ],
  });

  const responseText = completion.data.choices[0].message?.content;
  res.status(200).json({ text: responseText });
}
