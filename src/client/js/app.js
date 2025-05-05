import * as bootstrap from 'bootstrap'
import { categories } from "./data/categories.js";
import { products } from "./data/products.js";
import { ingredients, sauces } from "./data/ingredients.js";
import { getProductOptions, getProductClass} from "./factory/productFactory";

const cart = [];

export const app = {
    init: function () {
        this.renderCategories();
        this.renderProductsByCategory(1);
    },

    renderCategories: function () {
        const container = document.querySelector('.category-container');
        container.innerHTML = '';

        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.textContent = category.name;
            btn.classList.add('btn', 'btn-outline-primary', 'mx-2');
            btn.addEventListener('click', () => {
                this.renderProductsByCategory(category.id);
            });
            container.appendChild(btn);
        });
    },

    renderProductsByCategory: function (categoryId) {
        const container = document.querySelector('.product-list');
        const template = document.getElementById('product-template');
        container.innerHTML = '';

        const category = categories.find(c => c.id === categoryId);
        const categoryProducts = products.filter(p => p.categoryId === categoryId);

        categoryProducts.forEach(product => {
            const clone = template.content.cloneNode(true);
            const form = clone.querySelector('form');
            form.querySelector('.card-title').textContent = product.name;

            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const selectedOptionRadio = form.querySelector('.product-options input[type="radio"]:checked');
                const selectedOptionSlug = selectedOptionRadio ? selectedOptionRadio.value : null;
                const ProductClass = getProductClass(category.type);
                const newProduct = new ProductClass(product, selectedOptionSlug);

                product.ingredients.forEach(ingredientId => {
                    const ingredient = ingredients.find(i => i.id === ingredientId);
                    if (ingredient) {
                        newProduct.addBasicIngredient(ingredient);
                    }
                });

                const selectedSauceRadio = form.querySelector('.sauce-list input[type="radio"]:checked');
                if (selectedSauceRadio) {
                    const sauceId = parseInt(selectedSauceRadio.value);
                    const sauce = sauces.find(s => s.id === sauceId);
                    if (sauce) {
                        newProduct.addBasicIngredient(sauce);  // Додаємо соус до базових інгредієнтів
                    }
                }

                const optionalCheckboxes = form.querySelectorAll('.optional-list input[type="checkbox"]:checked');
                optionalCheckboxes.forEach(cb => {
                    const ingredientId = parseInt(cb.value);
                    const ingredient = ingredients.find(i => i.id === ingredientId);

                    newProduct.addExtraPaidIngredient(ingredient);
                });

                cart.push(newProduct);
            });

            this.renderIngredients(clone, product.ingredients, true);

            this.renderSauces(clone, product);

            this.renderOptionalIngredients(clone, category.optionalIngredientIds);

            this.renderProductOptions(clone, category.type);

            container.appendChild(clone);
        });
    },

    renderIngredients: function (clone, ingredientIds, disabled = false) {
        const ingredientList = clone.querySelector('.ingredient-list');
        ingredientList.innerHTML = '';

        ingredientIds.forEach(ingredientId => {
            const ingredient = ingredients.find(i => i.id === ingredientId);
            const label = document.createElement('label');
            label.classList.add('form-check');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('form-check-input');
            checkbox.checked = true;
            checkbox.disabled = disabled;
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(ingredient.name));
            ingredientList.appendChild(label);
        });
    },

    renderSauces: function (clone, product) {
        const sauceList = clone.querySelector('.sauce-list');
        sauceList.innerHTML = '';

        sauces.forEach(sauce => {
            const label = document.createElement('label');
            label.classList.add('form-check');

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `sauce_${product.id}`;
            radio.value = sauce.id;
            radio.classList.add('form-check-input');
            radio.id = `sauce_${sauce.id}_${product.id}`;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(sauce.name));

            sauceList.appendChild(label);
        });
    },

    renderOptionalIngredients: function (clone, optionalIngredientIds) {
        const optionalIngredients = clone.querySelector('.optional-list');
        optionalIngredients.innerHTML = '';

        optionalIngredientIds.forEach(ingredientId => {
            const ingredient = ingredients.find(i => i.id === ingredientId);
            const label = document.createElement('label');
            label.classList.add('form-check');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = ingredient.id;
            checkbox.classList.add('form-check-input');
            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(ingredient.name));
            optionalIngredients.appendChild(label);
        });
    },

    renderProductOptions: function (clone, productType) {
        const optionsContainer = clone.querySelector('.product-options');
        const options = getProductOptions(productType);

        Object.entries(options).forEach(([slug, { label }]) => {
            const labelElement = document.createElement('label');
            labelElement.classList.add('form-check');

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `productOption_${productType}`;
            radio.value = slug;
            radio.classList.add('form-check-input');

            labelElement.appendChild(radio);
            labelElement.appendChild(document.createTextNode(label));

            optionsContainer.appendChild(labelElement);
        });
    }
};

document.getElementById('view-cart-btn').addEventListener('click', () => {
    const list = document.getElementById('cart-items-list');
    list.innerHTML = '';

    if (cart.length === 0) {
        list.innerHTML = '<li class="list-group-item text-center">Кошик порожній</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');

            const optionLabel = item.constructor.getOptions()[item.option]?.label ?? '';
            const fullName = optionLabel ? `${item.name} (${optionLabel})` : item.name;

            li.innerHTML = `<strong>${fullName}</strong> — ${item.calculate()} грн.`;

            if (item.extraPaidIngredients?.length) {
                const ul = document.createElement('ul');
                ul.classList.add('mt-2', 'mb-0');

                item.extraPaidIngredients.forEach(ingredient => {
                    const ingrLi = document.createElement('li');
                    ingrLi.textContent = `${ingredient.name} (+${ingredient.price} грн.)`;
                    ul.appendChild(ingrLi);
                });

                li.appendChild(ul);
            }

            list.appendChild(li);
        });
    }

    const modal = new bootstrap.Modal(document.getElementById('cartModal'));
    modal.show();
});

document.getElementById('submit-order-btn').addEventListener('click', async () => {
    if (cart.length === 0) {
        alert('Кошик порожній');
        return;
    }

    const orderNumber = 'ORD-' + Date.now();

    const orderData = {
        orderNumber: orderNumber,
        items: cart.map(item => ({
            name: item.name,
            option: item.option,
            optionLabel: item.constructor.getOptions()[item.option]?.label ?? null,
            basePrice: item.price,
            extraPaidIngredients: item.extraPaidIngredients.map(ingredient => ({
                name: ingredient.name,
                price: ingredient.price
            })),
            total: item.calculate()
        })),
        totalAmount: cart.reduce((sum, item) => sum + item.calculate(), 0)
    };

    try {
        const response = await fetch('http://localhost:3000/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) throw new Error('Помилка відправки замовлення');

        alert(`Замовлення №${orderNumber} успішно відправлене!`);
        cart.length = 0;
        document.getElementById('cart-items-list').innerHTML = '';
        bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
    } catch (error) {
        console.error(error);
        alert('Не вдалося оформити замовлення. Спробуйте пізніше.');
    }
});

document.getElementById('view-orders-btn').addEventListener('click', async () => {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '<p>Завантаження...</p>';

    // Показати модалку одразу
    const modal = new bootstrap.Modal(document.getElementById('ordersModal'));
    modal.show();

    try {
        const response = await fetch('http://localhost:3000/orders');
        const orders = await response.json();

        if (!Array.isArray(orders) || orders.length === 0) {
            ordersList.innerHTML = '<p class="text-center">Замовлень поки що немає.</p>';
            return;
        }

        ordersList.innerHTML = '';

        orders.forEach(order => {
            const div = document.createElement('div');
            div.classList.add('mb-4', 'border', 'rounded', 'p-3');

            const itemsHtml = order.items.map(item => {
                const extras = item.extraPaidIngredients.map(ing => `${ing.name} (+${ing.price} грн)`).join(', ');
                return `
                    <li class="mb-1">
                        <strong>${item.name}</strong> ${item.optionLabel ? `(${item.optionLabel})` : ''} — 
                        ${item.total} грн
                        ${extras ? `<br><small class="text-muted">Додатково: ${extras}</small>` : ''}
                    </li>
                `;
            }).join('');

            div.innerHTML = `
                <h6 class="mb-2">№ ${order.orderNumber}</h6>
                <ul>${itemsHtml}</ul>
                <p class="fw-bold text-end">Разом: ${order.totalAmount} грн</p>
            `;

            ordersList.appendChild(div);
        });

    } catch (error) {
        console.error('Помилка при завантаженні замовлень:', error);
        ordersList.innerHTML = '<p class="text-danger">Не вдалося завантажити замовлення.</p>';
    }
});
