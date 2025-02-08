// Вивести на сторінку в один рядок через кому числа від 10 до 20
let output = "";

for (let i = 10; i <= 20; i++) {
    output += i + (i < 20 ? ", " : "");
}

console.log(output);

// Вивести квадрати чисел від 10 до 20
output = "";

for (let i = 10; i <= 20; i++) {
    output += i ** 2 + (i < 20 ? ", " : "");
}

console.log(output);

// Вивести таблицю множення на 7
for (let i = 1; i <= 10; i++) {
    console.log(`7 * ${i} = ${7 * i}`);
}

// Знайти суму всіх цілих чисел від 1 до 15
let sum = 0;

for (let i = 1; i <= 15; i++) {
    sum += i;
}
console.log("Сума від 1 до 15:", sum);

// Знайти добуток усіх цілих чисел від 15 до 35
let product = 1;

for (let i = 15; i <= 35; i++) {
    product *= i;
}
console.log("Добуток від 15 до 35:", product);

//Знайти середнє арифметичне всіх цілих чисел від 1 до 500
let totalSum = 0;

for (let i = 1; i <= 500; i++) {
    totalSum += i;
}

console.log("Середнє арифметичне від 1 до 500:", totalSum / 500);

// Вивести суму лише парних чисел у діапазоні від 30 до 80
let evenSum = 0;

for (let i = 30; i <= 80; i++) {
    if (i % 2 === 0) evenSum += i;
}

console.log("Сума парних чисел від 30 до 80:", evenSum);

// Вивести всі числа в діапазоні від 100 до 200, які кратні 3
output = "";

for (let i = 100; i <= 200; i++) {
    if (i % 3 === 0) output += i + (200 - i < 3 ? "" : ", ");
}

console.log("Числа, кратні 3 від 100 до 200:", output);

// Дано натуральне число. Знайти та вивести на сторінку всі його дільники.
let num = 36;
output = "";

for (let i = 1; i <= num; i++) {
    if (num % i !== 0) continue;

    output += output === "" ? i : ", " + i;
}

console.log(`Дільники числа ${num}:`, output);

// Визначити кількість його парних дільників
let evenDivisorsCount = 0;

for (let i = 1; i <= num; i++) {
    if (num % i === 0 && i % 2 === 0) evenDivisorsCount++;
}

console.log(`Кількість парних дільників числа ${num}:`, evenDivisorsCount);

// Знайти суму його парних дільників
let evenDivisorsSum = 0;

for (let i = 1; i <= num; i++) {
    if (num % i === 0 && i % 2 === 0) evenDivisorsSum += i;
}

console.log(`Сума парних дільників числа ${num}:`, evenDivisorsSum);

// Надрукувати повну таблицю множення від 1 до 10
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        console.log(`${i} * ${j} = ${i * j}`);
    }
    console.log("");
}


