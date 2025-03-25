const registration = {
    form: document.getElementById('registrationForm'),
    table: document.getElementById('resultTable'),
    init: function () {
        this.form.addEventListener('submit', event => this.submitFormHandler(event));
    },
    submitFormHandler: function (event) {
        event.preventDefault();

        const table = this.table;
        const tbody = table.querySelector('tbody');
        const data = new FormData(event.target);

        data.forEach(function (value, key) {
            const row = tbody.insertRow();

            row.insertCell(0).innerText = key;
            row.insertCell(1).innerText = value instanceof File ? value.name : value;
        })

        this.form.style.display = 'none';
        table.style.display = 'block';
    }
};

registration.init();