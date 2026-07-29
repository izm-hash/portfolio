
// フェードイン
const fadeItems = document.querySelectorAll('.fadein');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-show');
            fadeObserver.unobserve(entry.target);
        }
    });
});

fadeItems.forEach((item) => {
    fadeObserver.observe(item);
});


// TOPボタンの表示・非表示を切り替える設定
const conceptObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const topButton = document.querySelector('.top-button');
        if (!topButton) return;

        // #concept が画面に入ったら（isIntersecting が true のとき）
        if (entry.isIntersecting) {
            topButton.classList.add('is-show');
        } else {
            // 画面より上、または下に外れているときは非表示
            topButton.classList.remove('is-show');
        }
    });
}, {
    // 画面の下から10%の位置に #concept が入ってきたら反応させる（微調整可）
    rootMargin: "0px 0px -10% 0px"
});

// 監視対象として「#concept」を指定して実行
const conceptSection = document.querySelector('#concept');
if (conceptSection) {
    conceptObserver.observe(conceptSection);
}
