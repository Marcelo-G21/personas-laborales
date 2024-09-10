document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const searchIdInput = document.getElementById('searchId');
  const form = document.getElementById('updatePersonForm');
  const jobsContainer = document.getElementById('jobsContainer');

  async function loadPersonData(personId) {
    try {
      const response = await fetch(`/api/people/${personId}`);
      if (!response.ok) {
        throw new Error('No se pudo obtener los datos de la persona');
      }

      const person = await response.json();

      document.getElementById('personId').value = person.id;
      document.getElementById('name').value = person.name;
      document.getElementById('lastName').value = person.lastName;
      document.getElementById('nationality').value = person.nationality;
      document.getElementById('year').value = person.year;

      jobsContainer.innerHTML = '';
      if (person.Jobs && person.Jobs.length > 0) {
        person.Jobs.forEach((job) => {
          addJobFields(job);
        });
      }

      form.style.display = 'block';
    } catch (error) {
      console.error('Error al cargar los datos de la persona:', error);
      alert('Error al cargar los datos de la persona');
    }
  }

  function addJobFields(job = {}) {
    const jobDiv = document.createElement('div');
    jobDiv.classList.add('job');
    jobDiv.dataset.jobId = job.id || '';

    jobDiv.innerHTML = `
        <label>Empresa:</label>
        <input type="text" name="jobs[${job.id || 'new'}][company]" value="${job.company || ''}">
        
        <label>Fecha de Inicio:</label>
        <input type="date" name="jobs[${job.id || 'new'}][initContract]" value="${job.initContract ? new Date(job.initContract).toISOString().split('T')[0] : ''}">
        
        <label>Fecha de Fin:</label>
        <input type="date" name="jobs[${job.id || 'new'}][finishContract]" value="${job.finishContract ? new Date(job.finishContract).toISOString().split('T')[0] : ''}">
        
        <label>Puesto:</label>
        <input type="text" name="jobs[${job.id || 'new'}][position]" value="${job.position || ''}">
      `;

    jobsContainer.appendChild(jobDiv);
  }

  searchButton.addEventListener('click', () => {
    const personId = searchIdInput.value.trim();
    if (personId) {
      loadPersonData(personId);
    } else {
      alert('Por favor, ingrese un ID de persona');
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
      jobs: [],
    };

    formData.forEach((value, key) => {
      if (key.includes('jobs')) {
        const [_, index, field] = key.split(/[\[\]]+/);
        if (!data.jobs[index]) data.jobs[index] = {};
        data.jobs[index][field] = value;
      } else {
        data[key] = value;
      }
    });

    data.jobs = data.jobs.filter((job) =>
      Object.values(job).some((val) => val !== '')
    );

    try {
      const personId = document.getElementById('personId').value;
      const response = await fetch(`/api/people/${personId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Persona actualizada correctamente');
        form.style.display = 'none';
      } else {
        alert('Error al actualizar la persona');
      }
    } catch (error) {
      console.error('Error al enviar los datos de actualización:', error);
    }
  });
});
