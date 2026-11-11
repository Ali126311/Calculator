
const display = document.getElementById("display");

let current = "0";
let previous = null;
let operator = null;
let resetNext = false;

function updateDisplay() {
    display.value = current;
}

function appendNumber(number) {
    if (resetNext || current === "Error") {
        current = number;
        resetNext = false;
    } else {
        current = current === "0"
            ? number
            : current + number;
    }

    updateDisplay();
}

function appendDecimal() {
    if (resetNext || current === "Error") {
        current = "0.";
        resetNext = false;
    } else if (!current.includes(".")) {
        current += ".";
    }

    updateDisplay();
}

function chooseOperator(op) {
    if (current === "Error") return;

    if (operator && !resetNext) {
        calculate();
    }

    previous = Number(current);
    operator = op;
    resetNext = true;
}

function calculate() {
    if (operator === null || previous === null) return;

    const a = previous;
    const b = Number(current);
    let result;

    switch (operator) {
        case "+":
            result = a + b;
            break;

        case "-":
            result = a - b;
            break;

        case "*":
            result = a * b;
            break;

        case "/":
            if (b === 0) {
                current = "Error";
                previous = null;
                operator = null;
                resetNext = true;
                updateDisplay();
                return;
            }

            result = a / b;
            break;
    }

    current = String(Number(result.toPrecision(12)));
    previous = null;
    operator = null;
    resetNext = true;

    updateDisplay();
}

function percentage() {
    if (current === "Error") return;

    current = String(Number(current) / 100);
    resetNext = false;
    updateDisplay();
}

function clearDisplay() {
    current = "0";
    previous = null;
    operator = null;
    resetNext = false;
    updateDisplay();
}

function deleteLast() {
    if (resetNext || current === "Error") {
        current = "0";
        resetNext = false;
    } else {
        current = current.length > 1
            ? current.slice(0, -1)
            : "0";
    }

    updateDisplay();
}

// Keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key;

    if (/^[0-9]$/.test(key)) {
        appendNumber(key);
    } else if (key === ".") {
        appendDecimal();
    } else if (["+", "-", "*", "/"].includes(key)) {
        chooseOperator(key);
    } else if (key === "Enter" || key === "=") {
        event.preventDefault();
        calculate();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "%") {
        percentage();
    }
});
