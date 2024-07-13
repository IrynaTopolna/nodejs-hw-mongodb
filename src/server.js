import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

// const PORT = 3000;
dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

export function setupServer() {
  console.log({ PORT });
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    ),
  );

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
