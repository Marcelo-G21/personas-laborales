// middlewares/jobsMiddleware.js
import { Person } from '../models/Person.js';
import { Job } from '../models/Job.js';

export const validatePerson = async (req, res, next) => {
  const { personId } = req.params;
  try {
    const person = await Person.findByPk(personId);
    if (!person) {
      return res.status(404).json({ error: 'Persona no encontrada' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al validar la persona' });
  }
};

export const validateJob = async (req, res, next) => {
  const { personId, jobId } = req.params;
  try {
    const job = await Job.findOne({ where: { id: jobId, personId } });
    if (!job) {
      return res.status(404).json({ error: 'Trabajo no encontrado' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al validar el trabajo' });
  }
};
