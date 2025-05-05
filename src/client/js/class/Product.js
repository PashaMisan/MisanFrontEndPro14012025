export default class Product {

    static getOptions() {
        return {};
    }

    #id = null;
    #name = null;
    #price = null;
    #option = null;
    #basicIngredients = [];
    #extraPaidIngredients = [];

    constructor({name, price}, optionSlug = null) {
        this.#id = +new Date();
        this.#name = name;
        this.#price = price;
        this.#option = optionSlug;
    }

    get name() {
        return this.#name;
    }

    get option() {
        return this.#option;
    }

    get price() {
        return this.#price;
    }

    get extraPaidIngredients() {
        return this.#extraPaidIngredients;
    }

    addBasicIngredient(ingredient) {
        this.#basicIngredients.push(ingredient);
    }

    addExtraPaidIngredient(ingredient) {
        this.#extraPaidIngredients.push(ingredient);
    }

    calculate(basePrice = this.price) {

        return this.#extraPaidIngredients.reduce((sum, ingredient) => {
            return sum + (ingredient.price || 0);
        }, basePrice);
    }
}
