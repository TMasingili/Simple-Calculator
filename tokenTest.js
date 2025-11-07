
function tokenize(input){
   let tokens= [];
   let tempNum=[];
   let numbers = ["0","1","2","3","4","5","6","7","8","9","."]; // list of numbers used in caculator
   let operators = ["*","+","-","/","%","(",")","del"]

   for( let char of input){
      if(numbers.includes(char)){
        tempNum.push(char);
      }
      else if(operators.includes(char)){
        if(tempNum.length){
            tokens.push(tempNum.join(""));
            tempNum=[];
        }
         tokens.push(char)
        }
   }
    if(tempNum.length){
         tokens.push(tempNum.join(""));
    }
   return tokens;
}


function shunting_yard(tokens){
    let operatorStack =[];
    let output =[];
    let result=[];


    let precedence ={
        "*":3,
        "/":3,
        "+":2,
        "-":2
    }

    // actual work
    for(let token of tokens){
        if(token in precedence){
            while(operatorStack.length){
                let topOperator = operatorStack[operatorStack.length-1]; // get operator at the top
                if(precedence[token]>precedence[topOperator]){
                    break;
                }
                operatorStack.pop();
                output.push(topOperator);
            }
            operatorStack.push(token);
        }
        else{
            output.push(token); // push directly to ouput
        }
    }
     while(operatorStack.length){
            output.push(operatorStack.pop());
     }
     console.log("output = "+ output);

    for( let element of output){
        if(!(element in precedence)){
            result.push(parseFloat(element));
        }
        else{
            let right = result.pop();
            let left = result.pop();
            if (element == "+"){
                result.push(left + right);
            }
            if(element == "-"){
                result.push(left - right);
            }

            if( element == "/"){
                result.push(left/right);
            }
            if(element=="*"){
                result.push(left*right);
            }
        }
    }
    console.log(result)
    return result.pop();

}

let tokenisedInput = tokenize("1+4*2-5");
console.log(shunting_yard(tokenisedInput));




