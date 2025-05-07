import * as bootstrap from "bootstrap";

const orders = {
    modal: new bootstrap.Modal(document.getElementById('ordersModal')),
    ordersUrl: 'http://localhost:3000/orders',
    button: document.getElementById('view-orders-btn'),
    ordersList: document.getElementById('orders-list'),
    template: document.getElementById('order-template'),
    itemTemplate: document.getElementById('order-item-template'),

    init() {
        this.button.addEventListener('click', () => this.loadAndShowOrders());
    },

    async loadAndShowOrders() {
        this.ordersList.innerHTML = '<p>Завантаження...</p>';
        this.modal.show();

        try {
            const response = await fetch(this.ordersUrl);
            const orders = await response.json();

            if (!Array.isArray(orders) || orders.length === 0) {
                this.ordersList.innerHTML = '<p class="text-center">Замовлень поки що немає.</p>';
                return;
            }

            this.ordersList.innerHTML = '';

            orders.forEach(order => {
                const clone = this.template.content.cloneNode(true);

                clone.querySelector('.order-number').textContent = `№ ${order.orderNumber}`;
                clone.querySelector('.total-amount').textContent = `Разом: ${order.totalAmount} грн`;

                const itemsList = clone.querySelector('.items-list');
                order.items.forEach(item => {
                    const liClone = this.itemTemplate.content.cloneNode(true);

                    liClone.querySelector('.item-name').textContent = item.name;

                    const option = liClone.querySelector('.item-option');
                    option.textContent = item.optionLabel ? `(${item.optionLabel.label})` : '';

                    liClone.querySelector('.item-total').textContent = `${item.total} грн`;

                    const extrasElement = liClone.querySelector('.item-extras');
                    if (item.extraPaidIngredients.length > 0) {
                        extrasElement.textContent = `Додатково: ${item.extraPaidIngredients
                            .map(ing => `${ing.name} (+${ing.price} грн)`)
                            .join(', ')}`;
                        extrasElement.classList.remove('d-none');
                    }

                    itemsList.appendChild(liClone);
                });

                this.ordersList.appendChild(clone);
            });

        } catch (error) {
            this.ordersList.innerHTML = '<p class="text-danger">Не вдалося завантажити замовлення.</p>';
        }
    }
};

export default orders;