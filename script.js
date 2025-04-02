const categories = [
    { id: 1, name: "Електроніка" },
    { id: 2, name: "Одяг" },
    { id: 3, name: "Книги" }
];

const products = [
    { id: 1, categoryId: 1, name: "Смартфон", price: 15000, description: "Сучасний смартфон з великим дисплеєм і потужним процесором." },
    { id: 2, categoryId: 1, name: "Ноутбук", price: 30000, description: "Легкий і продуктивний ноутбук для роботи та навчання." },
    { id: 3, categoryId: 2, name: "Футболка", price: 500, description: "Зручна та стильна футболка з натуральної бавовни." },
    { id: 4, categoryId: 2, name: "Джинси", price: 1200, description: "Класичні джинси високої якості, які підходять для будь-якого стилю." },
    { id: 5, categoryId: 3, name: "Роман '1984'", price: 300, description: "Знаменитий роман Джорджа Орвелла про антиутопічне майбутнє." },
    { id: 6, categoryId: 3, name: "Гаррі Поттер і філософський камінь", price: 350, description: "Перша книга легендарної серії про юного чарівника Гаррі Поттера." },
    { id: 7, categoryId: 3, name: "Основи програмування", price: 400, description: "Посібник для початківців у світі програмування." }
];

const orderList = {
    storageKey: 'orderList',
    listDisplayElement: document.getElementById('order-list'),
    orderTemplate: document.getElementById('order-template'),
    init: function () {
        this.listDisplayElement.addEventListener('click', event => this.handleDeleteButtonClick(event));
        this.listDisplayElement.addEventListener('click', event => this.handleOrderClick(event));

        return this;
    },
    handleDeleteButtonClick(event) {
        if (event.target.tagName === "BUTTON") {
            this.removeItem(+event.target.dataset.id).refreshDisplay();
        }
    },
    handleOrderClick: function (event) {
        const orderHeader = event.target.closest(".order-header");

        if (orderHeader) {
            const orderItem = orderHeader.closest(".order-item");

            orderItem.querySelector(".order-details").classList.toggle('expanded');
        }
    },
    addItem: function (product, formData) {
        const date = new Date();
        const id = +date;
        const formValues = Object.fromEntries(formData);

        this.addToStorage({id, product, formValues, date}).refreshDisplay();
    },
    removeItem: function (id) {
        let storageData = this.getStorageData();

        storageData = storageData.filter(item => item.id !== id);

        localStorage.setItem(this.storageKey, JSON.stringify(storageData));

        return this;
    },
    getStorageData: function () {
        const storageJson = localStorage.getItem(this.storageKey);

        return JSON.parse(storageJson) ?? [];
    },
    addToStorage: function (value) {
        const storageData = this.getStorageData();

        storageData.push(value)

        localStorage.setItem(this.storageKey, JSON.stringify(storageData));

        return this;
    },
    refreshDisplay: function () {
        this.listDisplayElement.innerHTML = '';

        this.getStorageData().forEach(item => {
            const date = new Date(item.date);
            const clone = this.orderTemplate.content.cloneNode(true);
            const detailsPlaceholders = clone.querySelector('.order-details').getElementsByTagName('span');
            let detailsCounter = 0;

            clone.querySelector('.product-name').innerText = item.product.name;
            clone.querySelector('.product-price').innerText = item.product.price * item.formValues['quantity'];
            clone.querySelector('.order-date').innerText = date.toLocaleString();
            clone.querySelector('.delete-btn').dataset.id = item.id;

            detailsPlaceholders[detailsCounter++].innerText = item.product.description;

            Object.keys(item.formValues).forEach(key => {
                detailsPlaceholders[detailsCounter++].innerText = item.formValues[key];
            })

            this.listDisplayElement.appendChild(clone);
        });
    },
}

const checkout = {
    submitListeners: [],
    requiredFields: ["full-name", "city", "department", "payment", "quantity"],
    form: document.getElementById('checkout-form'),
    init: function () {
        this.form.addEventListener('submit', event => this.handleSubmit(event));

        return this;
    },
    handleSubmit: function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const productId = +event.target.dataset.productId;

        if(this.formValidation(formData)) {
            this.submitListeners.forEach(callback => callback(productId, formData));
        }
    },
    formValidation: function (formData) {
        let isValid = true;

        this.requiredFields.forEach(key => {
            const fieldStyle = this.form.querySelector(`#${key}`).style;

            if (formData.has(key) && formData.get(key)) {
                fieldStyle.borderColor = '';
            } else {
                fieldStyle.borderColor = 'red';
                isValid = false;
            }
        });

        if (!isValid) {
            this.showValidationMessage("Заповніть обов'язкові поля");
        }

        return isValid;
    },
    showForm: function (productId) {
        this.form.dataset.productId = productId;
        this.form.style.display = 'block';
    },
    hideForm: function () {
        this.form.style.display = 'none';
    },
    showValidationMessage: function (message) {
        const textElement = this.form.querySelector('#validation-text');

        textElement.style.display = 'block';
        textElement.innerText = message;
    },
    addSubmitListener: function (callback) {
        this.submitListeners.push(callback);
    }
}

const store = {
    checkout: checkout,
    orderList: orderList,
    categories: categories,
    products: products,
    categoriesListElement: document.getElementById('categories-list'),
    productsListElement: document.getElementById('products-list'),
    productInfoElement: document.getElementById('product-info'),
    showOrderListButton: document.getElementById('show-order-list-button'),
    orderListContainer: document.getElementById('order-list-container'),
    categoryContainer: document.getElementById('category-container'),
    init: function () {
        this.categoriesListElement.addEventListener('click', event => this.handleCategoryClick(event));
        this.productsListElement.addEventListener('click', event => this.handleProductClick(event));
        this.productInfoElement.addEventListener('click', event => this.handlePurchaseClick(event));
        this.checkout.init().addSubmitListener((productId, formData) => this.handleCheckoutSubmit(productId, formData));
        this.showOrderListButton.addEventListener('click',event => this.handleShowOrderListButtonClick(event));
        this.orderList.init().refreshDisplay();

        this.renderCategoriesList();
    },
    handleCategoryClick(event) {
        const categoryId = event.target.dataset.id;

        if (categoryId) {
            this.clearDependencyBlocks().renderProductsList(+categoryId);
        }
    },
    handleProductClick(event) {
        const productId = event.target.dataset.id;

        if (productId) {
            this.renderProductInfo(+productId);
        }
    },
    handlePurchaseClick(event) {
        if (event.target.tagName === 'BUTTON') {
            this.checkout.showForm(event.target.dataset.productId);
        }
    },
    handleCheckoutSubmit(productId, formData) {
        const product = this.products.find(item => item.id === productId);

        this.clearDependencyBlocks().orderList.addItem(product, formData);
    },
    renderCategoriesList() {
        categories.forEach(item => this.appendItemLi(this.categoriesListElement, item));
    },
    renderProductsList(categoryId) {
        this.products.forEach(item => {
            if (item.categoryId === categoryId) {
                this.appendItemLi(this.productsListElement, item);
            }
        });
    },
    renderProductInfo(productId) {
        const product = this.products.find(item => item.id === productId);

        if (product) {
            const descriptionElement = document.createElement('p');
            const button = document.createElement('button');
            const price = document.createElement('div');

            descriptionElement.innerText = product.description;
            price.innerText = `${product.price} грн.`;
            button.innerText = 'Купити';
            button.dataset.productId = productId;

            this.productInfoElement.innerHTML = '';
            this.checkout.hideForm();

            this.productInfoElement.appendChild(descriptionElement);
            this.productInfoElement.appendChild(price);
            this.productInfoElement.appendChild(button);
        }
    },
    appendItemLi(element, item) {
        const li = document.createElement('li');

        li.dataset.id = item.id;
        li.innerText = item.name;

        element.appendChild(li);
    },
    clearDependencyBlocks() {
        this.productsListElement.innerHTML = '';
        this.productInfoElement.innerHTML = '';
        this.checkout.hideForm();

        return this;
    },
    handleShowOrderListButtonClick(event) {
        if (this.orderListContainer.classList.toggle('d-none')) {
            event.target.innerText = "Мої замовлення";
        }

        if (this.categoryContainer.classList.toggle('d-none')) {
            event.target.innerText = "Показати категорії";
        }
    }
}

store.init();