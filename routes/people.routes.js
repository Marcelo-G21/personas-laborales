import { Router } from 'express';
import {
  createPerson,
  deletePerson,
  getPeople,
  getPersonById,
  updatePerson,
} from '../controllers/peopleController.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import {
  validateJob,
  validatePersonDataMiddleware,
  validatePersonIdMiddleware,
} from '../middlewares/validationMiddleware.js';
import { addJob, deleteJob } from '../controllers/jobsController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get('/people', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages', 'peopleList.html'));
});

router.get('/addPeople', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages', 'addPeople.html'));
});

router.get('/updatePerson', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages', 'updatePerson.html'));
});

router.get('/personInfo', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages', 'personInfo.html'));
});

router.get('/deletePerson', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/pages', 'deletePerson.html'));
});

router.get('/api/people', getPeople);
router.post('/api/people', validatePersonDataMiddleware, createPerson);
router.put('/api/people/:id', validatePersonIdMiddleware, updatePerson);
router.delete('/api/people/:id', validatePersonIdMiddleware, deletePerson);
router.get('/api/people/:id', validatePersonIdMiddleware, getPersonById);

router.post('/api/people/:personId/jobs', validateJob, addJob);
router.delete('/api/people/:personId/jobs/:jobId', deleteJob);

export default router;
