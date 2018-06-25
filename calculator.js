var myDisplay = document.getElementById("screen");

initVariables();
setFirstDisplay();

document.getElementById("clear").addEventListener("click", clearScreen);
document.getElementById("punkt").addEventListener("click", addPunkt);
document.getElementById("equals").addEventListener("click", equals);

var numArray = document.getElementsByClassName("number");
for (var i = 0; i < numArray.length; i++) {
  numArray[i].addEventListener("click", setDisplay);
}

var opArray = document.getElementsByClassName("operator");
for (var j = 0; j < opArray.length; j++) {
  opArray[j].addEventListener("click", operate);
}

function initVariables() { // initialises variables
  window.clear = true, window.allClear = true;
  window.display = 0;
  window.runningTotal = 0, memory = null;
  window.operator = "plus";
  window.eval = false;
}

function setFirstDisplay() { // initialises display
  myDisplay.appendChild(document.createTextNode(display));
}

function clearScreen() { // clears screen and memory
  if (clear) {
    initVariables();
    undoButtonColor();
  } else if (!clear) {
    clearDisplay();
  }
}

function clearDisplay() { // clears display and sets to zero
  display = 0;
  updateDisplay(display);
  document.getElementById("clear").innerHTML = 'AC';
  clear = true;
}

function setClearButton() {
  clear = false, allClear = false;
  document.getElementById("clear").innerHTML = 'C';
}

function setDisplay() { // adds number to display text node
  if (eval && !operator) {
    clearDisplay();
    initVariables();
  } else if (eval && operator) {
    clearDisplay();
  }
  if (display === 0) {
    if (this.id == 0) {
      display = 0;
    } else {
      display = this.id;
      setClearButton();
    }
  } else {
    display = "" + display + this.id;
    setClearButton();
  }
  updateDisplay(display);
  eval = false;
}

function addPunkt() { // adds decimal point to display text node
  if (eval && !operator) {
    clearDisplay();
    initVariables();
  } else if (eval && operator) {
    clearDisplay();
  }
  if (!display.toString().match(/[.]/)) {
    display += ".";
    setClearButton();
  }
  updateDisplay(display);
  eval = false;
}

function operate() {
  undoButtonColor();
  document.getElementById(this.id).style.backgroundColor = "#333399"; // highlights current operation
  if (!eval) {
    memory = Number(display);
    runningTotal = calculateTwoNumbers(runningTotal, memory, operator);
    updateDisplay(runningTotal);
    memory = null, display = 0;
    operator = this.id;
  }
  else {
    operator = this.id;
  }
}

function undoButtonColor() { // unhighlights all operation buttons
  for (var k = 0; k < opArray.length; k++) {
    document.getElementById(opArray[k].id).style.backgroundColor = "gray";
  }
}

function calculateTwoNumbers(num1, num2, id) {
  switch(id) {
    case "plus":
      return num1 + num2;
    case "minus":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      return num1 / num2;
  }
}

function equals() {
  if (!eval) {
    undoButtonColor();
    memory = Number(display);
    runningTotal = calculateTwoNumbers(runningTotal, memory, operator);
    updateDisplay(runningTotal);
    memory = runningTotal;
    display = 0;
    operator = null;
    eval = true;
  }
}

function updateDisplay(disp) {
  if (disp.toString().length < 13) {
    myDisplay.childNodes[0].nodeValue = disp;
  } else if (Number(disp) >= 1000000000000) {
    myDisplay.childNodes[0].nodeValue = "too large";
    initVariables();
  } else if (Number(disp) < 0.0000000001) {
    myDisplay.childNodes[0].nodeValue = "too small";
    initVariables();
  } else {
    var match = /\./.exec(disp.toString());
    if (match) {
      disp = Number(disp).toFixed(11 - match.index);
      myDisplay.childNodes[0].nodeValue = disp;
    }
  }
}
