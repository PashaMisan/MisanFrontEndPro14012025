function clock() {
    const now = new Date();
    const digits = document.querySelectorAll('.digit > img');

    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');

    const timeString = h + m + s;

    for (let i = 0; i < timeString.length; i++) {
        const digitImg = digits[i];
        const oldValue = digitImg.alt;
        const newValue = timeString[i];

        if (oldValue !== newValue) {
            digitImg.src = `images/${newValue}.jpg`;
            digitImg.alt = newValue;
        }
    }
}

setInterval(clock, 1000);
clock();