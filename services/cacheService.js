// Asegúrate de tener la configuración de Redis
import { Job } from '../models/Job.js';
import { redisClient } from '../config/redisConfig.js';

const jobsCachePrefix = 'personJobs:';
const personCachePrefix = 'person:';
const peopleCacheKey = 'people';

export const getPeopleFromCache = async () => {
  const cachedPeople = await redisClient.get(peopleCacheKey);
  return cachedPeople ? JSON.parse(cachedPeople) : null;
};

export const setPeopleInCache = async (people) => {
  await redisClient.setEx(peopleCacheKey, 60, JSON.stringify(people));
};

export const getPersonFromCache = async (personId) => {
  const cacheKey = `${personCachePrefix}${personId}`;
  const cachedPerson = await redisClient.get(cacheKey);
  return cachedPerson ? JSON.parse(cachedPerson) : null;
};

export const setPersonInCache = async (personId, person) => {
  const cacheKey = `${personCachePrefix}${personId}`;
  await redisClient.setEx(cacheKey, 60, JSON.stringify(person));
};

export const deletePersonFromCache = async (personId) => {
  await redisClient.del(`${personCachePrefix}${personId}`);
};

export const deletePeopleFromCache = async () => {
  await redisClient.del(peopleCacheKey);
};

export const getPersonJobsFromCache = async (personId) => {
  const cacheKey = `${jobsCachePrefix}${personId}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }
  return null;
};

export const setPersonJobsInCache = async (personId, jobs) => {
  const cacheKey = `${jobsCachePrefix}${personId}`;
  await redisClient.set(cacheKey, JSON.stringify(jobs), 'EX', 3600);
};

export const updatePersonJobsInCache = async (personId) => {
  const jobs = await Job.findAll({ where: { personId } });
  await setPersonJobsInCache(personId, jobs);
};

export const deletePersonJobsFromCache = async (personId) => {
  const cacheKey = `${jobsCachePrefix}${personId}`;
  await redisClient.del(cacheKey);
};
