const loading = document.querySelector('#loading');

window.addEventListener('load', () => {
    setTimeout(() => {
        loading.classList.add('loaded');
    }, 5000);
});







const topButton = document.querySelector('#top-button');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    // console.log('scrolled');

    if (scrolled > 300) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
});


// const openbtn = document.querySelector('#hamburger');

// window.addEventListener('scroll', () => {
//     const scrolledH = window.scrollY;

//     // console.log('scrolled');

//     if (scrolledH > 300) {
//         openbtn.classList.add('hamburgerShow');
//     } else {
//         openbtn.classList.remove('hamburgerShow');
//     }
// });

const targets = document.querySelectorAll('.fade-up', '.fade-right');
const options = {
    threshold: 0.3,
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, options);

targets.forEach((element) => {
    observer.observe(element);
});