const images = ['header-image.jpg', 'header-image2.jpg', 'header-image3.jpg', 'header-image4.jpg'];
const slideshow = document.querySelector('.header-slideshow');

for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.src = `images/${images[i]}`;
    img.alt = `エスプレッソ${i + 1}`;

    if (i === 0) {
        img.classList.add('active');
    };
    slideshow.appendChild(img);
};

console.log(slideshow);

let currentIndex = 0;
const changeImage = () => {
    const slides = document.querySelectorAll('.header-slideshow img');
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    slides[currentIndex].classList.add('active');
};

setInterval(() => {
    changeImage();
}, 4000);

