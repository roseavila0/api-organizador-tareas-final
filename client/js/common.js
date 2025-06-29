function showMessage(elementId, message, type = 'info') {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.className = `message message-${type}`;
    element.style.display = 'block';
  }
}

function hideMessage(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.style.display = 'none';
  }
}

function redirectTo(url, delay = 0) {
  if (delay > 0) {
    setTimeout(function () {
      window.location.href = url;
    }, delay);
  } else {
    window.location.href = url;
  }
}

function openInNewTab(url) {
  window.open(url, '_blank');
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateRequiredFields(fields) {
  const errors = [];

  fields.forEach((field) => {
    const element = document.getElementById(field.id);
    if (!element || !element.value.trim()) {
      errors.push(`${field.name} es requerido`);
    } else if (field.type === 'email' && !isValidEmail(element.value)) {
      errors.push(`${field.name} debe ser un email válido`);
    }
  });

  return errors;
}

async function httpRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error en petición HTTP:', error);
    throw error;
  }
}

function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${type.toUpperCase()}: ${message}`);
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

document.addEventListener('DOMContentLoaded', function () {
  log('Organizador de Tareas - Página cargada');
});
