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
                const orderItem = this.renderOrderItem(order);

                this.ordersList.appendChild(orderItem);
            });

        } catch (error) {
            this.ordersList.innerHTML = '<p class="text-danger">Не вдалося завантажити замовлення.</p>';
        }
    },

    renderOrderItem: function (order) {
        const template = this.template.content.cloneNode(true);
        const itemsList = template.querySelector('.items-list');

        template.querySelector('.order-number').textContent = `№ ${order.orderNumber}`;
        template.querySelector('.total-amount').textContent = `Разом: ${order.totalAmount} грн`;

        order.items.forEach(item => {
            const itemTemplate = this.itemTemplate.content.cloneNode(true);
            const option = itemTemplate.querySelector('.item-option');
            const extrasElement = itemTemplate.querySelector('.item-extras');


            itemTemplate.querySelector('.item-name').textContent = item.name;
            itemTemplate.querySelector('.item-total').textContent = `${item.total} грн`;

            option.textContent = item.optionLabel ? `(${item.optionLabel.label})` : '';

            if (item.extraPaidIngredients.length > 0) {
                extrasElement.textContent = `Додатки: ${item.extraPaidIngredients
                    .map(ing => `${ing.name} (+${ing.price} грн)`)
                    .join(', ')}`;
                extrasElement.classList.remove('d-none');
            }

            itemsList.appendChild(itemTemplate);
        });

        return template;
    }
};

export default orders;