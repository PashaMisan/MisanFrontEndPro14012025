// Вивести числа від 20 до 30 через пропуск використовуючи крок 0,5 (20 20,5 21 21,5….)
let output = '';

for (let i = 20; i <= 30; i += 0.5) {
    output += output ? ' ' + i : i;
}

console.log(output);

// Один долар коштує 40 гривень. Вивести дані з розрахунком вартості 10, 20, 30... 100 доларів
const dollarToUah = 40;

for (let dollars = 10; dollars <= 100; dollars += 10) {
    let priceInUah = dollars * dollarToUah;

    console.log(`${dollars} доларів = ${priceInUah} гривень`);
}

// Дано ціле число. Вивести всі цілі числа від 1 до 100, квадрат яких не перевищує числа N
let number = 50;

for (let i = 1; i <= 100; i++) {
    if (i ** 2 <= number) {
        console.log(i);
    }
}

// Дано ціле число. З'ясувати, чи воно простим (простим називається число, більше ніж 1, які мають інших дільників крім 1 і себе).
let isPrime = true;
number = 37;

for (let i = 2; i < number; i++) {
    if (number % i === 0) {
        isPrime = false;
        break;
    }
}

console.log(isPrime ? `${number} є простим числом` : `${number} не є простим числом`);

// Дано деяке число. Ваше завдання – визначити, чи можна отримати це число, піднявши число 3 до певного натурального ступеня.
// (Як приклад, числа 9 та 81 можна отримати цим способом, але 13 – ні.)
number = 27;

while (number % 3 === 0 && number > 1) {
    number /= 3;
}

console.log(number === 1 ? 'Число можна отримати як ступінь числа 3' : 'Число не можна отримати як ступінь числа 3');


