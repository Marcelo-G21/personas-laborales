import express from 'express';
import indexRoutes from './routes/index.routes.js';
import peopleRoutes from './routes/people.routes.js';
import { connectRedis } from './config/redisConfig.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

connectRedis();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'src')));

app.use('/', indexRoutes);
app.use(peopleRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '/src/pages', '404.html'));
});

export default app;
