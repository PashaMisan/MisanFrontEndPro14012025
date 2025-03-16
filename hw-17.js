const products = [
    {id: 1, name: "Чохол для телефону", price: 300, category: "Аксесуари"},
    {id: 2, name: "Зарядний пристрій", price: 500, category: "Аксесуари"},
    {id: 3, name: "Мишка для ПК", price: 700, category: "Комп'ютерна техніка"},
    {id: 4, name: "Клавіатура", price: 800, category: "Комп'ютерна техніка"},
    {id: 5, name: "Флеш-накопичувач 32GB", price: 600, category: "Аксесуари"},
    {id: 6, name: "Навушники дротові", price: 600, category: "Аудіо"},
    {id: 7, name: "Портативний акумулятор", price: 400, category: "Аксесуари"},
    {id: 8, name: "Геймерська мишка", price: 950, category: "Комп'ютерна техніка"},
    {id: 9, name: "Безпроводна мишка", price: 900, category: "Комп'ютерна техніка"},
    {id: 10, name: "Смарт-годинник Garmin", price: 950, category: "Аксесуари"}
];

const cart = {
    items: [],
    addItem: function (quantity, product) {
        const existItem = this.items[product.id];

        if (existItem) {
            existItem.quantity += quantity;
        } else {
            this.items[product.id] = {
                quantity: quantity,
                product: product
            };
        }

        return this;
    },
    calculateTotal: function () {
        const sum = this.items.reduce((accumulator, item) => {
            return accumulator + item.quantity * item.product.price
        }, 0);
        let hasDiscount = sum > 10000;

        return {
            sum: hasDiscount ? sum - sum * 0.2 : sum,
            hasDiscount: hasDiscount,
        }
    },
    displayCart: function () {
        const total = this.calculateTotal();
        let message = 'Ваш кошик:\n';

        this.items.forEach(item => {
            message += `Товар: ${item.product.name}, Кількість: ${item.quantity}, Загальна вартість: ${item.product.price * item.quantity} грн\n`;
        });

        message += `Загальна вартість покупки - ${total.sum} грн`;

        if (total.hasDiscount) {
            message += ` (з врахуванням знижки у 20%)`
        }

        console.log(message);
    }
}

function showProducts(products) {
    products.forEach(product => {
        console.log(`№${product.id}: Товар: ${product.name}, Категорія: ${product.category}, Ціна: ${product.price} грн`);
    });
}

function getCategories(products) {
    const categories = products.map(product => product.category);

    return [...new Set(categories)];
}

function askCategory(products) {
    const categories = getCategories(products);

    let validationMessage = '';
    do {
        let selectedCategory = prompt(
            `${validationMessage}Виберіть категорію товару:\n${categories.join('\n')}\n(або натисніть скасувати для пропуску):`
        );

        if (selectedCategory === null || categories.includes(selectedCategory)) {
            return selectedCategory;
        }

        validationMessage = "❌ Некоректна категорія. Спробуйте ще раз.\n";
    } while (true)
}

function askProduct(products) {
    let validationMessage = '';

    do {
        let productId = prompt(`${validationMessage}Введіть номер товару :\n(або натисніть скасувати для закінчення)`);
        let product = products.find(product => product.id === parseInt(productId));

        if (productId === null || product) {
            return product;
        }

        validationMessage = "❌ Некоректний номер товару. Спробуйте ще раз.\n";
    } while (true)
}

function askQuantity() {
    let validationMessage = '';

    do {
        let quantity = prompt(`${validationMessage}Введіть кількість товару :\n(або натисніть скасувати для закінчення)`);

        if (quantity === null || +quantity > 0) {
            return +quantity;
        }

        validationMessage = "❌ Некоректна кількість. Спробуйте ще раз.\n";
    } while (true)
}

function askCartItems(cart, products) {
    let product;
    let quantity;

    showProducts(products);

    do {
        let filteredProducts = products;
        let category = askCategory(products);

        if (category) {
            filteredProducts = products.filter(product => product.category === category);
            console.log(`Доступні продукти за категорією "${category}": `)
            showProducts(filteredProducts);
        }

        product = askProduct(filteredProducts);
        if (product) {
            quantity = askQuantity();
        }

        if (product && quantity) {
            cart.addItem(quantity, product).displayCart()
        }
    } while (product && quantity)

    return cart;
}

askCartItems(cart, products);
