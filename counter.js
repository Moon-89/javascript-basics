const countValue = document.getElementById('countValue');
const statusMsg = document.getElementById('statusMsg');
const stepInput = document.getElementById('stepInput');
const actionLog = document.getElementById('actionLog');

const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');
const minusOneBtn = document.getElementById('minusOneBtn');
const plusOneBtn = document.getElementById('plusOneBtn');
const resetBtn = document.getElementById('resetBtn');
const clearLogBtn = document.getElementById('clearLogBtn');

let count = 0;
const history = [];

function getStep() {
  const step = parseInt(stepInput.value, 10);
  return Number.isFinite(step) && step > 0 ? step : 1;
}

function render() {
  countValue.textContent = count;

  actionLog.innerHTML = '';
  if (history.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'No actions yet.';
    actionLog.appendChild(li);
    return;
  }
  history.slice(0, 20).forEach((entry) => {
    const li = document.createElement('li');
    li.textContent = entry;
    actionLog.appendChild(li);
  });
}

function logAction(message) {
  history.unshift(message);
  statusMsg.textContent = `Last action: ${message}`;
  render();
}

function changeCount(amount) {
  count += amount;
  const sign = amount > 0 ? '+' : '';
  logAction(`${sign}${amount} → ${count}`);
}

increaseBtn.addEventListener('click', () => changeCount(getStep()));
decreaseBtn.addEventListener('click', () => changeCount(-getStep()));
plusOneBtn.addEventListener('click', () => changeCount(1));
minusOneBtn.addEventListener('click', () => changeCount(-1));

resetBtn.addEventListener('click', () => {
  count = 0;
  logAction('Reset to 0');
});

clearLogBtn.addEventListener('click', () => {
  history.length = 0;
  statusMsg.textContent = 'Last action: Cleared history';
  render();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    changeCount(getStep());
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    changeCount(-getStep());
  }
});

render();
