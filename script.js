class Hamburger {
    static SIZE_SMALL = {
        price: 50,
        calories: 20
    };
    static SIZE_LARGE = {
        price: 100,
        calories: 40
    };

    static STUFFING_CHEESE = {
        price: 10,
        calories: 20
    };
    static STUFFING_SALAD = {
        price: 20,
        calories: 5
    };
    static STUFFING_POTATO = {
        price: 15,
        calories: 10
    };

    static TOPPING_SAUCE = {
        price: 15,
        calories: 0
    };
    static TOPPING_MAYO = {
        price: 20,
        calories: 5
    };

    #size;
    #stuffing;
    #toppings = [];

    constructor(size, stuffing) {
        this.#size = size;
        this.#stuffing = stuffing;
        this.#toppings = [];
    }

    addTopping(topping) {
        this.#toppings.push(topping);
    }

    calculatePrice() {
        return this.#toppings.reduce((sum, topping) => {
            return sum + topping.price
        }, this.#size.price + this.#stuffing.price);
    }

    calculateCalories() {
        return this.#toppings.reduce((totalCalories, topping) => {
            return totalCalories + topping.calories
        }, this.#size.calories + this.#stuffing.calories);
    }
}

// маленький гамбургер із начинкою із сиру
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);

// Добавка з майонезу
hamburger.addTopping(Hamburger.TOPPING_MAYO);

// Запитаємо скільки там калорій
console.log(`Calories: ${hamburger.calculateCalories()}`);

// скільки коштує
console.log(`Price: ${hamburger.calculatePrice()}`);

// я тут передумав і вирішив додати ще приправу
hamburger.addTopping(Hamburger.TOPPING_SAUCE);

// А скільки тепер коштує?
console.log(`Price with sauce: ${hamburger.calculatePrice()}`);
