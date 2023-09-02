import './style.css';

import { buttonHandler } from './controller';
const parentElement: HTMLDivElement| null=document.querySelector('.calculator-Body');
const outputMessage=document.querySelector('.output-box')!.children[0];
outputMessage.textContent='';

const buttons=parentElement!.querySelectorAll('button');

//iterating over the buttons on the calculator
buttons.forEach((buttonItem)=>{
  buttonItem.addEventListener('click',()=>{
      console.log(buttonItem.textContent);
      let calcBtnStr=buttonItem.textContent;
      buttonHandler(calcBtnStr);//calling function that will handle the logic for the math

  });
});