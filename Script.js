const visible = document.querySelectorAll(".visible"); // anything that can appear on the screen
const screen = document.getElementById("screen");
const expression = document.getElementById("expression");
const output = document.getElementById("output");

let ScreenText = "";
let bracketsOpen = false;
let openBracketNum = 0;
let closedBracketNum = 0;

const numbers = ["0","1","2","3","4","5","6","7","8","9"];
const operators = ["*","+","-","/","%"];

// HELPER FUNCTIONS
function lastCharacter() {
    return ScreenText.length > 0 ? ScreenText[ScreenText.length - 1] : "";
}

function isOperator(char) {
    return operators.includes(char);
}

function bracketCloser() {
    if(openBracketNum === closedBracketNum && openBracketNum !== 0) {
        bracketsOpen = false;
    }
}

// CLICK HANDLER FOR ALL VISIBLE BUTTONS
visible.forEach(button => {
    button.addEventListener("click", () => {
        const char = button.id;

        // BRACKETS
        if(char === "brackets") {
            if(bracketsOpen) {
                if(numbers.includes(lastCharacter()) || lastCharacter() === ")") {
                    ScreenText += ")";
                    closedBracketNum++;
                    bracketCloser();
                } else {
                    ScreenText += "(";
                    openBracketNum++;
                }
            } else {
                if(lastCharacter() && (numbers.includes(lastCharacter()) || lastCharacter() === ")")) {
                    ScreenText += "*";
                }
                ScreenText += "(";
                openBracketNum++;
                bracketsOpen = true;
            }
        } 
        // NUMBERS AND DECIMALS
        else if(numbers.includes(char) || char === ".") {
            // prevent multiple decimals in one number
            if(char === "." && lastNumberHasDecimal()) return;
            ScreenText += char;
        } 
        // OPERATORS
        else if(isOperator(char)) {
            if(ScreenText === "") return; // cannot start with operator
            if(isOperator(lastCharacter())) {
                // replace last operator with new one
                ScreenText = ScreenText.slice(0,-1) + char;
            } else {
                ScreenText += char;
            }
        }

        expression.textContent = ScreenText;
        output.textContent = "";
    });
});

// CHECK IF LAST NUMBER HAS DECIMAL
function lastNumberHasDecimal() {
    let i = ScreenText.length - 1;
    while(i >= 0 && !isOperator(ScreenText[i]) && ScreenText[i] !== "(" && ScreenText[i] !== ")") {
        if(ScreenText[i] === ".") return true;
        i--;
    }
    return false;
}

// EQUAL BUTTON
document.getElementById("equal").addEventListener("click", () => {
    try {
        let answer = shunting_yard(tokenize(ScreenText));
        output.textContent = "= " + answer;
    } catch {
        output.textContent = "Error";
    }
});

// CE BUTTON
document.getElementById("CE").addEventListener("click", () => {
    ScreenText = "";
    expression.textContent = "";
    output.textContent = "";
    bracketsOpen = false;
    openBracketNum = 0;
    closedBracketNum = 0;
});

// DEL BUTTON
document.getElementById("DEL").addEventListener("click", () => {
    const removedChar = ScreenText.slice(-1);
    ScreenText = ScreenText.slice(0, -1);

    if(removedChar === "(") openBracketNum--;
    if(removedChar === ")") closedBracketNum--;

    bracketCloser();
    expression.textContent = ScreenText;
    output.textContent = "";
});

// TOKENIZER AND SHUNTING YARD ALGORITHM
function tokenize(input) {
    let tokens = [];
    let tempNum = [];

    for(let char of input) {
        if(numbers.includes(char) || char === ".") {
            tempNum.push(char);
        } else if(operators.includes(char) || char === "(" || char === ")") {
            if(tempNum.length) {
                tokens.push(tempNum.join(""));
                tempNum = [];
            }
            tokens.push(char);
        }
    }
    if(tempNum.length) tokens.push(tempNum.join(""));
    return tokens;
}

function shunting_yard(tokens) {
    let opStack = [];
    let outQueue = [];
    let precedence = {"*":3,"/":3,"%":3,"+":2,"-":2};

    for(let token of tokens) {
        if(!isNaN(token)) {
            outQueue.push(parseFloat(token));
        } else if(token === "(") {
            opStack.push(token);
        } else if(token === ")") {
            while(opStack.length && opStack[opStack.length-1] !== "(") {
                outQueue.push(opStack.pop());
            }
            opStack.pop();
        } else if(token in precedence) {
            while(opStack.length && opStack[opStack.length-1] in precedence &&
                  precedence[opStack[opStack.length-1]] >= precedence[token]) {
                outQueue.push(opStack.pop());
            }
            opStack.push(token);
        }
    }

    while(opStack.length) outQueue.push(opStack.pop());

    // Evaluate postfix
    let stack = [];
    for(let token of outQueue) {
        if(typeof token === "number") stack.push(token);
        else {
            let b = stack.pop();
            let a = stack.pop();
            switch(token) {
                case "+": stack.push(a + b); break;
                case "-": stack.push(a - b); break;
                case "*": stack.push(a * b); break;
                case "/": stack.push(a / b); break;
                case "%": stack.push(a % b); break;
            }
        }
    }
    return stack.pop();
}
