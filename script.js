let input = document.querySelector("#input");
let buttons = document.querySelectorAll("button");

buttons.forEach(element => {
    element.addEventListener("click", (e) => {
        let buttonText = e.target.textContent;
        
        if (buttonText === "C") {
            input.innerText = "";
        } else if (buttonText === "<") {
            input.innerText = input.innerText.slice(0, -1);
        } else if (buttonText === "=") {
            try {
                input.innerText = evaluateExpression(input.innerText);
            } catch (error) {
                input.innerText = "Error";
            }
        } else if (["sin", "cos", "tan", "log", "ln", "√"].includes(buttonText)) {
            input.innerText += buttonText + "(";
        } else if (buttonText === "π") {
            input.innerText += Math.PI;
        } else if (buttonText === "e") {
            input.innerText += Math.E;
        } else {
            input.innerText += buttonText;
        }
        
        input.scrollLeft = input.scrollWidth;
    });
});

function evaluateExpression(expr) {
    expr = expr.replace(/sin/g, "Math.sin");
    expr = expr.replace(/cos/g, "Math.cos");
    expr = expr.replace(/tan/g, "Math.tan");
    expr = expr.replace(/log/g, "Math.log10");
    expr = expr.replace(/ln/g, "Math.log");
    expr = expr.replace(/√/g, "Math.sqrt");
    expr = expr.replace(/\^/g, "**");
    
    return Function('"use strict";return (' + expr + ')')();
}