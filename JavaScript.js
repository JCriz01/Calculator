
function add( a, b){
    return a + b;
}

function subtract(a , b){
    return a-b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a/b;
}

function operate(num1, operator, num2){

    if(operator==='+'){
        add(num1,num2);
    }
    else if(operator==='-'){
        subtract(num1,num2);
    }
    else if(operator==='*'){
        multiply(num1,num2);
    }
    else if(operator==='/'){
        divide(num1,num2);
    }
}

function buttonHandler(string){
    console.log(`display string: ${string}`);
    if(string==='Clear')
        outputMessage.textContent='';
    else{
        displayString +=string;
        outputMessage.textContent+=string;
    }


}

let numberOne,numberTwo=0;
let operator='';
let displayString='';

const parentElement=document.querySelector('.calculator-Body');


const outputMessage=document.querySelector('.output-box').children[0];
outputMessage.textContent='';

const buttons=parentElement.querySelectorAll('button');


buttons.forEach((buttonItem)=>{
    buttonItem.addEventListener('click',()=>{
        console.log(buttonItem.textContent);
        let calcBtnStr=buttonItem.textContent;
        buttonHandler(calcBtnStr);

    });
});