//function to add two operators
function add( a: number, b: number){
    return a + b;
}
  
  //function to subtract two operators
function subtract(a: number , b: number){
    return a-b;
}
  
  //function to multiply two operators
function multiply(a: number,b: number){
    return a * b;
}
  
  //function to divide two operators.
function divide(a: number,b: number){
    if(b==0){
        return null;
    } 
    else
        return a/b;
}

//function to calculate 2 operands and one operator
function operate(num1: number, operator: string, num2: number){

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


//function that will return a number that will be used to iterate over a expression that will replace
//higher order of operations into a more simple expression that can be read from left to right.
function orderOfOperationsCount(array: string[]){

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


let numberOne,numberTwo=0;
let operator='';

  
  //function to test for operator hiearchy
  function OOP_Reduction(array: string[]){
  
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

  export function calculateExpression(arrayExpression: any[]): number{

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