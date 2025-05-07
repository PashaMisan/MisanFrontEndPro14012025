import * as bootstrap from "bootstrap";
import storage from "./storage";
import toast from "./toast";
import {fromJson} from './productFactory';

const cart = {
    items: [],

    viewBtn: document.getElementById('view-cart-btn'),
    list: document.getElementById('cart-items-list'),
    itemTemplate: document.getElementById('cart-item-template'),
    submitBtn: document.getElementById('submit-order-btn'),
    cartCount: document.getElementById('cart-count'),
    modal: new bootstrap.Modal(document.getElementById('cartModal')),
    saveUrl: 'http://localhost:3000/order',

    init() {
        const rawItems = storage.getItems();
        this.items = rawItems.length ? rawItems.map(fromJson) : [];
        this.setupListeners().updateCartCount();
    },

    setupListeners() {
        this.viewBtn.addEventListener('click', () => this.show());
        this.submitBtn.addEventListener('click', () => this.submit());

        return this;
    },

    show() {
        this.render();
        this.modal.show();
    },

    render() {
        const totalElement = document.createElement('li');

        this.list.innerHTML = '';

        if (this.isEmpty()) {
            this.list.innerHTML = '<li class="list-group-item text-center">Кошик порожній</li>';
            return;
        }

        this.items.forEach((item, index) => {
            const clone = this.itemTemplate.content.cloneNode(true);
            const options = item.constructor.getOptions();
            const optionLabel = options[item.option]?.label ?? '';
            const ul = clone.querySelector('.extra-ingredients');
            const removeBtn = clone.querySelector('button');

            clone.querySelector('.item-name').textContent = `${item.name} (${optionLabel})`;
            clone.querySelector('.item-price').textContent = ` — ${item.calculate()} грн.`;

            if (item.extraPaidIngredients?.length) {
                item.extraPaidIngredients.forEach(ingredient => {
                    const li = document.createElement('li');

                    li.textContent = `${ingredient.name} (+${ingredient.price} грн.)`;
                    ul.appendChild(li);
                });
            } else {
                ul.remove();
            }

            removeBtn.addEventListener('click', () => this.removeItem(index));

            this.list.appendChild(clone);
        });

        totalElement.classList.add('list-group-item', 'fw-bold');
        totalElement.innerHTML = `Загальна сума: ${this.calculateTotal()} грн.`;

        this.list.appendChild(totalElement);

        return this;
    },

    async submit() {
        if (this.isEmpty()) {
            alert('Кошик порожній');
            return;
        }

        try {
            const response = await fetch(this.saveUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: this.items.map(item => {
                        const json = item.toJSON();

                        return {
                            ...json,
                            total: item.calculate()
                        };
                    }),
                    totalAmount: this.calculateTotal()
                })
            });

            this.clear().modal.hide();
            toast.trigger('Успішно!', 'Замовлення відправлене в обробку!');
        } catch (error) {
            alert('Не вдалося оформити замовлення. Спробуйте пізніше.');
        }
    },

    updateCartCount() {
        this.cartCount.textContent = this.items.length.toString();

        return this;
    },

    add(product) {
        this.items.push(product);

        this.save().updateCartCount();
    },

    removeItem(index) {
        this.items.splice(index, 1);

        this.save().updateCartCount().render();
    },

    save() {
        storage.saveItems(this.items.map(item => item.toJSON()));

        return this;
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

        return this.updateCartCount();
    },
};

export default cart;
