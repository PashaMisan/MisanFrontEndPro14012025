import repository from "./repository";
import Burger from "../class/Burger";
import Shawarma from "../class/Shawarma";
import Drink from "../class/Drink";
import Product from "../class/Product";

export function getProductOptions(type) {
    const ProductClass = getProductClass(type);

    return ProductClass.getOptions();
}

export function fromJson(json) {
    const type = repository.getProductCategory(json.id).type;

    return getProductClass(type).fromJson(json);
}

function getProductClass(type) {
    const loweredType = type.toLowerCase();

    switch (loweredType) {
        case 'burger':
            return Burger;
        case 'shawarma':
            return Shawarma;
        case 'drink':
            return Drink;
        default:
            return Product;
    }
}

