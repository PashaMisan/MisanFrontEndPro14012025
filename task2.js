const num1 = +prompt("Enter the first number:");
const num2 = +prompt("Enter the second number:");

const sum = num1 + num2;
const difference = num1 - num2;
const product = num1 * num2;
const quotient = num2 !== 0 ? num1 / num2 : "Division by zero is not allowed!";

alert(
    "Results:\n" +
    "Sum: " + sum + "\n" +
    "Difference: " + difference + "\n" +
    "Product: " + product + "\n" +
    "Quotient: " + quotient
);
