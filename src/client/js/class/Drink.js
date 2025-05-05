import Product from "./Product";

export default class Drink extends Product {
    static VOLUME = {
        ml250: {label: '250 мл'},
        ml500: {label: '500 мл'}
    };

    static getOptions() {
        return this.VOLUME;
    }

    constructor({name, price}, optionSlug = null) {

        super({name, price: price[optionSlug]}, optionSlug);
    }
}