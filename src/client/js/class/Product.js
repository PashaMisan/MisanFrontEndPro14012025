export default class Product {

    static getOptions() {
        return {};
    }

    static fromJson(json) {
        const instance = new this(json, json.option);

        json.basicIngredients?.forEach(ingredient => {
            instance.addBasicIngredient(ingredient);
        });

        json.extraPaidIngredients?.forEach(ingredient => {
            instance.addExtraPaidIngredient(ingredient);
        });

        return instance;
    }

    #id = null;
    #name = null;
    #price = null;
    #option = null;
    #basicIngredients = [];
    #extraPaidIngredients = [];

    constructor({id, name, price}, optionSlug = null) {
        this.#id = id;
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

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            price: this.#price,
            option: this.#option,
            basicIngredients: this.#basicIngredients,
            extraPaidIngredients: this.#extraPaidIngredients,
        };
    }
}
