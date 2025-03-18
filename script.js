const textField = document.getElementById('textField');
const textFieldInfo = document.getElementById('textFieldInfo');
const enterLinkButton = document.getElementById('enterLink');
const goToLinkButton = document.getElementById('goToLink');
const tableDiv = document.getElementById('table');
const imgElement = document.getElementById('randomImage');

function showElement(element) {
    element.style.display = 'block';
}

function hideElement(element) {
    element.style.display = 'none';
}

function askLink() {
    let link = (prompt('Введіть посилання:') || '').trim();

    if (link) {
        if (!link.startsWith('http://') && !link.startsWith('https://')) {
            link = 'https://' + link;
        }
    }

    return link;
}

function handleEnterLinkButton(goToLinkButton) {
    const link = askLink();

    if (link) {
        goToLinkButton.onclick = () => window.location.href = link;
        goToLinkButton.disabled = '';
    }
}

function generateTable(container) {
    const table = document.createElement('table');
    let count = 1;

    for (let i = 0; i < 10; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('td');

            cell.textContent = count++;
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    container.appendChild(table);
}

function setRandomImage(imgElement) {
    const randomIndex = Math.floor(Math.random() * 9) + 1;

    imgElement.src = 'images/' + randomIndex + '.jpg';
}

textField.addEventListener('focus', () => showElement(textFieldInfo));

textField.addEventListener('blur', () => hideElement(textFieldInfo));

enterLinkButton.addEventListener('click', () => handleEnterLinkButton(goToLinkButton));

generateTable(tableDiv);

setRandomImage(imgElement);
