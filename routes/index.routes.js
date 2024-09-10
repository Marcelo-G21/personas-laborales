import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages', 'index.html'));
});

export default router;
