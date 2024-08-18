import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import contactsRouter from './routers/contacts.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  }));

  app.use(cors());

  app.use(pino({
    transport: {
      target: 'pino-pretty',
    },
  }));

  // Додаємо роутер для контактів
  app.use(contactsRouter);

  // Обробник для неіснуючих маршрутів
  app.use(notFoundHandler);

  // Глобальний обробник помилок
  app.use(errorHandler);

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
