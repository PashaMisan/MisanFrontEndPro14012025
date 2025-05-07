import * as bootstrap from "bootstrap";

const toast = {
    element: document.getElementById('toast'),

    trigger(label, text) {
        const instance = new bootstrap.Toast(this.element);
        const labelElement = this.element.querySelector('.label');
        const textElement = this.element.querySelector('.toast-body');

        labelElement.innerText = label;
        textElement.innerText = text;

        instance.show();
    }
}

export default toast;