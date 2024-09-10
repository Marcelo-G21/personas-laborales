import { Job } from '../models/Job.js';
import { Person } from '../models/Person.js';
import * as cacheService from '../services/cacheService.js';
import { validateJobData } from '../services/validationService.js';

export const addJob = async (personId, jobData) => {
  const errors = validateJobData([jobData]);
  if (errors.length) {
    return { success: false, errors };
  }

  try {
    const job = await Job.create({ ...jobData, personId });

    const cacheKey = `person:${personId}:jobs`;
    await cacheService.setPersonJobsInCache(cacheKey);

    return { success: true, data: job };
  } catch (error) {
    return { success: false, error: 'Error al agregar el trabajo' };
  }
};

export const removeJob = async (personId, jobId) => {
  try {
    const person = await Person.findByPk(personId);
    if (!person) {
      return { success: false, error: 'Persona no encontrada' };
    }

    const job = await Job.findOne({ where: { id: jobId, personId } });
    if (!job) {
      return { success: false, error: 'Trabajo no encontrado' };
    }

    await job.destroy();

    const cacheKey = `person:${personId}:jobs`;
    await cacheService.deletePersonJobsFromCache(cacheKey);

    return { success: true, message: 'Trabajo eliminado correctamente' };
  } catch (error) {
    return { success: false, error: 'Error al eliminar el trabajo' };
  }
};
