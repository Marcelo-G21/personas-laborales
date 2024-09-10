document.addEventListener('DOMContentLoaded', () => {
  const deletePersonForm = document.getElementById('deletePersonForm');
  const backBtn = document.getElementById('backBtn');

  if (deletePersonForm) {
    deletePersonForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const personId = document.getElementById('personId').value;

      try {
        const response = await fetch(`/api/people/${personId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Persona eliminada correctamente');
          window.location.href = '/';
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error al eliminar la persona:', error);
      }
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', () => {
      window.location.href = '/';
    });
  }
});
