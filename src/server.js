import dotenv from 'dotenv';
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getAllContacts, getContactById } from './services/contacts.js';

dotenv.config();
const PORT = Number(process.env.PORT) || 3000;

export function setupServer() {
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

  app.get('/contacts', async (req, res, next) => {
    await getAllContacts()
      .then((contacts) => {
        res.send({
          status: 200,
          message: 'Successfully found contacts!',
          data: contacts,
        });
      })
      .catch((err) => {
        res.status(500).send('Internal Server Error');
        console.error(err);
      });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }

    res.send({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

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
