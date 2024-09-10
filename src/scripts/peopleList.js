function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/api/people');
    if (!response.ok) {
      throw new Error('Error al obtener la lista de personas');
    }

    const peopleData = await response.json();
    const peopleContainer = document.getElementById('people-container');

    peopleContainer.innerHTML = '';

    peopleData.forEach((person) => {
      const personDiv = document.createElement('div');
      personDiv.classList.add('person');

      personDiv.innerHTML = `
          <h2>${person.name} ${person.lastName}</h2>
          <p>ID: ${person.id}</p>
          <p>Nationality: ${person.nationality}</p>
          <p>Year: ${person.year}</p>
          <h3>Jobs:</h3>
          <ul>
            ${
              person.Jobs && person.Jobs.length > 0
                ? person.Jobs.map(
                    (job) => `
                  <li>
                    <p>ID: ${job.id}</p>
                    <p>Company: ${job.company}</p>
                    <p>Init Contract: ${formatDate(job.initContract)}</p>
                    <p>Finish Contract: ${formatDate(job.finishContract)}</p>
                    <p>Position: ${job.position}</p>
                  </li>
                `
                  ).join('')
                : '<li>No jobs found</li>'
            }
          </ul>
        `;

      peopleContainer.appendChild(personDiv);
    });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
    const peopleContainer = document.getElementById('people-container');
    peopleContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
