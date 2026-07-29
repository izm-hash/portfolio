const hamberger = document.getElementById('hamburger');
const menu = document.getElementById('header-menu');
const menuLinks = document.querySelectorAll('#header-menu a');


hamberger.addEventListener('click', () => {
    hamberger.classList.toggle('active');
    menu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !hamberger.contains(e.target)) {
        hamberger.classList.remove('active');
        menu.classList.remove('active');
    }
});

for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', () => {
        hamberger.classList.remove('active');
        menu.classList.remove('active');
    });
}