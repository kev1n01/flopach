const form = document.getElementById('form');
const alert = document.getElementById('alert');
const buttonAlert = document.getElementById('buttonAlert');
const loader = document.getElementById('loader');
const textloading = document.getElementById('textloading');
const buttonSubmit = document.getElementById('buttonSubmit');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Mostrar loader
  if (loader && textloading) {
    loader.style.display = 'block';
    textloading.style.display = 'none';
    buttonSubmit?.setAttribute('disabled', '');
  }

  try {
    const formData = new FormData(event.target);

    const response = await fetch('https://formsubmit.co/mecanicaflopach@gmail.com', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Mostrar alerta de éxito
      if (alert) {
        alert.style.display = 'block';
      }
      form?.reset();
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Restaurar estado original
    if (loader && textloading) {
      loader.style.display = 'none';
      textloading.style.display = 'block';
      buttonSubmit?.removeAttribute('disabled');
    }
  }
});

buttonAlert?.addEventListener('click', () => {
  if (alert) {
    alert.style.display = 'none';
  }
});