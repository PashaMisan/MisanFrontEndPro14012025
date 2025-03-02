// #1
function sumNumbers() {
    let total = 0;

    return function (num) {
        total += num;
        return total;
    };
}

const sum = sumNumbers();

console.log(sum(3));
console.log(sum(5));
console.log(sum(20));

// #2
function averageNumbers(arr) {
    function isValidNumber(item) {
        return typeof item === 'number' && !Number.isNaN(item) && isFinite(item);
    }

    const result = arr.reduce((acc, item) => {
        if (isValidNumber(item)) {
            acc.sum += item;
            acc.count ++;
        }
        return acc;
    }, { sum: 0, count: 0 });

    return result.count > 0 ? result.sum / result.count : 0;
}

console.log(averageNumbers([NaN, 1, "hello", 19, null, 9, true, 11, Infinity]));

// #3
function doMath(x, znak, y) {
    switch (znak) {
        case '+':
            return x + y;
        case '-':
            return x - y;
        case '*':
            return x * y;
        case '/':
            return x / y;
        case '%':
            return x % y;
        case '^':
            return Math.pow(x, y);
        default:
            return "Невідома операція";
    }
}

const x = +prompt("Введіть перше число (x):");
const znak = prompt("Введіть математичний знак (+, -, *, /, %, ^):");
const y = +prompt("Введіть друге число (y):");

alert(`Результат: ${doMath(x, znak, y)}`);

// #4
function createArray() {
    function lengthPrompt(position = 0) {
        if (position) {
            return +prompt(`Скільки елементів буде в ${position}-му підмасиві?`);
        } else {
            return +prompt(`Скільки елементів буде в масиві?`)
        }
    }

    function valuePrompt(elementPosition, arrayPosition) {
        return prompt(`Введіть ${elementPosition}-ий елемент ${arrayPosition}-го підмасива:`);
    }

    function createElement(position = 0) {
        const array = [];
        const length = lengthPrompt(position);

        for (let i = 1; i <= length; i++) {
            const element = position ? valuePrompt(i, position) : createElement(i)

            array.push(element);
        }

        return array;
    }

    return createElement();
}

console.log(createArray());

// #5
function removeCharacters() {
    const str = prompt("Введіть рядок:") ?? '';
    const charsToRemove = [];

    while (true) {
        let char = prompt("Введіть символ для видалення (або натисніть 'Скасувати', щоб завершити):");
        if (!char) break;

        charsToRemove.push(char);
    }

    return str.split('').filter(char => !charsToRemove.includes(char)).join('');
}

console.log(removeCharacters());
