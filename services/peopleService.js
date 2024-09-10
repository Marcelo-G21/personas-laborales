import { Person } from '../models/Person.js';
import { Job } from '../models/Job.js';
import * as cacheService from '../services/cacheService.js';

export const getPeople = async () => {
  const cachedPeople = await cacheService.getPeopleFromCache();
  if (cachedPeople) {
    return cachedPeople;
  }

  const people = await Person.findAll({
    include: [{ model: Job, as: 'Jobs' }],
  });

  await cacheService.setPeopleInCache(people);
  return people;
};

export const getPersonById = async (id) => {
  const cachedPerson = await cacheService.getPersonFromCache(id);
  if (cachedPerson) {
    return cachedPerson;
  }

  const person = await Person.findByPk(id, { include: [Job] });
  if (!person) {
    throw new Error('Persona no encontrada');
  }

  await cacheService.setPersonInCache(id, person);
  return person;
};

export const createPerson = async (personData) => {
  try {
    const { name, lastName, nationality, year, jobs } = personData;

    if (!name || !lastName || !nationality || year === undefined) {
      throw new Error('Faltan campos obligatorios');
    }

    const person = await Person.create({
      name,
      lastName,
      nationality,
      year,
    });

    if (Array.isArray(jobs) && jobs.length > 0) {
      const validJobs = jobs.map((job) => ({
        ...job,
        personId: person.id,
        finishContract: job.finishContract ? job.finishContract : null,
      }));

      await Job.bulkCreate(validJobs);
    }

    await cacheService.deletePeopleFromCache();
  } catch (error) {
    console.error('Error al crear la persona y sus trabajos:', error);
    throw new Error('Error al crear la persona y sus trabajos');
  }
};

export const updatePerson = async (id, personData) => {
  try {
    const { name, lastName, nationality, year, jobs } = personData;

    const person = await Person.findByPk(id);
    if (!person) {
      throw new Error('Persona no encontrada');
    }

    await person.update({ name, lastName, nationality, year });

    if (Array.isArray(jobs)) {
      await Job.destroy({ where: { personId: id } });

      const validJobs = jobs.map((job) => ({
        ...job,
        personId: id,
        finishContract: job.finishContract ? job.finishContract : null,
      }));

      await Job.bulkCreate(validJobs);
    }

    await cacheService.deletePeopleFromCache();
  } catch (error) {
    console.error('Error al actualizar la persona y sus trabajos:', error);
    throw new Error('Error al actualizar la persona y sus trabajos');
  }
};

export const deletePerson = async (id) => {
  const person = await Person.findByPk(id);
  if (!person) {
    throw new Error('Persona no encontrada');
  }

  await person.destroy();

  await cacheService.deletePersonFromCache(id);
  await cacheService.deletePeopleFromCache();
};
