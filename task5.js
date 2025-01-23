const number = +prompt("Enter a five-digit number:");

const  digit1 = (number % 100000) / 10000 | 0;
const  digit2 = (number % 10000) / 1000 | 0;
const  digit3 = (number % 1000) / 100 | 0;
const  digit4 = (number % 100) / 10 | 0;
const  digit5 = number % 10;

alert(digit1 + " " + digit2 + " " + digit3 + " " + digit4 + " " + digit5);
