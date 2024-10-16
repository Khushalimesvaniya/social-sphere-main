// pages/api/generate.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai-edge';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { prompt } = req.body;

    console.log('Received prompt:', prompt); // Debug log

    try {
      const response = await openai.createCompletion({
        model: 'gpt-4',
        prompt,
        max_tokens: 150,
      });

      const completion = await response.json(); // Parse the JSON response

      console.log('API response:', completion); // Debug log

      if (completion.choices && completion.choices.length > 0) {
        res.status(200).json({ content: completion.choices[0].text.trim() });
      } else {
        console.error('No choices in completion:', completion);
        res.status(500).json({ error: 'Failed to generate content' });
      }
    } catch (error) {
      console.error('Error generating content:', error); // Debug log
      res.status(500).json({ error: 'Failed to generate content' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
