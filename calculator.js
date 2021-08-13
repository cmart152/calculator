const btns = document.querySelectorAll('button');
const calcBody=document.querySelector('#calcBody');
const display= document.querySelector('#display');
const numBtns = document.querySelectorAll('.numButton');
const opBtns = document.querySelectorAll('.opButton');
const equalBtn = document.querySelector('#equal');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');


let displayValue = undefined;
let firstValue = undefined;
let operatorValue = undefined;


numBtns.forEach((button)=> {
    button.addEventListener('click', (e)=> {
        if (displayValue == undefined){
            displayValue = e.target.innerText;            //Numbers populate the screen and are stored in variables
            display.append(e.target.innerText);
        }else{
            display.append(e.target.innerText);
            displayValue += e.target.innerText;
        }
    });
});


opBtns.forEach((button)=> {
    button.addEventListener('click', (e) => {
        if (operatorValue != undefined && displayValue == undefined) {
            operatorValue = convertOperator(e.target.innerText);                //This changes the operator if you havent entered the second number
            display.innerText = display.innerText.slice(0, -1);
            display.append(e.target.innerText);
        }else if(firstValue == undefined){
            display.append(e.target.innerText);
            firstValue = displayValue;
            displayValue = undefined;                                            //This moves the display number into a variable named firstValue
            operatorValue = convertOperator(e.target.innerText);                 //when an operator is pressed with empty second number
        }else{
            let result = operate(operatorValue, firstValue, displayValue);
            if (result == Infinity){
                display.style.fontSize = '50px';
                display.innerText = 'You can\'t do that you fool!'
            }else{
            firstValue = result;
            display.innerText = result += e.target.innerText;
            displayValue = undefined                                             //If both numbers and the operator are already entered, this will calculate the sum                                                                                
            operatorValue = convertOperator(e.target.innerText);                 //and return the result as the fist number with the operator you pressed
                }
            }; 
        });
});


    equalBtn.addEventListener('click', () => {
            if (operatorValue == undefined || firstValue == undefined || displayValue == undefined){
                return
            }else{
                let result = operate(operatorValue, firstValue, displayValue);
                if (result == Infinity){
                    display.style.fontSize = '50px';
                    display.innerText = 'You can\'t do that you fool!'
                }else{
                displayValue = result;
                firstValue = undefined;                                                     //calculates the sum and returns the result on screen and as the                                                                                          
                operatorValue = undefined;                                                  //first displayValue for the next calculation
                display.innerText = result;
                }   
            }
    });


    clearBtn.addEventListener('click', () => {
        firstValue = undefined;                                   //Clears everything
        displayValue = undefined;
        operatorValue = undefined;
        display.innerText = '';
        display.style.fontSize = '120px';
    });


    deleteBtn.addEventListener('click', () => {
        
        if(operatorValue == undefined && firstValue == undefined){
            if(displayValue == undefined){                                                      //Deletes numbers and operator from the display individually                                                                                                
                return                                                                          //and in the corresponding variables and moves variables as necessary
            }else {display.innerText = display.innerText.slice(0, -1);
                   displayValue = displayValue.slice(0,-1);
                   if(displayValue == ''){
                       displayValue = undefined;
                   }
            }
        }else if (displayValue == undefined || displayValue == '' && operatorValue != undefined){
            operatorValue = undefined;
            displayValue = firstValue;
            firstValue = undefined;
            display.innerText = display.innerText.slice(0, -1);
        }else if (firstValue != undefined && operatorValue != undefined){
            displayValue = displayValue.slice(0, -1);
            display.innerText = display.innerText.slice(0, -1);
            if (displayValue == ''){
                displayValue = undefined;
            }
            
        };
    });


function operate(operator,a,b) {
    result =  parseFloat(operator(Number(a),Number(b)).toFixed(6));
    return result.toString();
};


function add(a, b){
    return a+b;
};
function subtract(a, b){
    return a-b;
};
function divide(a, b){
    return a/b;
};
function multiply(a, b){
    return a*b;
};


function convertOperator (operator) {

    switch (operator) {
        case 'x': return multiply;
        break;
        case '/': return divide;                //used to convert string content of HTML buttons into function names
        break;
        case '-': return subtract;
        break;
        case '+': return add;
        break;
    };
};