const images = [
    'https://picsum.photos/id/0/600/600',
    'https://picsum.photos/id/1/600/600',
    'https://picsum.photos/id/2/600/600',
    'https://picsum.photos/id/3/600/600',
    'https://picsum.photos/id/4/600/600',
    'https://picsum.photos/id/5/600/600',
];

const slider = {
    images,
    currentPosition: 0,
    timer: null,
    interval: 3000,
    imageElement: document.getElementById('image'),
    nextButton: document.getElementById('next-button'),
    prevButton: document.getElementById('prev-button'),

    init() {
        this.nextButton.addEventListener('click', () => this.manualSlide(1));
        this.prevButton.addEventListener('click', () => this.manualSlide(-1));

        this.updateImage().startAutoSlide();
    },

    changeSlide(direction) {
        const maxIndex = this.images.length - 1;
        let newPosition = this.currentPosition + direction;

        if (newPosition > maxIndex) {
            newPosition = 0;
        }

        if (newPosition < 0) {
            newPosition = maxIndex;
        }

        this.currentPosition = newPosition;

        return this.updateImage();
    },

    updateImage() {
        this.imageElement.src = this.images[this.currentPosition];

        return this;
    },

    startAutoSlide() {
        this.timer = setInterval(() => this.changeSlide(1), this.interval);
    },

    manualSlide(direction) {
        clearInterval(this.timer);

        this.changeSlide(direction).startAutoSlide();
    }
};

slider.init();