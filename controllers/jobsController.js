import { Job } from '../models/Job.js';
import { Person } from '../models/Person.js';
import { removeJob } from '../services/jobsService.js';
import { validateJobData } from '../services/validationService.js';
import * as cacheService from '../services/cacheService.js';

export const addJob = async (req, res) => {
  const { personId } = req.params;
  const jobData = req.body;

  try {
    const person = await Person.findByPk(personId);
    if (!person) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }

    const validationErrors = validateJobData([jobData]);
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors.join(', ') });
    }

    const job = await Job.create({ ...jobData, personId });
    res
      .status(201)
      .json({ message: 'Trabajo agregado correctamente', data: job });

    await cacheService.updatePersonJobsInCache(personId);
  } catch (error) {
    console.error('Error al agregar el trabajo:', error);
    res.status(500).json({ error: 'Error al agregar el trabajo' });
  }
};

export const deleteJob = async (req, res) => {
  const { personId, jobId } = req.params;

  const result = await removeJob(personId, jobId);

  if (!result.success) {
    return res.status(404).json({ error: result.error });
  }

  return res.status(200).json({ message: result.message });
};
