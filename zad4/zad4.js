const number_buttons = document.getElementsByClassName("number-button")
Array.from(number_buttons).forEach(element => {
  element.addEventListener("click", handleNumberButtonClick)
});
const operationButtons = document.getElementsByClassName("operation-button")
Array.from(operationButtons).forEach(element => {
  element.addEventListener("click", handleOperationButtonClick)
});
const display = document.querySelector("#displayer")
const equalsButton = document.querySelector("#equals-button")
equalsButton.addEventListener("click", handleEqualsButtonClick)
const resetButton = document.querySelector("#reset-button")
resetButton.addEventListener("click", handleReset)


let displayedText = "";
let currentNumberString = "";
let tokens = [];
function handleError() {
  tokens = [];
  display.textContent = "Err";
  displayedText = ""
  currentNumberString = "";
}
function handleReset() {
  tokens = [];
  display.textContent = "0";
  displayedText = ""
  currentNumberString = "";
}
function handleNumberButtonClick(e) {
  const text = e.target.textContent.trim();
  if (text == ".") {
    handleDotButtonClick(e)
    return;
  }
  currentNumberString += text;
  updateDisplay();
}
function handleDotButtonClick(e) {
  if (!currentNumberString.includes(".")) {
    if (currentNumberString === "" ) currentNumberString = "0";
    currentNumberString += ".";
    console.log(currentNumberString)
    updateDisplay();
  }
}
function handleOperationButtonClick(e) {
  const op = e.target.textContent.trim();
  if (currentNumberString === "") return;
  tokens.push(Number(currentNumberString));
  tokens.push(op);
  displayedText += currentNumberString + op;
  currentNumberString = "";
  updateDisplay();
}
function updateDisplay() {
  if (displayedText == "0") {
    displayedText = ""
  }
  display.textContent = displayedText + currentNumberString
}
function handleEqualsButtonClick(e) {
  if (currentNumberString !== "") {
    tokens.push(Number(currentNumberString));
  } else {
    handleError();
    return;
  }
    
  const result = calculate(tokens);
  displayedText = "";
  currentNumberString = result.toString();
  updateDisplay();
  tokens = [];
} 
function calculate(toks) {
  if (!toks || toks.length === 0) return 0;
  let out = [];
  let i = 0;
  while (i < toks.length) {
    let t = toks[i];
    if (t === "×" || t === "÷") {
      let a = out.pop();
      let b = toks[i + 1];
      if (t === "×") {
        out.push(a * b);
      } else if (b != 0) {
        out.push(a / b);
      } else {
        handleError();
        return;
      }
      i += 2;
    } else {
      out.push(t);
      i++;
    }
  }
  let r = out[0];
  i = 1;
  while (i < out.length) {
    let op = out[i];
    let n = out[i + 1];
    if (op === "+") r += n;
    else if (op === "-") r -= n;
    i += 2;
  }
  return r;
}

