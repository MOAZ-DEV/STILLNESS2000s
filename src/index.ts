import express from 'express';
import { useGemini } from './hooks/useGemini';
import { usePollinations } from './hooks/usePollinations';
import { useInstagram } from './hooks/useInstagram';
import { accessToken, userId, prompt, caption } from './shared';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  console.log('Cron job started at:', new Date().toISOString());
  try {
    const geminiImagePrompt = await useGemini({ prompt: prompt });
    const geminiCaption = await useGemini({ prompt: caption });
    const pollinationsResult = await usePollinations(geminiImagePrompt.result, 3000, 3000, 'turbo', 24);
    await useInstagram(accessToken, userId, pollinationsResult.res, geminiCaption.result);
  } catch (error) {
    console.error('Error occurred during cron job:', error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
