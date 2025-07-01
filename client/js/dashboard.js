let id = 0;

function logout() {
  if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
    removeAuthToken();
    alert('Sesión cerrada exitosamente');
    window.location.href = '/login';
  }
}

function goToTasks() {
  const tasksSection = document.querySelector('.tasks-section');
  tasksSection.scrollIntoView({ behavior: 'smooth' });
}

function goToStats() {
  alert('Redirigiendo a estadísticas... (Página próximamente)');
}

function goToSettings() {
  alert('Redirigiendo a configuración... (Página próximamente)');
}

// Función para cargar tareas
async function loadTasks() {
  const container = document.getElementById('tasksContainer');

  try {
    container.innerHTML = '<div class="loading">Cargando tareas...</div>';

    const tasks = await httpRequest('http://localhost:3000/api/tasks');
    renderTasks(tasks);
  } catch (error) {
    container.innerHTML =
      '<div class="no-tasks">Error al cargar las tareas: ' +
      error.message +
      '</div>';
    console.error('Error loading tasks:', error);
  }
}

function renderTasks(tasks) {
  const container = document.getElementById('tasksContainer');

  if (!tasks || tasks.length === 0) {
    container.innerHTML =
      '<div class="no-tasks">No hay tareas disponibles. ¡Crea tu primera tarea!</div>';
    return;
  }

  const tasksHTML = tasks
    .map(
      (task) => `
    <div class="task-item" data-task-id="${task.id}">
      <div class="task-content">
        <div class="task-info">
          <h4>${task.task}</h4>
          <div class="task-date">
             Fecha límite: ${formatTaskDate(task.dueDate || task.date)}
          </div>
        </div>
        <div class="task-actions">
          <button class="task-btn edit" onclick="editTask('${
            task.id
          }')" title="Editar esta tarea">
           Editar  
          </button>
          <button class="task-btn delete" onclick="deleteTask('${
            task.id
          }')" title="Eliminar esta tarea">
             Eliminar
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join('');

  container.innerHTML = tasksHTML;
}

function formatTaskDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
}

async function editTask(taskId) {
  try {
    const allTasks = await httpRequest('http://localhost:3000/api/tasks');
    const task = allTasks.find((t) => t.id === taskId);

    if (!task) {
      alert('Tarea no encontrada');
      return;
    }

    // Convertir la tarea en un formulario editable
    showEditForm(task);
  } catch (error) {
    alert('Error de conexión: ' + error.message);
  }
}

function showEditForm(task) {
  const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
  if (!taskElement) return;

  const currentDate = task.dueDate || task.date;

  // Guardar el HTML original
  const originalHTML = taskElement.innerHTML;

  // Reemplazar con el formulario de edición
  taskElement.innerHTML = `
    <div class="task-content edit-mode">
      <div class="edit-form">
        <input type="text" id="edit-task-${task.id}" value="${task.task}" placeholder="Descripción de la tarea" />
        <input type="date" id="edit-date-${task.id}" value="${currentDate}" />
        <div class="edit-actions">
          <button type="button" class="task-btn save" onclick="saveTask('${task.id}')">Guardar</button>
          <button type="button" class="task-btn cancel" onclick="cancelEdit('${task.id}')">Cancelar</button>
        </div>
      </div>
    </div>
  `;

  // Guardar el HTML original en el elemento
  taskElement.setAttribute('data-original-html', originalHTML);
}

function cancelEdit(taskId) {
  const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
  if (taskElement) {
    const originalHTML = taskElement.getAttribute('data-original-html');
    taskElement.innerHTML = originalHTML;
    taskElement.removeAttribute('data-original-html');
  }
}

async function saveTask(taskId) {
  const taskInput = document.getElementById(`edit-task-${taskId}`);
  const dateInput = document.getElementById(`edit-date-${taskId}`);

  if (!taskInput.value.trim()) {
    alert('La descripción de la tarea no puede estar vacía');
    return;
  }

  const taskData = {
    task: taskInput.value.trim(),
    dueDate: dateInput.value,
  };

  await updateTaskOnServer(taskId, taskData);
}

// Nueva función para actualizar la tarea en el servidor
async function updateTaskOnServer(taskId, taskData) {
  try {
    await httpRequest(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(taskData),
    });

    alert('Tarea actualizada exitosamente');
    loadTasks(); // Recargar las tareas
  } catch (error) {
    alert('Error al actualizar la tarea: ' + error.message);
  }
}

async function deleteTask(taskId) {
  if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    return;
  }

  try {
    await httpRequest(`http://localhost:3000/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    alert('Tarea eliminada exitosamente');
    loadTasks();
  } catch (error) {
    alert('Error al eliminar la tarea: ' + error.message);
  }
}

// Función simple para agregar tareas
async function createNewTask(event) {
  event.preventDefault();

  const taskDescription = document.getElementById('taskDescription').value;
  const taskDueDateRaw = document.getElementById('taskDueDate').value;

  // Asegurar formato yyyy-mm-dd
  const taskDueDate = new Date(taskDueDateRaw).toISOString().split('T')[0];

  const taskData = {
    task: taskDescription,
    dueDate: taskDueDate,
    id: `task${id++}`,
  };

  try {
    await httpRequest('http://localhost:3000/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });

    alert('Tarea creada exitosamente');
    document.getElementById('addTaskForm').reset();
    loadTasks();
  } catch (error) {
    alert('Error al crear la tarea: ' + error.message);
  }
}

async function testAPI() {
  try {
    const tasks = await httpRequest('http://localhost:3000/api/tasks');
    alert(`¡API funcionando! Se encontraron ${tasks.length || 0} tareas.`);
    loadTasks();
  } catch (error) {
    alert('Error al conectar con la API: ' + error.message);
  }
}

function updateWelcomeMessage() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const welcomeSection = document.querySelector('.welcome-section h2');

  if (user.name && welcomeSection) {
    welcomeSection.textContent = `¡Bienvenido/a de vuelta, ${user.name}!`;
  }
}

// Cuando carga la página
window.addEventListener('load', function () {
  console.log('Dashboard cargado exitosamente');
  console.log('Redirect desde login funcionando correctamente');

  // Verificar autenticación antes de continuar
  if (!isAuthenticated()) {
    alert('Debes iniciar sesión primero');
    window.location.href = '/login';
    return;
  }

  updateWelcomeMessage();

  // Configurar el evento del formulario simple
  const addTaskForm = document.getElementById('addTaskForm');
  addTaskForm.addEventListener('submit', createNewTask);

  loadTasks();
});