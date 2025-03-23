const categories = [
    { id: 1, name: "Електроніка" },
    { id: 2, name: "Одяг" },
    { id: 3, name: "Книги" }
];

const products = [
    { id: 1, categoryId: 1, name: "Смартфон", description: "Сучасний смартфон з великим дисплеєм і потужним процесором." },
    { id: 2, categoryId: 1, name: "Ноутбук", description: "Легкий і продуктивний ноутбук для роботи та навчання." },
    { id: 3, categoryId: 2, name: "Футболка", description: "Зручна та стильна футболка з натуральної бавовни." },
    { id: 4, categoryId: 2, name: "Джинси", description: "Класичні джинси високої якості, які підходять для будь-якого стилю." },
    { id: 5, categoryId: 3, name: "Роман '1984'", description: "Знаменитий роман Джорджа Орвелла про антиутопічне майбутнє." },
    { id: 6, categoryId: 3, name: "Гаррі Поттер і філософський камінь", description: "Перша книга легендарної серії про юного чарівника Гаррі Поттера." },
    { id: 7, categoryId: 3, name: "Основи програмування", description: "Посібник для початківців у світі програмування." }
];

const store = {
    categories: categories,
    products: products,
    categoriesListElement: document.getElementById('categories-list'),
    productsListElement: document.getElementById('products-list'),
    productInfoElement: document.getElementById('product-info'),
    init: function () {
        this.categoriesListElement.addEventListener('click', event => this.handleCategoryClick(event));
        this.productsListElement.addEventListener('click', event => this.handleProductClick(event));
        this.productInfoElement.addEventListener('click', event => this.handlePurchaseClick(event));

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
            alert('Товар куплено!');
            this.clearDependencyBlocks();
        }
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

            descriptionElement.innerText = product.description;
            button.innerText = 'Купити';

            this.productInfoElement.innerHTML = '';
            this.productInfoElement.appendChild(descriptionElement);
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

        return this;
    }
}

store.init();