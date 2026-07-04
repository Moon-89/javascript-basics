const questionsArea = document.getElementById('questionsArea');
const answeredCount = document.getElementById('answeredCount');
const totalCount = document.getElementById('totalCount');
const scoreCount = document.getElementById('scoreCount');
const progressBar = document.getElementById('progressBar');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');
const resultMsg = document.getElementById('resultMsg');

const quizData = [
  {
    question: 'Which keyword declares a constant in JavaScript?',
    answers: ['let', 'const', 'var'],
    correct: 'const'
  },
  {
    question: 'What does `Array.isArray([])` return?',
    answers: ['"array"', 'true', 'false'],
    correct: 'true'
  },
  {
    question: 'Which method adds an item to the end of an array?',
    answers: ['push()', 'shift()', 'pop()'],
    correct: 'push()'
  },
  {
    question: 'What does a Promise represent?',
    answers: ['A loop', 'A future value', 'A CSS rule'],
    correct: 'A future value'
  }
];

// selected[i] holds the chosen answer for question i, or null if unanswered
let selected = quizData.map(() => null);
let submitted = false;

function updateStats() {
  const answered = selected.filter((a) => a !== null).length;
  answeredCount.textContent = answered;
  totalCount.textContent = quizData.length;
  progressBar.style.width = `${(answered / quizData.length) * 100}%`;

  if (submitted) {
    const score = selected.filter((a, i) => a === quizData[i].correct).length;
    scoreCount.textContent = score;
  } else {
    scoreCount.textContent = 0;
  }
}

function render() {
  questionsArea.innerHTML = '';

  quizData.forEach((q, index) => {
    const wrap = document.createElement('div');

    const title = document.createElement('p');
    title.className = 'quiz-question';
    title.textContent = `${index + 1}. ${q.question}`;
    wrap.appendChild(title);

    const answers = document.createElement('div');
    answers.className = 'answers';

    q.answers.forEach((answer) => {
      const btn = document.createElement('button');
      btn.textContent = answer;

      if (selected[index] === answer) {
        btn.classList.add('selected');
      }

      if (submitted) {
        btn.disabled = true;
        if (answer === q.correct) {
          btn.classList.add('correct');
        } else if (selected[index] === answer) {
          btn.classList.add('wrong');
        }
      } else {
        btn.addEventListener('click', () => {
          selected[index] = answer;
          render();
        });
      }

      answers.appendChild(btn);
    });

    wrap.appendChild(answers);
    questionsArea.appendChild(wrap);
  });

  updateStats();
}

submitBtn.addEventListener('click', () => {
  if (submitted) {
    return;
  }
  submitted = true;
  const score = selected.filter((a, i) => a === quizData[i].correct).length;
  resultMsg.textContent = `You scored ${score} out of ${quizData.length}. ${score === quizData.length ? '🎉 Perfect!' : 'Press Restart to try again.'}`;
  submitBtn.disabled = true;
  render();
});

restartBtn.addEventListener('click', () => {
  selected = quizData.map(() => null);
  submitted = false;
  submitBtn.disabled = false;
  resultMsg.textContent = '';
  render();
});

render();
