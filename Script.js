/* try to make things appear on the caltulator screen
use a query selector to make caltulator elemts appear on the screen when clicked
*/
const visible = document.querySelectorAll(".visible");// anything that can appear on the screen
const screen = document.getElementById("screen");
let ScreenText="";
let bracketsOpen = false;// help determine if brackets are opened or closed
let numbers = ["0","1","2","3","4","5","6","7","8","9"]; // list of numbers used in caculator
let openBracketNum =0;
let closedBracketNum = 0;// keep track of the number of open or closed brackets

visible.forEach(element=>{ // add an evem lestener for all elements that can appear on the screen
    element.addEventListener("click", event=>{
      
        if(element.id === "brackets"){// deal with implementing brackets
            //console.log("now dealing with brackets")
            if(bracketsOpen==true){ // case where brackets are opened
                console.log("brackets are open");
                if(numbers.includes(lastCharacter()) || lastCharacter()==")"){// if the bracket follows a didgit, then close bracket
                    ScreenText+=")";
                    closedBracketNum++;
                    console.log("ClosedBracketNum: "+ closedBracketNum)
                    bracketCloser()// set bracketsOpen to false if brackets match
                } 
                if(lastCharacter()=="("){
                    ScreenText+="(";
                    openBracketNum++;
                }
            }else{
                if(lastCharacter()==")"){
                    ScreenText+="X";
                }
                console.log(" i came here");
                ScreenText+="(";
                openBracketNum++;
                console.log("OpenBrackets NUM : "+openBracketNum)
                bracketsOpen=true;
                console.log("i swicthed on the brackets");
           }
        }else{
            ScreenText+=element.id;
        }
        screen.textContent = ScreenText;
        
    })
})
// add functionality to eqaul button
document.getElementById("equal").addEventListener("click",event=>{
    try{
        let answer = shunting_yard(tokenize(ScreenText));
        console.log("this is the answer"+answer);
    }catch{

    }
})

function bracketCloser(){
    if(openBracketNum==closedBracketNum && openBracketNum!=0 && closedBracketNum!=0){
        bracketsOpen=false;
        console.log("now the brackets are equal")
    }
}

function lastCharacter(){
    return ScreenText[ScreenText.length-1];
}
// function to return sum of 2 numbers
 function add (a,b) {
    return parseFloat(a) + parseFloat(b);
}
// return a - b
function subract(a,b){
    return parseFloat(a) - parseFloat(b);
}

// devide 2 numbers
function devide(a,b){
    return parseFloat(a)/parseFloat(b);
}

// divide a by 100
 function percentage(a){
    parseFloat(a)/100;
 }
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



