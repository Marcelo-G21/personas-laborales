document.getElementById('addJobBtn').addEventListener('click', () => {
  const jobsContainer = document.getElementById('jobsContainer');

  const newJobDiv = document.createElement('div');
  newJobDiv.classList.add('job');

  newJobDiv.innerHTML = `
        <label for="company">Compañía:</label>
        <input type="text" class="company" required><br>

        <label for="initContract">Fecha Inicio Contrato:</label>
        <input type="date" class="initContract" required><br>

        <label for="finishContract">Fecha Fin Contrato:</label>
        <input type="date" class="finishContract" required><br>

        <label for="position">Posición:</label>
        <input type="text" class="position" required>
        <br>
    `;

  jobsContainer.appendChild(newJobDiv);
});

document
  .getElementById('addPersonForm')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const nationality = document.getElementById('nationality').value;
    const year = parseInt(document.getElementById('year').value, 10);

    const jobs = Array.from(document.getElementsByClassName('job')).map(
      (jobDiv) => ({
        company: jobDiv.querySelector('.company').value,
        initContract: jobDiv.querySelector('.initContract').value,
        finishContract: jobDiv.querySelector('.finishContract').value,
        position: jobDiv.querySelector('.position').value,
      })
    );

    const personData = { name, lastName, nationality, year, jobs };

    try {
      const response = await fetch('/api/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });

      if (response.ok) {
        alert('Persona y trabajos agregados correctamente');
        window.location.href = '/';
      } else {
        const errorData = await response.json();
        alert(
          `Error: ${errorData.errors ? errorData.errors.join(', ') : 'Ocurrió un error desconocido'}`
        );
      }
    } catch (error) {
      console.error('Error al agregar la persona:', error);
    }
  });
