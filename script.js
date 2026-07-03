const countValue = document.getElementById('countValue');
const countMessage = document.getElementById('countMessage');
const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');

let count = 0;

function updateCounterDisplay() {
  countValue.textContent = count;
  if (count === 0) {
    countMessage.textContent = 'The counter is at zero.';
  } else if (count > 0) {
    countMessage.textContent = `Positive count: ${count}`;
  } else {
    countMessage.textContent = `Negative count: ${count}`;
  }
}

function changeCount(amount) {
  count += amount;
  updateCounterDisplay();
}

increaseBtn.addEventListener('click', () => changeCount(1));
decreaseBtn.addEventListener('click', () => changeCount(-1));

updateCounterDisplay();

const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

const todos = [
  { id: 1, label: 'Learn JS variables', done: false },
  { id: 2, label: 'Practice DOM events', done: true }
];

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((task) => {
    const item = document.createElement('li');
    item.className = task.done ? 'completed' : '';

    const label = document.createElement('span');
    label.textContent = task.label;

    const buttons = document.createElement('div');
    buttons.style.display = 'flex';
    buttons.style.gap = '0.5rem';

    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = task.done ? 'Undo' : 'Done';
    toggleBtn.addEventListener('click', () => {
      task.done = !task.done;
      renderTodos();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.addEventListener('click', () => {
      const index = todos.findIndex((item) => item.id === task.id);
      if (index !== -1) {
        todos.splice(index, 1);
        renderTodos();
      }
    });

    buttons.append(toggleBtn, removeBtn);
    item.append(label, buttons);
    todoList.appendChild(item);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text === '') {
    return;
  }

  const nextId = todos.length > 0 ? Math.max(...todos.map((task) => task.id)) + 1 : 1;
  todos.push({ id: nextId, label: text, done: false });
  todoInput.value = '';
  renderTodos();
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

renderTodos();

const loadQuizCallbackBtn = document.getElementById('loadQuizCallbackBtn');
const loadQuizPromiseBtn = document.getElementById('loadQuizPromiseBtn');
const quizQuestion = document.getElementById('quizQuestion');
const quizAnswers = document.getElementById('quizAnswers');
const quizResult = document.getElementById('quizResult');

const quizData = [
  {
    id: 1,
    question: 'Which keyword declares a constant in JavaScript?',
    answers: ['let', 'const', 'var'],
    correct: 'const'
  },
  {
    id: 2,
    question: 'What type of value does `Array.isArray([])` return?',
    answers: ['string', 'boolean', 'number'],
    correct: 'boolean'
  }
];

function showQuiz(questionObject) {
  quizQuestion.textContent = questionObject.question;
  quizAnswers.innerHTML = '';
  quizResult.textContent = '';

  questionObject.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.addEventListener('click', () => {
      quizResult.textContent = answer === questionObject.correct ? 'Correct! ✅' : 'Try again. ❌';
    });
    quizAnswers.appendChild(button);
  });
}

function loadQuizDataWithCallback(callback) {
  setTimeout(() => {
    const question = quizData[Math.floor(Math.random() * quizData.length)];
    callback(null, question);
  }, 1000);
}

function loadQuizDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = Math.floor(Math.random() * quizData.length);
      const question = quizData[index];
      if (question) {
        resolve(question);
      } else {
        reject(new Error('No question available'));
      }
    }, 1000);
  });
}

loadQuizCallbackBtn.addEventListener('click', () => {
  quizQuestion.textContent = 'Loading question with callback...';
  quizAnswers.innerHTML = '';
  quizResult.textContent = '';

  loadQuizDataWithCallback((error, question) => {
    if (error) {
      quizQuestion.textContent = 'Failed to load the question.';
      return;
    }
    showQuiz(question);
  });
});

loadQuizPromiseBtn.addEventListener('click', () => {
  quizQuestion.textContent = 'Loading question with promise...';
  quizAnswers.innerHTML = '';
  quizResult.textContent = '';

  loadQuizDataPromise()
    .then((question) => {
      showQuiz(question);
    })
    .catch((error) => {
      quizQuestion.textContent = error.message;
    });
});
