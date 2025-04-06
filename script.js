function Person(name, age) {
    this.name = name;
    this.age = age;

    this.displayInfo = function () {
        return `Ім'я: ${this.name}<br>Вік: ${this.age}`;
    };
}

function Car({brand, model, year, color}) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.owner = null;

    this.setOwner = function (owner) {
        this.owner = owner;

        return this;
    }

    this.displayInfo = function () {
        let info = '<strong>Автомобіль:</strong><br>'
        info += `Марка: ${this.brand}<br>Модель: ${this.model}<br>Рік: ${this.year}<br>Колір: ${this.color}<br>`;

        info += this.owner
            ? `<br><strong>Власник:</strong><br>${this.owner.displayInfo()}`
            : "Автомобіль без власника.";

        return info;
    };
}

function Form() {
    this.car = null;
    this.allowedAge = 18;
    this.form = document.getElementById('data-form');
    this.formValidationMessageContainer = document.getElementById('validation-text');
    this.output = document.getElementById('output');

    this.handleFormSubmit = function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        if (this.validateFormData(formData)) {
            const car = this.makeCar(formData);

            this.showCarInfo(car);
            this.form.reset();
        }
    }

    this.validateFormData = function (formData) {
        const personAge = +formData.get('personAge').trim();
        let isValid = true;

        formData.forEach((value, key) => {
            const fieldStyle = this.form.querySelector(`#${key}`).style;

            if (!value.trim()) {
                fieldStyle.borderColor = 'red';
                isValid = false;
            } else
                fieldStyle.borderColor = '';
        });

        if (personAge < this.allowedAge) {
            isValid = false;
        }

        if (!isValid) {
            this.showValidationMessage('Некоректно заповнені виділені поля');
        }

        return isValid;
    }

    this.showValidationMessage = function (message) {
        const messageContainer = this.formValidationMessageContainer;

        messageContainer.style.display = 'block';
        messageContainer.innerText = message;
    }

    this.makeCar = function (formData) {
        const person = new Person(
            formData.get('personName'),
            +formData.get('personAge')
        );

        this.car = new Car({
            brand: formData.get('carBrand'),
            model: formData.get('carModel'),
            year: +formData.get('carYear'),
            color: formData.get('carColor')
        });

        return this.car.setOwner(person);
    }

    this.showCarInfo = function (car) {
        const output = this.output;

        output.style.display = "block";
        output.innerHTML = car.displayInfo();
    }

    this.form.addEventListener("submit", event => this.handleFormSubmit(event));
}

new Form();