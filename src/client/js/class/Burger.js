import Product from "./Product";

export default class Burger extends Product {
    static VARIANTS = {
        regular: {label: 'Звичайний', overcharge: 0.0},
        double: {label: 'Подвійний', overcharge: 50.0}
    };

    static getOptions() {
        return this.VARIANTS;
    }

    calculate(basePrice = this.price) {
        const option = Burger.VARIANTS[this.option];
        const overcharge = option ? option.overcharge : 0.0;

        return super.calculate(basePrice + overcharge);
    }
}