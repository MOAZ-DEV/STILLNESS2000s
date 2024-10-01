import express from 'express';
import { useGemini } from './hooks/useGemini';
import { usePollinations } from './hooks/usePollinations';
import { useInstagram } from './hooks/useInstagram';
import { accessToken, userId, prompt, caption } from './shared';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Cron job started at: ' + new Date().toISOString());
  res.status(200).write('Cron job started at: ' + new Date().toISOString());
  Post().catch((err) => {
    res.status(400).emit('Error occurred during cron job:' + err + ' at: ' + new Date().toISOString())
  });
})
export default function GET(request?: Request) {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      Post();
    }, 200);
  }
};

const Post = async () => {
  try {
    const geminiImagePrompt = await useGemini({ prompt: prompt });
    const geminiCaption = await useGemini({ prompt: caption });
    const pollinationsResult = await usePollinations(geminiImagePrompt.result, 3000, 3000, 'turbo', 24);
    await useInstagram(accessToken, userId, pollinationsResult.res, geminiCaption.result)
      .catch(err => {
        Post();
      });
  } catch (error) {
    console.clear();
    console.error('Error occurred during cron job:', error);
    GET();
  }
}
app.listen(port, () => {
  console.clear();
  console.log(`Server is running on port ${port}`);
});
