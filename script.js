// Creates basic calculator operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let num1 = "foo";
let num2 = "bar";
let op = 0;
let storage = [];

function operator(num1, num2, op) {
    if (op === "+") {
        return add(num1, num2);
    } else if (op === "-") {
        return subtract(num1, num2);
    } else if (op === "*") {
        return multiply(num1, num2);
    } else if (num2 == 0 && op === "/") {
        return "haha go away"; 
    } else if (op === "/") {
        return divide(num1, num2);
    } 
}

 // Makes buttons and display interactive
const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

const span = document.createElement("span");

buttons.addEventListener("click", event => {
    let target = event.target;
    if (target.matches("button")) {
        let value = target.innerHTML;
        span.textContent += value;
        display.appendChild(span);
        storage.push(value);
        }

    if (target.matches("#equals")) {
        let newStorage = storage.join('').split(/([_\W])/);
        while (newStorage.length > 3) {
            let intermediateResult = operator(parseInt(newStorage[0]), parseInt(newStorage[2]), newStorage[1]);
            newStorage[0] = intermediateResult;
            newStorage.splice(1,2);
        }
        span.textContent += newStorage[0];
        display.appendChild(span);
    }

    if (target.matches("#clear")) {
        span.textContent = "";
        display.replaceChildren(span);
        storage = [];
    }
})

