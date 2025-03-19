const slider = {
    currentPosition: 0,
    slides: document.getElementById('slider-container').children,
    nextButton: document.getElementById('next-button'),
    prevButton: document.getElementById('prev-button'),

    init: function () {
        this.nextButton.addEventListener('click', () => this.changeSlide(1));
        this.prevButton.addEventListener('click', () => this.changeSlide(-1));
        this.updateButtons();
    },

    getSlideByIndex: function (index) {
        return this.slides[index];
    },

    changeSlide: function (direction) {
        const newPosition = this.currentPosition + direction;

        if (newPosition >= 0 && newPosition < this.slides.length) {
            this.getSlideByIndex(this.currentPosition).classList.add('d-none');
            this.getSlideByIndex(newPosition).classList.remove('d-none');
            this.currentPosition = newPosition;

            this.updateButtons();
        }
    },

    updateButtons: function () {
        const currentPosition = this.currentPosition;

        this.prevButton.classList.toggle('d-none', currentPosition === 0);
        this.nextButton.classList.toggle('d-none', currentPosition === this.slides.length - 1);
    }
};

slider.init();