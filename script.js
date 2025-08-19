const display = document.getElementById("display");
const result = document.getElementById("result");
const popup = document.getElementById("popup");
const historyListEl = document.getElementById("historyList");

let historyData = JSON.parse(localStorage.getItem("calcHistory")) || [];

function isOperator(char) {
  return ['+', '-', '*', '/'].includes(char);
}

function scrollToEnd() {
  display.scrollLeft = display.scrollWidth;
}

function append(char) {
  const lastChar = display.value.slice(-1);

  if (isOperator(char)) {
    if (display.value === '') return;
    if (isOperator(lastChar)) {
      display.value = display.value.slice(0, -1);
    }
  }

  display.value += char;
  scrollToEnd();
  autoCalculate();
}

function clearDisplay() {
  display.value = '';
  result.textContent = '©MONXCODE™';
}

function backspace() {
  display.value = display.value.slice(0, -1);
  autoCalculate();
  scrollToEnd();
}

function calculate() {
  try {
    let exp = display.value;
    while (isOperator(exp.slice(-1))) {
      exp = exp.slice(0, -1);
    }
    const evalResult = eval(exp);
    result.textContent = evalResult;
    display.value = evalResult;
    scrollToEnd();
    historyData.push(exp + ' = ' + evalResult);
    localStorage.setItem("calcHistory", JSON.stringify(historyData));
  } catch {
    result.textContent = 'Error';
  }
}

function autoCalculate() {
  try {
    let exp = display.value;
    while (isOperator(exp.slice(-1))) {
      exp = exp.slice(0, -1);
    }
    const res = eval(exp);
    result.textContent = res;
  } catch {
    result.textContent = '©MONXCODE™';
  }
}

function showHistory() {
  if (historyData.length === 0) {
    alert("No history yet.");
    return;
  }
  historyListEl.innerHTML = historyData.map(item => `<li>${item}</li>`).join('');
  popup.style.display = "flex";
}

function closePopup() {
  popup.style.display = "none";
}

function clearHistory() {
  historyData = [];
  localStorage.removeItem("calcHistory");
  historyListEl.innerHTML = "";
  alert("History Cleared!");
}

// Keyboard support
document.addEventListener('keydown', function(e) {
  const key = e.key;

  if (/\d/.test(key)) {
    append(key);
  } else if (['+', '-', '*', '/'].includes(key)) {
    append(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearDisplay();
  } else if (key === '.') {
    append('.');
  } else if (key === '%') {
    append('%');
  }
});
