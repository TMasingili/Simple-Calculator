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




