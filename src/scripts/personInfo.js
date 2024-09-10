document
  .getElementById('personForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const personId = document.getElementById('personId').value;
    const container = document.getElementById('person-info-container');

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    try {
      const response = await fetch(`/api/people/${personId}`);
      if (!response.ok) {
        throw new Error('Error al obtener la información de la persona');
      }

      const personData = await response.json();

      container.innerHTML = '';

      const personDiv = document.createElement('div');
      personDiv.classList.add('person');
      personDiv.innerHTML = `
            <h2>${personData.name} ${personData.lastName}</h2>
            <p>ID: ${personData.id}</p>
            <p>Nationality: ${personData.nationality}</p>
            <p>Year: ${personData.year}</p>
            <h3>Jobs:</h3>
            <ul>
                ${
                  personData.Jobs && personData.Jobs.length > 0
                    ? personData.Jobs.map(
                        (job) => `
                        <li>
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

      container.appendChild(personDiv);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  });
