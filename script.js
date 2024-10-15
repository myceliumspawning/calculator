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
    let newStorage = storage.join('').split(/([_\W])/);

    function compute(array){
        while (array.includes("*") == true) {
            let x = array.indexOf("*");
            let multiplyResult = operator(parseInt(array[x-1]), parseInt(array[x+1]), array[x]);
            array[x-1] = multiplyResult;
            array.splice(x, 2);
        }
        while (array.includes("/") == true) {
            let y = array.indexOf("/");
            let divideResult = operator(parseInt(array[y-1]), parseInt(array[y+1]), array[y]);
            array[y-1] = divideResult;
            array.splice(y, 2);
        }
        while (array.length >= 3) {
            let intermediateResult = operator(parseInt(array[0]), parseInt(array[2]), array[1]);
            array[0] = intermediateResult;
            array.splice(1,2);
        }
    }

    if (target.matches("button")) {
        let value = target.innerHTML;
        span.textContent += value;
        display.appendChild(span);
        storage.push(value);
        }

    if (target.matches("#equals")) {
        if (newStorage.includes("*") == false && newStorage.includes("/") == false && newStorage.includes("+") == false && newStorage.includes("-") == false) {
            console.log(newStorage);
            span.textContent += newStorage[0];
            display.appendChild(span);
        } else {
        compute(newStorage);
        span.textContent += newStorage[0];
        display.appendChild(span);
        }
    }
        
    if (target.matches("#clear")) {
        span.textContent = "";
        display.replaceChildren(span);
        storage = [];
    }
})

