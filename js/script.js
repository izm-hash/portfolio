// 1. プラグインの有効化
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 共通関数：ふよふよ漂うループアニメーション
// ==========================================
function startFloating(element) {
    // HTMLの data-depth 属性から値を取得（なければ15をデフォルト値に）
    const depth = element.dataset.depth ? parseFloat(element.dataset.depth) : 15;

    gsap.to(element, {
        y: -depth,       // 上に動く幅
        duration: 2,     // 2秒かけて往復
        ease: "sine.inOut",
        yoyo: true,      // 往復運動を有効に
        repeat: -1,      // 無限ループ
        overwrite: "auto"
    });
}

// ==========================================
// .hero：ファーストビューのアニメーション
// ==========================================
const heroTl = gsap.timeline();

// 先に要素を配列として取得
const floatingImgs = gsap.utils.toArray(".hero .floating-img");

// 3つのsvg（.floating-img）が下から現れて、完了後にそれぞれふよふよ動かす
heroTl.fromTo(".hero .floating-img",
    { opacity: 0, y: 100 },
    {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
        stagger: 0.2,
        onComplete: () => {
            // 現れ終わったら、それぞれの画像でふよふよループを開始
            gsap.utils.toArray(".hero .floating-img").forEach(img => {
                startFloating(img);
            });
        }
    }
);

// h1（.title-char）は時差でその場でふわっと現れる
heroTl.fromTo(".title-char",
    { opacity: 0, scale: 0.98 },
    { opacity: 1, scale: 1, duration: 1.2, ease: "power1.out", stagger: 0.3 },
    "-=0.6" // 前のアニメーションの途中で開始
);

// p（.hero__text）はさらに時差で右からフェードイン
heroTl.fromTo(".hero__text",
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" },
    "-=0.4"
);


// ==========================================
// .about：スクロール連動アニメーション
// ==========================================
const aboutTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".about",
        start: "top 50%", // 開始位置が画面の半分に来た時
        toggleActions: "play none none none"
    }
});

// h2、p、imgがそれぞれ時差（staggerやインデックス指定）で下からふわっと現れる
aboutTl.fromTo(".about-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 })
    .fromTo(".about-text p", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
    .fromTo(".profile-img", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");


// ==========================================
// .works：全体および各実績のアニメーション
// ==========================================

// ① WORKSの冒頭（h2, p, lineup）
const worksTopTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".works",
        start: "top 50%", // .worksの開始位置が画面の半分に来た時
        toggleActions: "play none none none"
    }
});

// h2とその直下のpはその場で右から左へふわっと表示（xのプラスから0へ移動）
worksTopTl.fromTo([".works-title", ".works > p"],
    { opacity: 0, x: 40 },
    { opacity: 1, x: 0, duration: 1.0, ease: "power2.out", stagger: 0.2 }
);

// lineupは下からふわっと現れる
worksTopTl.fromTo(".lineup",
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" },
    "-=0.6"
);

// ② 各実績セクション（.w-s, .el, .hs などのブロック制御）
// 麦と陽だまり(.w-s)、Espresso Lane(.el)、みどりの森耳鼻科(.hs)をループ処理
const productBlocks = document.querySelectorAll('.w-s, .el, .hs');

productBlocks.forEach(block => {
    const blockTl = gsap.timeline({
        scrollTrigger: {
            trigger: block,
            start: "top 50%", // 自身が画面の半分に来た時
            toggleActions: "play none none none"
        }
    });

    // 1. ブロック自体が下からふわっと現れる
    blockTl.fromTo(block,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power2.out" }
    );

    // 2. 画像（あるいは画像ブロック）はその場でふわっと現れる
    const imgBlock = block.querySelector('.w-s-img, .img-block');
    blockTl.fromTo(imgBlock,
        { opacity: 0 },
        { opacity: 1, duration: 1.0, ease: "power2.out" },
        "-=0.6"
    );

    // 3. 中のpタグと区切りのdiv（.works-skillsなど）は、時差でその場で右から左へ表示
    // ※ 画像と文字が逆配置（.hs クラスなど、HTMLの並び順が text-block -> img-block のもの）の判定
    const textBlock = block.querySelector('.text-block, .flexbox, .works-description');
    const itemsToAnimate = block.querySelectorAll('p, .works-skills, .btn, .btn-container');

    if (block.classList.contains('hs')) {
        // 💡【逆配置の場合】現れる順番も逆に（最後から最初へ向けて stager をマイナスでかけるなど）
        blockTl.fromTo(itemsToAnimate,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", stagger: -0.1 }, // マイナス値で後ろの要素から順に発火
            "-=0.8"
        );
    } else {
        // 【通常配置の場合】上から順番に右から左へ表示
        blockTl.fromTo(itemsToAnimate,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 },
            "-=0.8"
        );
    }
});


// ==========================================
// .skills-level：スクロール連動アニメーション
// ==========================================
gsap.fromTo(".skills-level-container",
    { opacity: 0 },
    {
        opacity: 1,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".skills-level",
            start: "top 50%", // 開始位置が画面の半分に来た時
            toggleActions: "play none none none"
        }
    }
);


// ==========================================
// .contact：スクロール連動アニメーション
// ==========================================
gsap.fromTo(".contact p",
    { opacity: 0, x: 40 },
    {
        opacity: 1,
        x: 0,
        duration: 1.0,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".contact",
            start: "top 50%", // 開始位置が画面の半分に来た時
            toggleActions: "play none none none"
        }
    }
);


// ==========================================
// footer：常時ふよふよ動かす
// ==========================================
// フッターの猫画像は最初から画面外でも計算が軽いため、即時ループを起動
const footerCat = document.querySelector("footer .floating-img");
if (footerCat) {
    // 初期状態の不透明度を1にしてからふよふよ動かす
    gsap.set(footerCat, { opacity: 1 });
    startFloating(footerCat);
}


// ==========================================
// .b-l と .p-b：画像クリック時のモーダル処理
// ==========================================

// モーダル用の要素を動的にHTMLの最後（bodyの直前）に生成して追加
const modal = document.createElement("div");
modal.id = "works-modal";
modal.style.cssText = `
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0,0,0,0.8); display: flex; align-items: center;
  justify-content: center; opacity: 0; pointer-events: none;
  z-index: 9999; transition: opacity 0.3s ease;
`;

const modalImg = document.createElement("img");
modalImg.style.cssText = "max-width: 90%; max-height: 90%; object-fit: contain; box-shadow: 0 4px 20px rgba(0,0,0,0.5);";

modal.appendChild(modalImg);
document.body.appendChild(modal);

// .b-l と .p-b の中にあるすべてのimgタグを取得
const modalTargets = document.querySelectorAll(".b-l img, .p-b img");

modalTargets.forEach(img => {
    // カーソルをポインターにして、クリックできることを伝える
    img.style.cursor = "pointer";

    img.addEventListener("click", () => {
        // クリックされた画像のsrcをモーダルのimgにコピー
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        // モーダルを表示
        modal.style.opacity = "1";
        modal.style.pointerEvents = "auto";
    });
});

// モーダルの背景をクリックしたら閉じる
modal.addEventListener("click", () => {
    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";
});

// ==========================================
// Topに戻るボタンの出現・消去コントロール
// ==========================================
ScrollTrigger.create({
    trigger: ".works",   /* 出現のキッカケになる要素 */
    start: "top 80%",    /* .works の上が画面の下から80%の位置に見えたら */
    onEnter: () => {
        // 上から下へスクロールして.worksが見えたら出現
        gsap.to(".top-btn", { opacity: 1, pointerEvents: "auto", duration: 0.4 });
    }
});

ScrollTrigger.create({
    trigger: ".about",   /* 消去のキッカケになる要素 */
    start: "top 20%",    /* .about の上が画面の上から20%の位置に戻ってきたら */
    onLeaveBack: () => {
        // 下から上へスクロールして.aboutまで戻ったら消去
        gsap.to(".top-btn", { opacity: 0, pointerEvents: "none", duration: 0.4 });
    }
});

// ==========================================
// .walking-cat：画面下40%に現れたらアニメーション開始
// ==========================================
const catElements = document.querySelectorAll(".walking-cat");

catElements.forEach(cat => {
    gsap.timeline({
        scrollTrigger: {
            trigger: cat,
            start: "top 60%",
            once: true
        }
    }).to(cat, {
        onStart: () => {
            cat.classList.add("start-animation");
        }
    });
});