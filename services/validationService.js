export const validatePersonData = ({ name, lastName, nationality, year }) => {
  const errors = [];

  if (!name || typeof name !== 'string' || name.length === 0) {
    errors.push('Nombre inválido');
  }
  if (!lastName || typeof lastName !== 'string' || lastName.length === 0) {
    errors.push('Apellido inválido');
  }
  if (
    !nationality ||
    typeof nationality !== 'string' ||
    nationality.length === 0
  ) {
    errors.push('Nacionalidad inválida');
  }
  if (
    !year ||
    typeof year !== 'number' ||
    year < 1900 ||
    year > new Date().getFullYear()
  ) {
    errors.push('Año inválido');
  }

  return errors;
};

export const validatePersonId = (id) => {
  const errors = [];
  if (!id || isNaN(Number(id))) {
    errors.push('ID inválido');
  }
  return errors;
};

export const validateJobData = (jobs) => {
  const errors = [];

  if (!Array.isArray(jobs)) {
    errors.push('Trabajos deben ser un array');
    return errors;
  }

  jobs.forEach((job, index) => {
    const { company, initContract, finishContract, position } = job;

    if (!company || typeof company !== 'string' || company.length === 0) {
      errors.push(`Trabajo ${index + 1}: Compañía inválida`);
    }
    if (!initContract || isNaN(new Date(initContract).getTime())) {
      errors.push(`Trabajo ${index + 1}: Fecha de inicio inválida`);
    }
    if (finishContract && isNaN(new Date(finishContract).getTime())) {
      errors.push(`Trabajo ${index + 1}: Fecha de fin inválida`);
    }
    if (
      initContract &&
      finishContract &&
      new Date(initContract) > new Date(finishContract)
    ) {
      errors.push(
        `Trabajo ${index + 1}: La fecha de fin debe ser posterior a la fecha de inicio`
      );
    }
    if (!position || typeof position !== 'string' || position.length === 0) {
      errors.push(`Trabajo ${index + 1}: Posición inválida`);
    }
  });

  return errors;
};
