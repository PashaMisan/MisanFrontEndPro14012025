import Product from "./Product";

export default class Shawarma extends Product {
    static SIZE = {
        small: {label: 'Розмір L', coefficient: 1.0},
        medium: {label: 'Розмір XL', coefficient: 1.2},
        large: {label: 'Розмір XXL', coefficient: 1.5}
    };

    static getOptions() {
        return this.SIZE;
    }

    calculate(basePrice = this.price) {
        const option = Shawarma.SIZE[this.option];
        const coefficient = option ? option.coefficient : 1;

        return super.calculate(basePrice * coefficient);
    }
}