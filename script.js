const responses = [
    "Цікаво!",
    "Розкажи більше.",
    "А чому ти так думаєш?",
    "Я не впевнений, що розумію.",
    "Можливо!",
    "Добре, але давай поговоримо про щось інше.",
];

const chatbot = {
    responses,
    isActive: true,
    interval: null,
    timeouts: [],
    turnOffChancePercent: 1,
    stopPhrase: "My watch has ended",
    form: document.getElementById('input'),
    chat: document.getElementById("chat"),
    init() {
        this.form.addEventListener("submit", event => this.handleSubmit(event));
        this.startBotChecker();
    },
    startBotChecker() {
        this.interval = setInterval(() => {
            if (Math.random() < this.turnOffChancePercent / 100) {
                this.turnOff("Браузер втомився і завершив діалог.");
            }
        }, 1000)
    },
    turnOff(message) {
        clearInterval(this.interval);
        this.timeouts.forEach(id => clearTimeout(id));
        this.isActive = false;
        this.appendMessage(message, 'bot');
    },
    botReply() {
        const id = setTimeout(() => {
            const timeOuts = this.timeouts;

            this.appendMessage(this.getRandomResponse(), "bot");
            timeOuts.splice(timeOuts.indexOf(id), 1);

        }, this.getRandomDelay());

        this.timeouts.push(id);
    },
    handleSubmit(event) {
        event.preventDefault();

        if (!this.isActive) {
            alert('Чат завершено!');
            return;
        }

        const data = new FormData(event.target);
        const message = data.get('text').trim();

        this.form.reset();

        if (message) {
            this.appendMessage(message, 'user');

            message === this.stopPhrase ? this.turnOff('До зустрічі! Браузер пішов спати.') : this.botReply();
        }
    },
    appendMessage(text, sender = "bot") {
        const p = document.createElement("p");

        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        p.textContent = `[${hours}:${minutes}:${seconds}] ${text}`;
        p.className = sender;

        this.chat.appendChild(p);
        this.chat.scrollTop = this.chat.scrollHeight;
    },
    getRandomResponse() {
        return responses[Math.floor(Math.random() * responses.length)];
    },
    getRandomDelay() {
        return Math.floor(Math.random() * 9000) + 1000;
    }
}

chatbot.init();