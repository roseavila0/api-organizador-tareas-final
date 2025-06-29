document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const loginButton = document.querySelector('.login-button');

    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';

    loginButton.textContent = 'Iniciando sesión...';
    loginButton.disabled = true;

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        successMessage.textContent = `¡Bienvenido/a ${data.user.name}!`;
        successMessage.style.display = 'block';

        localStorage.setItem('user', JSON.stringify(data.user));

        setTimeout(function () {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        errorMessage.textContent = data.error || 'Error en el login';
        errorMessage.style.display = 'block';
      }
    } catch (error) {
      errorMessage.textContent =
        'Error de conexión. Verifica que el servidor esté funcionando.';
      errorMessage.style.display = 'block';
      console.error('Error:', error);
    } finally {
      loginButton.textContent = 'Iniciar Sesión';
      loginButton.disabled = false;
    }
  });
});
