const tooltip = {
    buttons: document.querySelectorAll('[data-bs-toggle="modal"]'),

    init() {
        [...this.buttons].forEach(btn => new bootstrap.Tooltip(btn));
    }
};

const alert = {
    alertButton: document.getElementById('alert-button'),
    alertBox: document.getElementById('alert-box'),

    init() {
        this.alertButton.addEventListener('click', () => this.alertBox.classList.toggle('d-none'));
    }
};

const momentBlock = {
    DATE_FORMAT: "dddd, D MMMM YYYY [року]",
    myBirthDateEl: document.getElementById('my-birth-date'),
    convertButton: document.getElementById('convert-button'),
    userBirthDateInput: document.getElementById('user-birth-date'),
    convertedDateEl: document.getElementById('converted-date'),

    init() {
        moment.locale('uk');

        this.bindEvents().showMyBirthDate();
    },

    bindEvents() {
        this.convertButton.addEventListener('click', () => this.convertUserDate());

        return this;
    },

    showMyBirthDate() {
        const myBirthDate = moment("15-05-1994", "DD-MM-YYYY");
        this.myBirthDateEl.textContent = myBirthDate.format(this.DATE_FORMAT);
    },

    convertUserDate() {
        const userInput = this.userBirthDateInput.value;
        const userDate = moment(userInput, "YYYY-MM-DD");

        this.convertedDateEl.textContent = userDate.isValid()
            ? userDate.format(this.DATE_FORMAT)
            : "Невірний формат дати!";
    }
};

tooltip.init();
alert.init();
momentBlock.init();
