import { calculateExpression } from "./calculator";

let expressionString='';

//array will contain strings that will be mixed of operators and operands
let calcQueue: string[]=[];
//this array will have numbers and operands
let mathematicsOperationsArray: string[]=[];


//const parentElement: HTMLDivElement| null=document.querySelector('.calculator-Body');


const outputMessage=document.querySelector('.output-box')!.children[0];
outputMessage.textContent='';


//function to delete array
function deleteArray(array: string[]){
    for(let i=array.length; i>=0 ; i--){
        array.shift();
    }
    return array;
}

//this function will concatenate individual numbers into proper form.
//for example ['1,'3','+',1','5','='] to ['13','+','15'] 
function evaluateExpressions(arrayString: string[] ): number{

    let expression='';//the parameter is an array, this string will concatenate it into a long string

    let firstNumberString='';
    let secondNumberString='';
    let total=0;
    let expressionCount=0;
    let indexCount=0;
   
  
  
    for(let i=arrayString.length-1, index=0; i >=0; i--, index++){
  
        if(arrayString[index]!=' '){
  
  
            if(arrayString[index]==='+'){
                mathematicsOperationsArray.push(expression);
                mathematicsOperationsArray.push(arrayString[index]);
                expression='';
                //console.log(`math stack ${mathematicsOperationStack}`);
                index+=1;//skipping this index
            
            }
            if(arrayString[index]==='-'){
                mathematicsOperationsArray.push(expression);
                mathematicsOperationsArray.push(arrayString[index]);
                expression='';
                //console.log(`math stack ${mathematicsOperationStack}`);
                index+=1;//skipping this index
            
            }
            if(arrayString[index]==='*'){
                mathematicsOperationsArray.push(expression);
                mathematicsOperationsArray.push(arrayString[index]);
                expression='';
                //console.log(`math stack ${mathematicsOperationStack}`);
                index+=1;//skipping this index
            
            }
            if(arrayString[index]==='/'){
                mathematicsOperationsArray.push(expression);
                mathematicsOperationsArray.push(arrayString[index]);
                expression='';
                //console.log(`math stack ${mathematicsOperationStack}`);
                index+=1;//skipping this index
            
            }
            if(arrayString[index]==='='){
                mathematicsOperationsArray.push(expression);
                mathematicsOperationsArray.push('=');
                console.log(`math stack is ${mathematicsOperationsArray}`);
  
                console.log('Done with the calcuation(pressed =)');
  
                return calculateExpression(mathematicsOperationsArray);   
            }
            else{
                
                expression+=arrayString[index];
                indexCount+=1;
                console.log(`Index ${index}, expression is: ${expression}`);
                
            }
  
  
        }

    }
}
  

//function that will handle every button click that the user presses on the calculators keypad
export function buttonHandler(string: string){

    //console.log(`display string: ${string}`);
    if(string==='Clear'){
        outputMessage.textContent='';
        expressionString='';
        calcQueue=deleteArray(calcQueue);
        //console.log(`arrayStack: ${arrayStack}`);
        mathematicsOperationsArray =deleteArray(mathematicsOperationsArray);
    }
    else if(string==='.'){
  
  
        for(let i=0;i<expressionString.length; i++){
            if(expressionString[i] =='.'){
                expressionString='ERROR';
                calcQueue=deleteArray(calcQueue);
                mathematicsOperationsArray=deleteArray(mathematicsOperationsArray);
                outputMessage.textContent=expressionString;
                expressionString='';
            }
        }
        expressionString+=string;
        calcQueue.push(string);
        
        outputMessage.textContent+=string;
        
    }
    else if(string==='='){

        //pushing string to queue
        calcQueue.push(string);

        let total=evaluateExpressions(calcQueue);

        calcQueue=deleteArray(calcQueue);
        calcQueue.push("" + total);

        mathematicsOperationsArray=deleteArray(mathematicsOperationsArray);
        console.log(`The total is ${total}, the calculation queue is ${calcQueue}`);
        if(total !== null)
            outputMessage.textContent=""+total;
        else
            outputMessage.textContent='Not on my watch!';
        
    }
    
    //the button that is clicked is a regular operand and operator(minus the '=')
    else{
        outputMessage.textContent+=string;
        expressionString+=string;
  
        calcQueue.push(string);
        console.log(`Calculation Queue is: ${calcQueue}`);
  
    }
  
}

//starting point of the program
export function start(){
    const parentElement: HTMLDivElement| null=document.querySelector('.calculator-Body');


    const buttons=parentElement!.querySelectorAll('button');

    const calculatorBody: HTMLDivElement=document.querySelector('.calculator-Body');

    calculatorBody.addEventListener('click',(Event: Event)=>{
        let target=Event.target;

        if(target.localName=='button'){
            console.log(target.textContent);

            let calcBtnString=target.textContent;
            buttonHandler(calcBtnString);
        }

    });
}