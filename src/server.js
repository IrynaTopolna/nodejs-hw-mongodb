import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export function setupServer() {
  const app = express();

  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    ),
  );

  app.use('/uploads', express.static(UPLOAD_DIR));

  app.use(authRouter);
  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
