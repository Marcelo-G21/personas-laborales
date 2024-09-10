import {
  validateJobData,
  validatePersonData,
  validatePersonId,
} from '../services/validationService.js';

export const validatePersonDataMiddleware = (req, res, next) => {
  const { name, lastName, nationality, year, jobs } = req.body;

  const personErrors = validatePersonData({
    name,
    lastName,
    nationality,
    year,
  });

  const jobErrors = jobs ? validateJobData(jobs) : [];

  if (personErrors.length > 0 || jobErrors.length > 0) {
    return res.status(400).json({ errors: [...personErrors, ...jobErrors] });
  }

  next();
};

export const validatePersonIdMiddleware = (req, res, next) => {
  const { id } = req.params;
  const errors = validatePersonId(id);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export const validateJob = (req, res, next) => {
  const jobData = req.body;
  const errors = validateJobData([jobData]);

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};
