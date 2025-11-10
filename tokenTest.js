function tokenize(input) {
    let tokens = [];
    let tempNum = [];
    let numbers = ["0","1","2","3","4","5","6","7","8","9","."];
    let operators = ["*", "+", "-", "/", "%", "(", ")"];

    for (let char of input) {
        if (numbers.includes(char)) {
            tempNum.push(char);
        } else if (operators.includes(char)) {
            if (tempNum.length) {
                tokens.push(tempNum.join(""));
                tempNum = [];
            }
            tokens.push(char);
        }
    }
    if (tempNum.length) {
        tokens.push(tempNum.join(""));
    }
    return tokens;
}

function shunting_yard(tokens) {
    let operatorStack = [];
    let output = [];
    let precedence = { "*": 3, "/": 3, "+": 2, "-": 2 };

    for (let token of tokens) {
        if (!isNaN(token)) {
            output.push(token);
        } else if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(") {
                output.push(operatorStack.pop());
            }
            operatorStack.pop(); // remove "("
        } else if (token in precedence) {
            while (
                operatorStack.length &&
                (operatorStack[operatorStack.length - 1] in precedence) &&
                precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
            ) {
                output.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    }

    // Flush remaining operators
    while (operatorStack.length) {
        output.push(operatorStack.pop());
    }

    console.log("Postfix output:", output);

    // Evaluate postfix
    let stack = [];
    for (let token of output) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            switch (token) {
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
let tokenisedInput = tokenize("3+(4*(2-1)*6)+8");
console.log("Result =", shunting_yard(tokenisedInput));