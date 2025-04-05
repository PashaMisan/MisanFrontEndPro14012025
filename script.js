const users = [
    {id: 1, name: "John Doe", email: "john@example.com"},
    {id: 2, name: "Jane Smith", email: "jane@example.com"},
    {id: 3, name: "Alice Johnson", email: "alice@example.com"},
    {id: 4, name: "Bob Brown", email: "bob@example.com"},
    {id: 5, name: "Charlie Davis", email: "charlie@example.com"}
];

function Storage(initItems) {
    this.storageKey = 'userList';

    this.getAll = function () {
        const itemsJson = localStorage.getItem(this.storageKey);

        return JSON.parse(itemsJson) ?? [];
    };

    this.setItems = function (items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));

        return this;
    }

    this.getItem = function (id) {
        const items = this.getAll();

        return items.find(item => item.id === id);
    };

    this.updateItem = function (item) {
        const items = this.getAll();
        const existIndex = items.findIndex(element => element.id === item.id);

        if (existIndex === -1) {
            items.push(item);
        } else {
            items[existIndex] = item;
        }

        return this.setItems(items);
    }

    this.removeItem = function (item) {
        let items = this.getAll();

        items = items.filter(element => element.id !== item.id);

        return this.setItems(items)
    }

    if (!localStorage.hasOwnProperty(this.storageKey)) {
        this.setItems(initItems);
    }
}

function App(storage) {
    this.storage = storage;
    this.userList = document.getElementById("user-list");
    this.userDetails = document.getElementById("user-details");
    this.userNew = document.getElementById('add-new');
    this.userForm = document.getElementById("user-form");
    this.userTemplate = document.getElementById("user-template");
    this.actionContainer = document.getElementById("action-container");

    this.handleCrudClick = function (event) {
        const target = event.target;

        if (target.tagName === 'BUTTON') {
            const user = this.storage.getItem(+target.dataset.id);
            const targetClassList = target.classList;

            this.hideAction();

            switch (true) {
                case targetClassList.contains("view"):
                    this.renderUserDetails(user);
                    break;
                case targetClassList.contains("edit"):
                    this.renderUserForm(user);
                    break;
                case targetClassList.contains('remove'):
                    this.removeUser(user);
                    break;
            }
        }
    };

    this.handleFormSubmit = function (event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const idValue = +formData.get('id');


        if (this.validateUserForm(formData)) {
            this.storage.updateItem({
                id: idValue,
                name: formData.get('name'),
                email: formData.get('email')
            })

            this.reloadApp();
        }
    };

    this.handleAddNewClick = function () {
        this.hideAction().renderUserForm({
            id: +(new Date()),
            name: '',
            email: ''
        });
    }

    this.reloadApp = function () {
        this.renderUsers(storage.getAll()).hideAction();
    };

    this.renderUsers = function (users) {
        this.userList.innerHTML = "";

        users.forEach(user => {
            const clone = document.importNode(this.userTemplate.content, true);
            const userInfo = clone.querySelector(".user-info");

            userInfo.innerHTML = `${user.name} (${user.email})`;

            clone.querySelectorAll("button").forEach(button => {
                button.setAttribute("data-id", user.id);
            });

            this.userList.appendChild(clone);
        });

        return this;
    }

    this.renderUserDetails = function (user) {
        const userDetails = this.userDetails;

        userDetails.classList.remove('d-none');
        userDetails.innerText = `Name: ${user.name}\nEmail: ${user.email}`;
    };

    this.renderUserForm = function (user) {
        const form = this.userForm;
        const elements = form.elements;

        form.classList.remove('d-none')

        elements.name.value = user.name;
        elements.email.value = user.email;
        elements.id.value = user.id;
    }

    this.removeUser = function (user) {
        if (confirm(`Ви дійсно бажаєте видалит юзера ${user.name}?`)) {
            this.storage.removeItem(user);
            this.reloadApp();
        }
    }

    this.hideAction = function () {
        this.actionContainer.querySelectorAll('.action').forEach(element => {
            element.classList.add('d-none');
        });

        return this;
    };

    this.validateUserForm = function (formData) {
        const isValid = formData.get("name").trim();

        if (!isValid) {
            const userNameField = this.userForm.querySelector('#name');

            userNameField.style.borderColor = 'red';
            setTimeout(() => userNameField.style.borderColor = '', 1000);
        }

        return isValid;
    }

    this.userList.addEventListener('click', event => this.handleCrudClick(event));
    this.userForm.addEventListener('submit', event => this.handleFormSubmit(event));
    this.userNew.addEventListener('click', () => this.handleAddNewClick());

    this.reloadApp();
}

new App(new Storage(users));