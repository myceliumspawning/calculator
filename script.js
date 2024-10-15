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

let storage = [];

function operator(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
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
    let newStorage = storage.join('').match(/(\d+(\.\d+)?|[+\-*/=])/g);

    function compute(array){
        while (array.includes("*") == true) {
            let x = array.indexOf("*");
            let multiplyResult = operator(array[x-1], array[x+1], array[x]);
            array[x-1] = multiplyResult;
            array.splice(x, 2);
            console.log(newStorage);
        }
        while (array.includes("/") == true) {
            let y = array.indexOf("/");
            let divideResult = operator(array[y-1], array[y+1], array[y]);
            array[y-1] = divideResult;
            array.splice(y, 2);
        }
        while (array.length >= 3) {
            let intermediateResult = operator(array[0], array[2], array[1]);
            array[0] = intermediateResult;
            array.splice(1,2);
        }
        span.textContent += Math.round(parseFloat(newStorage[0]) * 100) / 100;
        display.appendChild(span);
    }

    if (target.matches("button")) {
        let value = target.innerHTML;
        span.textContent += value;
        display.appendChild(span);
        storage.push(value);
        }

    if (target.matches("#equals")) {
        if (newStorage.includes("*") == false && newStorage.includes("/") == false && newStorage.includes("+") == false && newStorage.includes("-") == false) {
            compute(newStorage);
        } else if (storage[0] == "-") {
            newStorage = newStorage.slice(2);
            newStorage[0] = -Math.abs(parseFloat(newStorage[0]));
            compute(newStorage);
        } else if (storage[0] == "+") {
            newStorage = newStorage.slice(2);
            compute(newStorage);
        } else {
            compute(newStorage);
        }
        storage = newStorage;
    }
        
    if (target.matches("#clear")) {
        span.textContent = "";
        display.replaceChildren(span);
        storage = [];
        newStorage = [];
    }
})

