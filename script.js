function Element(tagName, attributes = {}) {
    this.tagName = tagName;
    this.attributes = attributes;
    this.children = [];
    this.events = [];

    this.render = function () {
        const element = document.createElement(this.tagName);

        Object.keys(this.attributes).forEach(key => {
            element.setAttribute(key, this.attributes[key]);
        })

        this.children.forEach(child => {
            let htmlChild = '';

            switch (true) {
                case child instanceof Element:
                    htmlChild = child.render();
                    break;
                case child instanceof HTMLElement:
                    htmlChild = child;
                    break;
                default:
                    htmlChild = document.createTextNode(child);
                    break;
            }

            element.appendChild(htmlChild);
        })

        this.events.forEach(event => {
            element.addEventListener(event.name, event.handler);
        })

        return element;
    }

    this.appendTo = function (parentElement) {
        const parent = document.querySelector(parentElement);

        parent.appendChild(this.render());

        return this;
    };

    this.addChild = function (element) {
        this.children.push(element);

        return this;
    }

    this.addEvent = function (name, handler) {
        this.events.push({name, handler});

        return this;
    }
}

//Приклад використання
const buttonElement = new Element('button', {class: 'btn'})
    .addChild('Click me!')
    .addEvent('click', () => alert('Button was clicked!'));

const iElement = new Element('i').addChild('Italic text');

const brHtmlElement = document.createElement('br');

const pElement = new Element('p', {class: 'paragraph'})
    .addChild(iElement)
    .addChild(brHtmlElement)
    .addChild('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut.');

new Element('div', {class: 'container', id: 'main-container'})
    .addChild(pElement)
    .addChild(buttonElement)
    .appendTo('body');
