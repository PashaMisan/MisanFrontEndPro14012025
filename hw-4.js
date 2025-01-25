//Дано два різні числа. Визначити, яке з них більше, а яке менше.
let a = +prompt("Enter the first number:");
let b = +prompt("Enter the second number:");

if (a > b) {
    alert(`${a} is greater, ${b} is smaller`);
} else if (a < b) {
    alert(`${b} is greater, ${a} is smaller`);
} else {
    alert(`Both numbers are equal: ${a}`);
}

//Відомі дві відстані. Одне у кілометрах, інше – у футах (1 фут = 0,305м). Яка відстань менша?
const km = +prompt("Enter the distance in kilometers:");
const feet = +prompt("Enter the distance in feet:");

const metersFeet = feet * 0.305;
const metersKm = km * 1000;

if (metersFeet < metersKm) {
    alert(`The distance in feet is smaller`);
} else if (metersFeet > metersKm) {
    alert(`The distance in kilometers is smaller`);
} else {
    alert(`Both distances are equal`);
}

//Визначити, чи є число a дільником числа b? І навпаки. (Дати дві відповіді)
a = +prompt("Enter the first number:");
b = +prompt("Enter the second number:");

const aIsDivisor = b % a === 0;
const bIsDivisor = a % b === 0;

alert(`${a} is a divisor of ${b}: ${aIsDivisor}`);
alert(`${b} is a divisor of ${a}: ${bIsDivisor}`);

//Дано число. Визначити, чи закінчується воно парною цифрою чи непарною? Вивести останню цифру.
let num = +prompt("Enter a number to check its last digit:");

const lastDigit = num % 10;

if (lastDigit % 2 === 0) {
    alert(`The last digit is ${lastDigit} (even)`);
} else {
    alert(`The last digit is ${lastDigit} (odd)`);
}

//Дано двозначне число. Визначити, яка з його цифр більша: перша чи друга?
num = +prompt("Enter a two-digit number:");

const firstDigit = num / 10 | 0;
const secondDigit = num % 10;

if (firstDigit > secondDigit) {
    alert("The first digit is greater");
} else if (secondDigit > firstDigit) {
    alert("The second digit is greater");
} else {
    alert("The digits are equal");
}

//Дано тризначне число.
num = +prompt("Enter a three-digit number:");

const hundreds = (num / 100) | 0;
const tens = ((num % 100) / 10) | 0;
const ones = num % 10;

const sum = hundreds+tens+ones;
const product = hundreds * tens * ones;

//Визначити чи є парною сума його цифр.
if (sum % 2 === 0) {
    alert("The sum of the digits is even");
} else {
    alert("The sum of the digits is odd");
}

//Визначити, чи кратна сума цифр п'яти
if (sum % 5 === 0) {
    alert("The sum of the digits is divisible by 5");
} else {
    alert("The sum of the digits is not divisible by 5");
}

//Визначити чи є добуток його цифр більше 100
if (product > 100) {
    alert("The product of the digits is greater than 100");
} else if (product < 100) {
    alert("The product of the digits is less than 100");
} else {
    alert("The product of the digits is exactly 100");
}

const allSame = ones === tens && tens === hundreds;
const hasDuplicates = ones === tens || ones === hundreds || tens === hundreds;

// Чи правда, що всі цифри однакові?
if (allSame) {
    alert("All digits are the same");
} else {
    alert("All digits are not the same");
}/**/

// Чи є серед цифр цифри однакові?
if (hasDuplicates) {
    alert("There are duplicate digits");
} else {
    alert("All digits are unique");
}

//Визначити, чи є задане шестизначне число дзеркальним?
const numStr = prompt("Enter a six-digit number:");

if (numStr === numStr.split("").reverse().join("")) {
    alert("The number is a palindrome");
} else {
    alert("The number is not a palindrome");
}
