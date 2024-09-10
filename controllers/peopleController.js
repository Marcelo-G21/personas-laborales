import * as peopleService from '../services/peopleService.js';

export const getPeople = async (req, res) => {
  try {
    const people = await peopleService.getPeople();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las personas' });
  }
};

export const getPersonById = async (req, res) => {
  const { id } = req.params;

  try {
    const person = await peopleService.getPersonById(id);
    res.status(200).json(person);
  } catch (error) {
    if (error.message === 'Persona no encontrada') {
      res.status(404).json({ error: 'Persona no encontrada' });
    } else {
      res.status(500).json({ error: 'Error al obtener a la persona' });
    }
  }
};

export const createPerson = async (req, res) => {
  try {
    const personData = req.body;
    await peopleService.createPerson(personData);
    res.status(201).json({ message: 'Persona creada correctamente' });
  } catch (error) {
    if (error.message === 'Faltan campos obligatorios') {
      res.status(400).json({ error: 'Faltan campos obligatorios' });
    } else {
      res
        .status(500)
        .json({ error: 'Error al crear la persona y sus trabajos' });
    }
  }
};

export const updatePerson = async (req, res) => {
  const { id } = req.params;
  const personData = req.body;

  try {
    await peopleService.updatePerson(id, personData);
    res.status(200).json({ message: 'Persona actualizada correctamente' });
  } catch (error) {
    if (error.message === 'Persona no encontrada') {
      res.status(404).json({ error: 'Persona no encontrada' });
    } else {
      res
        .status(500)
        .json({ error: 'Error al actualizar la persona y sus trabajos' });
    }
  }
};

export const deletePerson = async (req, res) => {
  const { id } = req.params;

  try {
    await peopleService.deletePerson(id);
    res
      .status(204)
      .json({ message: 'Persona y trabajos eliminados correctamente' });
  } catch (error) {
    if (error.message === 'Persona no encontrada') {
      res.status(404).json({ error: 'Persona no encontrada' });
    } else {
      res
        .status(500)
        .json({ error: 'Error al eliminar la persona y sus trabajos' });
    }
  }
};
