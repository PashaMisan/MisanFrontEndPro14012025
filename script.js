class Resident {
    #name;

    constructor(name) {
        this.#name = name;
    }

    get htmlListItem() {
        const li = document.createElement('li');

        li.innerText = `Імʼя - ${this.#name}`;

        return li;
    }
}

class Apartment {
    #number;
    #residents = [];

    constructor(number) {
        this.#number = number;
    }

    get number() {
        return this.#number;
    }

    addResident(resident) {
        this.#residents.push(resident);
    }

    get htmlResidentList() {
        const ul = document.createElement('ul');

        this.#residents.forEach(resident => ul.appendChild(resident.htmlListItem))

        return ul;
    }
}

class Building {
    #address;
    #apartments = [];

    constructor(address) {
        this.#address = address;
    }

    get apartments() {
        return this.#apartments;
    }

    get address() {
        return this.#address;
    }

    getApartment(number) {
        return this.#apartments.find(apartment => apartment.number === number);
    }

    addApartment(apartment) {
        this.#apartments.push(apartment);
    }

    get htmlApartmentList() {
        const ul = document.createElement('ul');

        this.#apartments.forEach(apartment => {
            const li = document.createElement('li');

            li.innerText = `Квартира №${apartment.number}`

            ul.appendChild(li);
            ul.appendChild(apartment.htmlResidentList);
        })

        return ul;
    }
}

const formBuilder = {
    building: null,
    buildingForm: document.getElementById('building-form'),
    apartmentForm: document.getElementById('apartments-form'),
    apartmentTemplate: document.getElementById('apartment-template'),
    residentForm: document.getElementById('residents-form'),
    residentTemplate: document.getElementById('resident-template'),
    buildingInfo: document.getElementById('building-info'),
    init: function () {
        this.buildingForm.addEventListener('submit', event => this.handleBuildingFormSubmit(event));
        this.apartmentForm.addEventListener('submit', event => this.handleApartmentFormSubmit(event));
        this.residentForm.addEventListener('submit', event => this.handleResidentFormSubmit(event));
    },
    handleBuildingFormSubmit: function (event) {
        event.preventDefault();

        const form = event.target;

        if (this.validateForm(form)) {
            const formData = new FormData(form);

            this.building = new Building(formData.get('address'));

            for (let i = 1; i <= formData.get('number'); i++) {
                this.building.addApartment(new Apartment(i));
            }

            this.switchToApartmentForm();
        }
    },
    handleApartmentFormSubmit: function (event) {
        event.preventDefault();

        const form = event.target;

        if (this.validateForm(form)) {
            this.switchToResidentsForm(new FormData(form).getAll('apartment'));
        }
    },
    handleResidentFormSubmit: function (event) {
        event.preventDefault();

        const form = event.target;

        if (this.validateForm(form)) {
            for (let i = 1; ; i++) {
                const residents = new FormData(form).getAll(`residents[${i}]`)

                if (residents.length) {
                    const apartment = this.building.getApartment(i);

                    residents.forEach(name => apartment.addResident(new Resident(name)))
                } else {
                    break;
                }
            }

            this.switchToBuildingInfo();
        }
    },
    switchToApartmentForm: function () {
        const apartmentsContainer = this.apartmentForm.querySelector('.apartments-container');

        this.building.apartments.forEach(apartment => {
            const inputClone = this.apartmentTemplate.content.cloneNode(true);

            inputClone.querySelector('.number').innerText = apartment.number;

            apartmentsContainer.appendChild(inputClone);
        })

        this.switchVisibility(this.buildingForm, this.apartmentForm);
    },
    switchToResidentsForm: function (residentsPerApartment) {
        const residentsContainer = this.residentForm.querySelector('.residents-container');

        residentsPerApartment.forEach((quantity, key) => {
            const title = document.createElement('h3');

            title.innerText = `Квартира №${key + 1}`

            residentsContainer.appendChild(title);

            for (let i = 1; i <= quantity; i++) {
                const inputClone = this.residentTemplate.content.cloneNode(true);

                inputClone.querySelector('.resident-number').innerText = i;
                inputClone.querySelector('input').name = `residents[${key + 1}]`;

                residentsContainer.appendChild(inputClone);
            }
        })

        this.switchVisibility(this.apartmentForm, this.residentForm);
    },
    switchToBuildingInfo: function () {
        const buildingInfo = this.buildingInfo;
        const title = document.createElement('h2');

        title.innerText = `Будинок: ${this.building.address}`;

        buildingInfo.appendChild(title);
        buildingInfo.appendChild(this.building.htmlApartmentList);

        this.switchVisibility(this.residentForm, this.buildingInfo)
    },
    validateForm: function (form) {
        let isValid = true;

        form.querySelectorAll('input').forEach(element => {
            const fieldStyle = element.style;

            if (!element.value.trim()) {
                fieldStyle.borderColor = 'red';
                isValid = false;
            } else {
                fieldStyle.borderColor = '';
            }
        })

        if (!isValid) {
            this.showValidationMessage(form, 'Некоректно заповнені виділені поля');
        }

        return isValid;
    },
    showValidationMessage: function (form, message) {
        const messageContainer = form.querySelector('.error');

        messageContainer.style.display = 'block';
        messageContainer.innerText = message;
    },
    switchVisibility: function (from, to) {
        from.style.display = 'none';
        to.style.display = 'block';
    }
}

formBuilder.init();
