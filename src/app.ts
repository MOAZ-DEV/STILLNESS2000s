import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

import { useGemini } from './hooks/useGemini';
import { usePollinations } from './hooks/usePollinations';
import { useInstagram } from './hooks/useInstagram';
import { accessToken, userId, prompt, caption } from './shared';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const Post = async () => {
  try {
    const geminiImagePrompt = await useGemini({ prompt: prompt });
    const geminiCaption = await useGemini({ prompt: caption });
    const pollinationsResult = await usePollinations(geminiImagePrompt.result, 3000, 3000, 'turbo', 24);
    await useInstagram(accessToken, userId, pollinationsResult.res, geminiCaption.result)
      .catch((error) => {
        console.error('Error occurred during Instagram posting:', error);
      });
  } catch (error) {
    console.clear();
    console.error('Error occurred during cron job:', error);
  }
};

app.get<{}, MessageResponse>('/', (req, res) => {
  const time = new Date().toISOString();
  Post().catch((err) => {
    res.status(400).emit('Error occurred during cron job:' + err + ' at: ' + time);
  });
  res.json({
    message: 'Process started at: ' + new Date().toISOString,
  });
});



app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
