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

//function to divide two operators.
function divide(a,b){
    if(b==0){
        return null;
    } 
    else
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

//function that will return a number that will be used to iterate over a expression that will replace
//higher order of operations into a more simple expression that can be read from left to right.
function orderOfOperationsCount(array){

    let divisionCount=0;
    let multiplicationCount=0;

    for(let i=0; i < array.length; i++){
        if(array[i]==='*'){
            multiplicationCount++;
        }
        else if(array[i]==='/')
            divisionCount++;

    }
    return multiplicationCount + divisionCount;
}


function calculateExpression(arrayExpression){

    let index=0;

    let total=orderOfOperationsCount(arrayExpression);

    while(arrayExpression.length >1){

        for(let i=0; i < total; i++){
            arrayExpression=OOP_Reduction(arrayExpression);
        }
        
        numberOne=Number(arrayExpression[0]);
        arrayExpression.shift();
      

        if(arrayExpression[0]=='=')
            return numberOne;
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
function OOP_Reduction(array){

    //finding the index of a multiplication or division
    let multiplicationIndex=array.indexOf('*');
    let divisionIndex=array.indexOf('/');


    //if multiplication AND division is found in the expression
    if (divisionIndex !==-1 && multiplicationIndex !==-1){

        //order of operations is from left to right if they are of the same order, ie *,/.
        //in this case, multiplication is before division.
        if(multiplicationIndex < divisionIndex){
            numberOne=Number(array[multiplicationIndex-1]);
            array[multiplicationIndex-1]='!';
          
    
            operator=array[multiplicationIndex];
            array[multiplicationIndex]='!';
            
    
            
            numberTwo=Number(array[multiplicationIndex+1]);
            array[multiplicationIndex+1]='!';
                
            
            let StringNumber=operate(numberOne,operator,numberTwo);
            
            array=array.filter( item=>{
                if(item != '!')
                    return item;
            });
            array.splice(multiplicationIndex-1,0,StringNumber);
    
            return array;
        }

        //division is found before multiplication
        else if(divisionIndex < multiplicationIndex){

            numberOne=Number(array[divisionIndex-1]);
            array[divisionIndex-1]='!';
          
    
            operator=array[divisionIndex];
            array[divisionIndex]='!';
            
    
            
            numberTwo=Number(array[divisionIndex+1]);
            array[divisionIndex+1]='!';
                
            
            let StringNumber=operate(numberOne,operator,numberTwo);
            
            array=array.filter( item=>{
                if(item != '!')
                    return item;
            });

            array.splice(divisionIndex-1,0,StringNumber);
    
            return array;
        }

    }

    //if multiplication is only found in the expression
    else if(multiplicationIndex !==-1){
        numberOne=Number(array[multiplicationIndex-1]);
        array[multiplicationIndex-1]='!';
          
    
        operator=array[multiplicationIndex];
        array[multiplicationIndex]='!';
            
    
            
        numberTwo=Number(array[multiplicationIndex+1]);
        array[multiplicationIndex+1]='!';
                
            
        let StringNumber=operate(numberOne,operator,numberTwo);
            
        array=array.filter( item=>{
            if(item != '!')
                return item;
            });
    

        array.splice(multiplicationIndex-1,0,StringNumber);
    
        return array;
    }
    //if division is only found in the expression
    else if(divisionIndex !== -1){

        numberOne=Number(array[divisionIndex-1]);
        array[divisionIndex-1]='!';
          
    
        operator=array[divisionIndex];
        array[divisionIndex]='!';
            
    
            
        numberTwo=Number(array[divisionIndex+1]);
                array[divisionIndex+1]='!';
                
            
        let StringNumber=operate(numberOne,operator,numberTwo);
            
        array=array.filter( item=>{
            if(item != '!')
                return item;
        });

        array.splice(divisionIndex-1,0,StringNumber);
    
        return array;

    }
    //no division and multiplication is found in the expression
    else
        return array;

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

    //console.log(`display string: ${string}`);
    if(string==='Clear'){
        outputMessage.textContent='';
        expressionString='';
        arrayStack=deleteArray(arrayStack);
        //console.log(`arrayStack: ${arrayStack}`);
        mathematicsOperationStack =deleteArray(mathematicsOperationStack);
    }
    else if(string==='.'){


        for(let i=0;i<expressionString.length; i++){
            if(expressionString[i] =='.'){
                expressionString='ERROR';
                arrayStack=deleteArray(arrayStack);
                mathematicsOperationStack=deleteArray(mathematicsOperationStack);
                outputMessage.textContent=expressionString;
                expressionString='';
            }
        }
        expressionString+=string;
        arrayStack.push(string);
        
        outputMessage.textContent+=string;
        
    }
    
    else{

        if(string==='='){

            arrayStack.push(string);
            total=evaluateExpressions(arrayStack);

            if(total !==null)
                outputMessage.textContent=total;
           else
                outputMessage.textContent='Not on my watch!';
            
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

//iterating over the buttons on the calculator
buttons.forEach((buttonItem)=>{
    buttonItem.addEventListener('click',()=>{
        console.log(buttonItem.textContent);
        let calcBtnStr=buttonItem.textContent;
        buttonHandler(calcBtnStr);//calling function that will handle the logic for the math

    });
});
