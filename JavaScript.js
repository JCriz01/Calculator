//function to add two operators
function add( a, b){
    return a + b;
}

//function to subtract two operators
function subtract(a , b){
    return a-b;
}

//function to multiply two operators
function multiply(a,b){
    return a * b;
}

//functoin to divide two operators.
function divide(a,b){
    return a/b;
}

//function to calculate 2 operands and one operator
function operate(num1, operator, num2){

    if(operator==='+'){
        return add(num1,num2);
    }
    else if(operator==='-'){
        return subtract(num1,num2);
    }
    else if(operator==='*'){
        return multiply(num1,num2);
    }
    else if(operator==='/'){
        return divide(num1,num2);
    }
}

let numberOne,numberTwo=0;
let operator='';
let expressionString='';
let arrayStack=[];
let mathematicsOperationStack=[];

let tempstack=[];

//function to delete array
function deleteArray(array){
    for(let i=array.length; i>=0 ; i--){
        array.shift();
    }
    return array;
}

function calculateExpression(arrayExpression){

    let index=0;

    let total=0;

    while(arrayExpression[1]==='='){

        
        numberOne=Number(arrayExpression[0]);
        arrayExpression.shift();
      

        operator=arrayExpression[0];
        arrayExpression.shift();
        

        
        numberTwo=Number(arrayExpression[0]);
        arrayExpression.shift();
            
        
        let StringNumber=operate(numberOne,operator,numberTwo);
        arrayExpression.unshift(  StringNumber.toString() );
    }
    
    return Number(arrayExpression[0]);
    
}

//function to test for operator hiearchy
function testing(array){

    //finding the index of a multiplication or division
    let operatorIndex=array.indexOf('*');
    let divisionIndex=array.indexOf('/');

    if(operatorIndex < divisionIndex){
        numberOne=Number(array[operatorIndex-1]);
        array[operatorIndex-1]='!';
      

        operator=array[operatorIndex];
        array[operatorIndex]='!';
        

        
        numberTwo=Number(array[operatorIndex+1]);
        array[operatorIndex+1]='!';
            
        
        let StringNumber=operate(numberOne,operator,numberTwo);
        
        let arrayLength=array.length-3;
        let primeIndex=operatorIndex-1;
        array=array.filter( item=>{
            if(item != '!')
                return item;
        } );

        array.unshift(  StringNumber.toString() );
    }

}


function evaluateExpressions(arrayString){
    let expression='';//the parameter is an array, this string will concatenate it into a long string
    let firstNumberString='';
    let secondNumberString='';
    let total=0;
    let expressionCount=0;
    let indexCount=0;
   


    for(let i=arrayString.length-1, index=0; i >=0; i--, index++){

        if(arrayString[index]!=' '){


            if(arrayString[index]==='+'){
                mathematicsOperationStack.push(expression);
                mathematicsOperationStack.push(arrayString[index]);
                expression='';
                //console.log(`math stack ${mathematicsOperationStack}`);
                index+=1;//skipping this index
            
            }
            if(arrayString[index]==='-'){
                mathematicsOperationStack.push(expression);
                mathematicsOperationStack.push(arrayString[index]);
                expression='';
                //console.log(`math stack ${mathematicsOperationStack}`);
                index+=1;//skipping this index
            
            }
            if(arrayString[index]==='*'){
                mathematicsOperationStack.push(expression);
                mathematicsOperationStack.push(arrayString[index]);
                expression='';
                //console.log(`math stack ${mathematicsOperationStack}`);
                index+=1;//skipping this index
            
            }
            if(arrayString[index]==='/'){
                mathematicsOperationStack.push(expression);
                mathematicsOperationStack.push(arrayString[index]);
                expression='';
                //console.log(`math stack ${mathematicsOperationStack}`);
                index+=1;//skipping this index
            
            }
            if(arrayString[index]==='='){
                mathematicsOperationStack.push(expression);
                mathematicsOperationStack.push('=');
                console.log(`math stack ${mathematicsOperationStack}`);

                console.log('Expression here is done, the rest DO NOT MATTER   IGNORE THEM');

                return calculateExpression(mathematicsOperationStack);

                
            }
            else{
                expression+=arrayString[index];
                indexCount+=1;
                console.log(`Index ${index}, expression is: ${expression}`);
                
            }


        }
    }
}

//function to create number from a string


//function that will handle every button click that the user presses on the calculators keypad
function buttonHandler(string){

    console.log(`display string: ${string}`);
    if(string==='Clear'){
        outputMessage.textContent='';
        expressionString='';
        arrayStack=deleteArray(arrayStack);
        console.log(`arrayStack: ${arrayStack}`);
        mathematicsOperationStack =deleteArray(mathematicsOperationStack);
    }
    else if(string==='.'){


        for(let i=0;i<expressionString.length; i++){
            if(expressionString[i] =='.'){
                expressionString='ERROR';
                arrayStack=deleteArray(arrayStack);
                outputMessage.textContent=expressionString;
                expressionString='';
            }
        }
        expressionString+=string;
        arrayStack.push(string);
        outputMessage.textContent+=string;
        
    }
    else{


        if(string==='+'){
            //let tempString=expressionString;
            //for(let i=expressionString.length; i>=0; i++ ){
            //
            //}
            //mathematicsOperationStack.push(expressionString);
            //console.log(`math stack: ${mathematicsOperationStack}`);
            //mathematicsOperationStack.push(arrayStack[arrayStack.indexOf('+')]);
        }

        if(string==='='){

            arrayStack.push(string);
            total=evaluateExpressions(arrayStack);
            outputMessage.textContent=total;
            //uncomment if function does not work.
            //for(let i=0;i<expressionString.length; i++){
            //    if(expressionString[i] !=='=')
            //        string+=arrayString[i];
            //}
            
        }
        else{
            outputMessage.textContent+=string;
            expressionString+=string;
            arrayStack.push(string);
            console.log(`arrayStack: ${arrayStack}`);

        }
    }
        


}

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

let thisisatestforgithub='this is a test for pull requests';