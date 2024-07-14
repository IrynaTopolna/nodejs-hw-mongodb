import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

async function bootstrap() {
  await initMongoConnection()
    .then(() => {
      setupServer();
    })
    .catch((err) => console.error(err));
}

bootstrap();
