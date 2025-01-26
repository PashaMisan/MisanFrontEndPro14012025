let ageMessage = "";
let cityMessage = "";
let sportMessage = "";

const birthYear = prompt("Введіть рік вашого народження:");

if (birthYear !== null) {
    const age = new Date().getFullYear() - parseInt(birthYear);

    ageMessage = `Ваш вік: ${age} років.`;
} else {
    alert("Шкода, що Ви не захотіли ввести свій рік народження.");
}

const city = prompt("В якому місті Ви живете?");

if (city !== null) {
    switch (city.toLowerCase()) {
        case "київ":
            cityMessage = "Ти живеш у столиці України.";
            break;
        case "вашингтон":
            cityMessage = "Ти живеш у столиці США.";
            break;
        case "лондон":
            cityMessage = "Ти живеш у столиці Великої Британії.";
            break;
        default:
            cityMessage = `Ти живеш у місті ${city}.`;
    }
} else {
    alert("Шкода, що Ви не захотіли ввести своє місто.");
}

const sport = prompt("Ваш улюблений вид спорту?");

if (sport !== null) {
    switch (sport.toLowerCase()) {
        case "футбол":
            sportMessage = "Круто! Хочеш стати Ліонелем Мессі?";
            break;
        case "баскетбол":
            sportMessage = "Круто! Хочеш стати Майклом Джорданом?";
            break;
        case "теніс":
            sportMessage = "Круто! Хочеш стати Роджером Федерером?";
            break;
        default:
            sportMessage = `Твій улюблений вид спорту - ${sport}.`;
    }
} else {
    alert("Шкода, що Ви не захотіли ввести свій улюблений вид спорту.");
}

const finalMessage = ageMessage + (cityMessage ? "\n" + cityMessage : "") + (sportMessage ? "\n" + sportMessage : "");

if (finalMessage) {
    alert(finalMessage);
}
