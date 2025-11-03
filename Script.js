/* try to make things appear on the caltulator screen
use a query selector to make caltulator elemts appear on the screen when clicked
*/
const visible = document.querySelectorAll(".visible");// anything that can appear on the screen
const screen = document.getElementById("screen");
let ScreenText="";

visible.forEach(element=>{
    element.addEventListener("click", event=>{
        ScreenText+=element.id;
        screen.textContent = ScreenText;
    })
})

