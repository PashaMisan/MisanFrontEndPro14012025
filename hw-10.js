// Створити масив, довжину та елементи якого задає користувач.
let length = 0;
let array = [];

do {
    length = +(prompt("Введіть довжину масиву:"));
} while (isNaN(length) || length < 0);

for (let i = 0; i < length; i++) {
    let value = prompt(`Введіть елемент ${i + 1}:`);

    array.push(value);
}

console.log("Масив до сортування:", array);

// Потім відсортувати масив за зростанням.
array.sort();

console.log("Масив після сортування:", array);

// Потім видалити елементи з масиву з 2 по 4 (включно)
array.splice(1, 3);

console.log("Масив після видалення елементів з 2 по 4:", array);

// Дано масив [16,-37,54,-4,72,-56,47,4,-16,25,-37,46,4,-51,27,-63,4,-54,76,-4,12,-35,4,47]
array = [16, -37, 54, -4, 72, -56, 47, 4, -16, 25, -37, 46, 4, -51, 27, -63, 4, -54, 76, -4, 12, -35, 4, 47];

// Знайти суму та кількість позитивних елементів.
let sum = 0;
let count = 0;

array.forEach(num => {
    if (num > 0) {
        sum += num;
        count++;
    }
});

console.log(`Сума позитивних елементів: ${sum}`);
console.log(`Кількість позитивних елементів: ${count}`);

// Знайти мінімальний елемент масиву та його порядковий номер.
let minValueIndex = 0;
let minValue = array[minValueIndex];

array.forEach((value, index) => {
    if (value < minValue) {
        minValue = value;
        minValueIndex = index;
    }
});

console.log(`Мінімальний елемент масиву: ${minValue}`);
console.log(`Його порядковий номер: ${minValueIndex}`);

// Знайти максимальний елемент масиву та його порядковий номер.
let maxValueIndex = 0;
let maxValue = array[maxValueIndex];

array.forEach((value, index) => {
    if (value > maxValue) {
        maxValue = value;
        maxValueIndex = index;
    }
});

console.log(`Максимальний елемент масиву: ${maxValue}`);
console.log(`Його порядковий номер (індекс): ${maxValueIndex}`);

// Визначити кількість негативних елементів.
const negativeCount = array.reduce((count, num) => num < 0 ? count + 1 : count, 0);

console.log(`Кількість негативних елементів: ${negativeCount}`);

// Знайти кількість непарних позитивних елементів.
const oddPositiveCount = array.reduce(
    (count, num) => (num > 0 && num % 2 !== 0) ? count + 1 : count, 0
);

console.log(`Кількість непарних позитивних елементів: ${oddPositiveCount}`);

// Визначити кількість парних позитивних елементів.
const evenPositiveCount = array.reduce(
    (count, num) => (num > 0 && num % 2 === 0) ? count + 1 : count, 0
);

console.log(`Кількість парних позитивних елементів: ${evenPositiveCount}`);

// Знайти суму парних позитивних елементів.
const evenPositiveSum = array.reduce(
    (sum, num) => (num > 0 && num % 2 === 0) ? sum + num : sum, 0
);

console.log(`Сума парних позитивних елементів: ${evenPositiveSum}`);

// Знайти суму непарних позитивних елементів.
const oddPositiveSum = array.reduce(
    (sum, num) => (num > 0 && num % 2 !== 0) ? sum + num : sum, 0
);

console.log(`Сума непарних позитивних елементів: ${oddPositiveSum}`);

// Знайти добуток позитивних елементів.
const positiveProduct = array.reduce((product, num) => num > 0 ? product * num : product, 1);

console.log(`Добуток позитивних елементів: ${positiveProduct}`);

// Знайти найбільший серед елементів масиву, решту занулити.
// **найбільший елемент вже було знайдено на одному з попередніх кроків
const result = array.map(num => (num === maxValue ? num : 0));

console.log(result);







