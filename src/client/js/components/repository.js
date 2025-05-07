import {CATEGORIES} from "../data/categories.js";
import {products} from "../data/products.js";
import {ingredients, sauces} from "../data/ingredients";

const repository = {
    isProductAllowSouse(productId) {
        return this.getProductCategory(productId)?.allowSauces ?? false;
    },

    getCategories() {
        return CATEGORIES;
    },

    getSauces() {
        return sauces;
    },

    getCategoryById(categoryId) {
        return CATEGORIES.find(p => p.id === categoryId) || null;
    },

    getIngredientById(ingredientId) {
        return ingredients.find(i => i.id === ingredientId) || null;
    },

    getSauceById(sauceId) {
        return sauces.find(i => i.id === sauceId) || null;
    },

    getProductCategory(productId) {
        const product = this.getProductById(productId);

        return this.getCategories().find(c => c.id === product.categoryId) || null;
    },

    getProductById(productId) {
        return products.find(p => p.id === productId) || null;
    },

    getProductsByCategory(categoryId) {
        return products.filter(p => p.categoryId === categoryId);
    },

    getProductIngredients(product) {
        return product.ingredients.map(ingredientId => this.getIngredientById(ingredientId));
    },

    getCategoryOptionalIngredients(category) {
        return category.optionalIngredientIds.map(ingredientId => this.getIngredientById(ingredientId));
    }
}

export default repository;