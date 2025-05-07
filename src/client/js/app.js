import repository from "./components/repository";
import orders from "./components/orders";
import cart from "./components/cart";
import toast from "./components/toast";
import {fromJson, getProductOptions} from "./components/productFactory";

export const app = {
    categoryContainer: document.getElementById('category-container'),
    categoryTemplate: document.getElementById('category-template'),
    productListContainer: document.getElementById('product-list'),
    productTemplate: document.getElementById('product-template'),

    init: function () {
        orders.init();
        cart.init();

        this.setupListeners().renderCategories().renderProductsByCategory(1);
    },

    setupListeners: function () {
        this.categoryContainer.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const categoryId = event.target.dataset.categoryId;

                this.renderProductsByCategory(+categoryId);
            }
        });

        this.productListContainer.addEventListener('change', (event) => {
            const target = event.target;

            if (target.type === 'radio' || target.type === 'checkbox') {
                this.updatePrice(target.closest('form'));
            }
        })

        this.productListContainer.addEventListener('submit', (event) => {
            event.preventDefault();

            const productObject = this.createProductFromForm(event.target);

            cart.add(productObject);
            toast.trigger(
                'Товар додано в кошик!',
                'Товар успішно додано в кошик. Продовжуйте покупки або перейдіть до кошика.'
            );
        })

        return this;
    },

    renderCategories: function () {
        const container = this.categoryContainer;
        const template = this.categoryTemplate;

        repository.getCategories().forEach(category => {
            const clone = template.content.cloneNode(true);
            const btn = clone.querySelector('button');

            btn.textContent = category.name;
            btn.dataset.categoryId = category.id;

            container.appendChild(clone);
        });

        return this;
    },

    renderProductsByCategory: function (categoryId) {
        const container = this.productListContainer;
        const template = this.productTemplate;
        const category = repository.getCategoryById(categoryId);

        container.innerHTML = '';

        repository.getProductsByCategory(categoryId).forEach(product => {
            const clone = template.content.cloneNode(true);
            const form = clone.querySelector('form');
            const title = form.querySelector('.card-title');

            title.textContent = product.name;
            form.dataset.productId = product.id;

            this.renderIngredients(clone, product)
                .renderSauces(clone, product)
                .renderOptionalIngredients(clone, category)
                .renderProductOptions(clone, category.type)
                .updatePrice(form);

            container.appendChild(clone);
        });
    },

    renderIngredients: function (element, product) {
        const ingredientList = element.querySelector('.ingredient-list');

        ingredientList.innerHTML = '';

        return this.renderCheckBoxes(ingredientList, repository.getProductIngredients(product), true);
    },

    renderOptionalIngredients: function (element, category) {
        const ingredientList = element.querySelector('.optional-list');

        ingredientList.innerHTML = '';

        return this.renderCheckBoxes(ingredientList, repository.getCategoryOptionalIngredients(category));
    },

    renderCheckBoxes: function (element, ingredients, required = false) {
        ingredients.forEach(ingredient => {
            const label = document.createElement('label');
            const checkbox = document.createElement('input');

            label.classList.add('form-check');

            checkbox.value = ingredient.id;
            checkbox.type = 'checkbox';
            checkbox.classList.add('form-check-input');
            checkbox.checked = required;
            checkbox.disabled = required;

            label.appendChild(checkbox);
            label.appendChild(document.createTextNode(ingredient.name));

            element.appendChild(label);
        });

        return this;
    },

    renderSauces: function (element, product) {
        const isAllowSauce = repository.isProductAllowSouse(product.id);
        const sauceContainer = element.querySelector('.sauce-container');
        const sauceList = element.querySelector('.sauce-list');

        sauceContainer.classList.toggle('d-none', !isAllowSauce);
        sauceList.innerHTML = '';

        if (isAllowSauce) {
            repository.getSauces().forEach((sauce, index) => {
                const radio = document.createElement('input');

                radio.name = `sauce_${product.id}`;
                radio.value = sauce.id;

                if (index === 0) {
                    radio.checked = true;
                }

                this.prependRadioToContainer(radio, sauce.name, sauceList);
            });
        }

        return this;
    },

    renderProductOptions: function (element, productType) {
        const optionsContainer = element.querySelector('.product-options');
        const options = getProductOptions(productType);

        Object.entries(options).forEach(([slug, {label}], index) => {
            const radio = document.createElement('input');

            radio.name = `productOption_${productType}`;
            radio.value = slug;

            if (index === 0) {
                radio.checked = true;
            }

            this.prependRadioToContainer(radio, label, optionsContainer);
        });

        return this;
    },

    prependRadioToContainer: function (radio, label, container) {
        const labelElement = document.createElement('label');

        labelElement.classList.add('form-check');

        radio.type = 'radio';
        radio.classList.add('form-check-input');
        radio.required = true;

        labelElement.appendChild(radio);
        labelElement.appendChild(document.createTextNode(label));

        container.appendChild(labelElement);
    },

    createProduct: function (form, product) {
        const optionalCheckboxes = form.querySelectorAll('.optional-list input[type="checkbox"]:checked');
        const selectedSauceRadio = form.querySelector('.sauce-list input[type="radio"]:checked');

        const baseIngredients = product.ingredients.map(repository.getIngredientById);

        const json = {
            id: product.id,
            name: product.name,
            price: product.price,
            option: form.querySelector('.product-options input[type="radio"]:checked').value,
            basicIngredients: [],
            extraPaidIngredients: []
        };

        json.basicIngredients.push(...baseIngredients);

        if (selectedSauceRadio) {
            json.basicIngredients.push(repository.getSauceById(+selectedSauceRadio.value));
        }

        optionalCheckboxes.forEach(element => {
            json.extraPaidIngredients.push(repository.getIngredientById(+element.value));
        });

        return fromJson(json);
    },

    createProductFromForm: function (formElement) {
        const product = repository.getProductById(+formElement.dataset.productId);

        return this.createProduct(formElement, product);
    },

    updatePrice: function (formElement) {
        const productObject = this.createProductFromForm(formElement);
        const priceElement = formElement.querySelector('.price');

        priceElement.textContent = `${productObject.calculate()} грн`;
    }
};