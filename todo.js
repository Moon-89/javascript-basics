const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const filterButtons = document.querySelectorAll('.filters button');

const statAll = document.getElementById('statAll');
const statOpen = document.getElementById('statOpen');
const statDone = document.getElementById('statDone');

const STORAGE_KEY = 'jsMiniApps.todos';
let currentFilter = 'all';

function loadTodos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved)) {
      return saved;
    }
  } catch (error) {
    // ignore corrupt data and start fresh
  }
  return [
    { id: 1, label: 'Learn JS variables', done: false },
    { id: 2, label: 'Practice DOM events', done: true }
  ];
}

let todos = loadTodos();

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function nextId() {
  return todos.length > 0 ? Math.max(...todos.map((t) => t.id)) + 1 : 1;
}

function visibleTodos() {
  if (currentFilter === 'active') {
    return todos.filter((t) => !t.done);
  }
  if (currentFilter === 'completed') {
    return todos.filter((t) => t.done);
  }
  return todos;
}

function updateStats() {
  const done = todos.filter((t) => t.done).length;
  statAll.textContent = todos.length;
  statOpen.textContent = todos.length - done;
  statDone.textContent = done;
}

function render() {
  todoList.innerHTML = '';
  const items = visibleTodos();

  if (items.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'empty';
    empty.textContent = todos.length === 0 ? 'No tasks yet. Add one above.' : 'Nothing here for this filter.';
    empty.style.justifyContent = 'center';
    todoList.appendChild(empty);
  }

  items.forEach((task) => {
    const item = document.createElement('li');
    item.className = task.done ? 'completed' : '';

    const label = document.createElement('span');
    label.className = 'todo-label';
    label.textContent = task.label;
    label.addEventListener('click', () => {
      task.done = !task.done;
      saveTodos();
      render();
    });

    const buttons = document.createElement('div');
    buttons.className = 'row';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'ghost';
    toggleBtn.textContent = task.done ? 'Undo' : 'Done';
    toggleBtn.addEventListener('click', () => {
      task.done = !task.done;
      saveTodos();
      render();
    });

    const removeBtn = document.createElement('button');
    removeBtn.className = 'danger';
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      todos = todos.filter((t) => t.id !== task.id);
      saveTodos();
      render();
    });

    buttons.append(toggleBtn, removeBtn);
    item.append(label, buttons);
    todoList.appendChild(item);
  });

  updateStats();
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text === '') {
    return;
  }
  todos.push({ id: nextId(), label: text, done: false });
  todoInput.value = '';
  saveTodos();
  render();
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter((t) => !t.done);
  saveTodos();
  render();
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle('active', b === btn));
    render();
  });
});

render();
