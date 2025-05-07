import * as bootstrap from "bootstrap";
import storage from "./storage";
import {fromJson} from './productFactory';

const cart = {
    items: [],

    viewBtn: document.getElementById('view-cart-btn'),
    list: document.getElementById('cart-items-list'),
    submitBtn: document.getElementById('submit-order-btn'),
    cartCount: document.getElementById('cart-count'),
    modal: new bootstrap.Modal(document.getElementById('cartModal')),

    init() {
        const rawItems = storage.getItems();
        this.items = rawItems.length ? rawItems.map(fromJson) : [];
        this.updateCartCount();
        this.viewBtn.addEventListener('click', () => this.show());
        this.submitBtn.addEventListener('click', () => this.submit());
    },

    updateCartCount() {
        this.cartCount.textContent = this.items.length;
    },

    add(product) {
        this.items.push(product);
        this.save();
        this.updateCartCount();
    },

    removeItem(index) {
        this.items.splice(index, 1);
        this.save();
        this.updateCartCount();
        this.render();
    },

    save() {
        const jsonItems = this.items.map(item => item.toJSON());
        storage.saveItems(jsonItems);
    },

    isEmpty() {
        return this.items.length === 0;
    },

    calculateTotal() {
        return this.items.reduce((sum, item) => sum + item.calculate(), 0);
    },

    clear() {
        this.items = [];
        storage.clear();
        this.list.innerHTML = '';
        this.updateCartCount();
    },

    render() {
        this.list.innerHTML = '';

        if (this.isEmpty()) {
            this.list.innerHTML = '<li class="list-group-item text-center">Кошик порожній</li>';
            return;
        }

        this.items.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'position-relative', 'py-3', 'px-4');

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

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'position-absolute', 'top-0', 'end-0', 'm-2');
            removeBtn.textContent = 'X';
            removeBtn.addEventListener('click', () => this.removeItem(index));

            li.appendChild(removeBtn);
            this.list.appendChild(li);
        });

        const totalElement = document.createElement('li');
        totalElement.classList.add('list-group-item', 'fw-bold');
        totalElement.innerHTML = `Загальна сума: ${this.calculateTotal()} грн.`;

        this.list.appendChild(totalElement);
    },

    show() {
        this.render();
        this.modal.show();
    },

    async submit() {
        if (this.isEmpty()) {
            alert('Кошик порожній');
            return;
        }

        const orderNumber = 'ORD-' + Date.now();

        const orderData = {
            orderNumber,
            items: this.items.map(item => ({
                name: item.name,
                option: item.option,
                optionLabel: item.constructor.getOptions()[item.option] ?? null,
                basePrice: item.price,
                extraPaidIngredients: item.extraPaidIngredients.map(ingredient => ({
                    name: ingredient.name,
                    price: ingredient.price
                })),
                total: item.calculate()
            })),
            totalAmount: this.calculateTotal()
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
            this.clear();
            this.modal.hide();
        } catch (error) {
            console.error(error);
            alert('Не вдалося оформити замовлення. Спробуйте пізніше.');
        }
    }
};

export default cart;
