let display = document.getElementById("display");
let memory = 0;
let angleMode = "Rad"; // default radian mode

// ✅ Append numbers/ops
function appendValue(value) {
  display.value += value;
}

function appendFunc(func) {
  display.value += func;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

// ✅ Scientific Functions
function square() {
  try {
    let val = parseFloat(display.value);
    display.value = Math.pow(val, 2);
  } catch {
    display.value = "Error";
  }
}

function factorial() {
  try {
    let n = parseInt(display.value);
    if (n < 0) {
      display.value = "Error";
      return;
    }
    let fact = 1;
    for (let i = 1; i <= n; i++) fact *= i;
    display.value = fact;
  } catch {
    display.value = "Error";
  }
}

// ✅ Calculate with Math support
function calculate() {
  try {
    let expr = display.value
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      .replace(/√/g, "Math.sqrt")
      .replace(/sin\(/g, "trigFunc('sin',")
      .replace(/cos\(/g, "trigFunc('cos',")
      .replace(/tan\(/g, "trigFunc('tan',")
      .replace(/log\(/g, "Math.log10(")
      .replace(/ln\(/g, "Math.log(")
      .replace(/\^/g, "**"); // power

    let result = eval(expr);
    if (result === Infinity || isNaN(result)) {
      display.value = "Error";
    } else {
      display.value = result;
    }
  } catch {
    display.value = "Error";
  }
}

// ✅ Trig functions with Rad/Deg
function trigFunc(func, val) {
  if (angleMode === "Deg") val = (val * Math.PI) / 180;
  switch (func) {
    case "sin": return Math.sin(val);
    case "cos": return Math.cos(val);
    case "tan": return Math.tan(val);
  }
}

// ✅ Memory
function memoryClear() { memory = 0; }
function memoryRecall() { display.value += memory; }
function memoryAdd() { memory += parseFloat(display.value) || 0; }
function memorySubtract() { memory -= parseFloat(display.value) || 0; }

// ✅ Keyboard input
document.addEventListener("keydown", function(event) {
  const key = event.key;
  if (!isNaN(key) || "+-*/.%".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    calculate();
  } else if (key === "Backspace") {
    backspace();
  } else if (key === "Escape") {
    clearDisplay();
  }
});

// ✅ Dark/Light Mode
let themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = 
    document.body.classList.contains("light-mode") 
      ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// ✅ Angle Mode Toggle
let angleBtn = document.getElementById("angle-mode");
angleBtn.addEventListener("click", () => {
  angleMode = angleMode === "Rad" ? "Deg" : "Rad";
  angleBtn.textContent = angleMode;
});
