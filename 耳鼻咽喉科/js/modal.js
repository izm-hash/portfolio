//モーダルウィンドウ
//各DOM取得
const open = document.querySelector('#open');
const close = document.querySelector('#close');
const modal1 = document.querySelector('#modal1');
const modal2 = document.querySelector('#modal2');
const modal3 = document.querySelector('#modal3');
const modal4 = document.querySelector('#modal4');
const modal5 = document.querySelector('#modal5');
const modal6 = document.querySelector('#modal6');
const mask = document.querySelector('#mask');

// console.log(mask);
const showKeyframes = {
    opacity: [0, 1],
    visibility: 'visible',
};

const hideKeyframes = {
    opacity: [1, 0],
    visibility: 'hidden',
};

const options = {
    duration: 500,
    easing: 'ease',
    fill: 'forwards',
};

//モーダルを開く
open.addEventListener('click', () => {
    modal1.animate(hideKeyframes, options);
    mask.animate(hideKeyframes, options);

});